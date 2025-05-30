type any1 = any;

export type KeyType = string;

namespace JSX {
  export interface IntrinsicAttributes extends any1 {
    key?: any;
  }
  export type SVGAttributes = any;
  export type HTMLAttributes = any;
  export interface IntrinsicElements extends any1 {}
}

interface JSXElement {
  type: "element";
  tagName: string;
  attributes: Map<string, any>;
  children: NormalizedChildrenType;
}

interface JSXComponent<PropsType> {
  type: "component";
  func: (props: PropsType) => JSXElementType;
  key: KeyType;
  props: PropsType;
  children: NormalizedChildrenType;
}

interface ComponentPropsType {
  key: string;
}

type JSXElementType = JSXElement | JSXComponent<any>;
type ChildrenType =
  | JSXElementType
  | string
  | (JSXElementType | string)[]
  | boolean
  | undefined;
type NormalizedChildrenType = (JSXElementType | string)[];

const flatten = (arr: any): any[] => {
  if (!Array.isArray(arr)) {
    return [arr];
  }
  const ret: any[] = [];
  arr.forEach((element) => {
    const delta = flatten(element);
    delta.forEach((el1) => {
      ret.push(el1);
    });
  });
  return ret;
};

// TODO: Сделать адекватную реализацию; а это вот позорище надо убрать подальше
function deepEqual(obj1: any, obj2: any) {
  return false;
  if (JSON.stringify(obj1) !== JSON.stringify(obj2)) {
    return false;
  }
  return true;
}

// ----- Начало планировщика

const dirtyInstance: Set<ComponentInstance<any>>[] = [];
let isUpdateScheduled = false;

const markDirty = (instance: ComponentInstance<any>) => {
  // 1) При необходимости расширить массив instances;
  while (dirtyInstance.length <= instance.depth) {
    dirtyInstance.push(new Set());
  }
  // 2) Добавить в один из Set-ов instance;
  dirtyInstance[instance.depth].add(instance);
  // 3) Запланировать обновление;
  if (!isUpdateScheduled) {
    window.requestAnimationFrame(() => {
      schedUpdate();
    });
  }
};

// ----- Конец планировщика

// ----- Начало хуков

let activeInstance: ComponentInstance<any> | undefined = undefined;
let activeStateIndex: number = 0;

function useState<T>(
  initialState: T
): [state: T, setState: (newState: T) => void] {
  if (activeInstance === undefined) {
    throw new Error();
  }

  if (activeInstance.states.length <= activeStateIndex) {
    activeInstance.states.push(initialState);
  }
  const idx = activeStateIndex;
  const ai = activeInstance;
  activeStateIndex++;
  return [
    activeInstance.states[activeStateIndex - 1],
    (newState: T) => {
      ai.states[idx] = newState;
      markDirty(ai);
    },
  ];
}

const storeMap: Map<string, any> = new Map();
const storeSubscribersIndex: Map<
  ComponentInstance<any>,
  Set<string>
> = new Map();
const storeSubscribers: Map<string, Set<ComponentInstance<any>>> = new Map();

export function defineStore<S>(
  storeName: string,
  storeContent: S
): [useStore: () => S, setStore: (newStoreContent: S) => void] {
  storeMap.set(storeName, storeContent);
  storeSubscribers.set(storeName, new Set());
  const useStore = () => {
    if (activeInstance !== undefined) {
      // Подписать инстанс на store
      if (!storeSubscribersIndex.has(activeInstance)) {
        storeSubscribersIndex.set(activeInstance, new Set());
      }
      if (!storeSubscribersIndex.get(activeInstance)?.has(storeName)) {
        storeSubscribersIndex.get(activeInstance)?.add(storeName);
        storeSubscribers.get(storeName)?.add(activeInstance);
      }
    }
    return storeMap.get(storeName);
  };
  const setStore = (newStoreContent: S) => {
    storeMap.set(storeName, newStoreContent);
    storeSubscribers.get(storeName)?.forEach((instance) => {
      markDirty(instance);
    });
  };
  return [useStore, setStore];
}

// ----- Конец хуков

const schedUpdate = () => {
  for (let i = 0; i < dirtyInstance.length; i++) {
    if (dirtyInstance[i].size) {
      dirtyInstance[i].forEach((instance) => {
        instance.update();
      });
      dirtyInstance[i] = new Set();
      window.requestAnimationFrame(() => {
        schedUpdate();
      });
      return;
    }
  }
  isUpdateScheduled = false;
};

const normalizeChildren = (children: ChildrenType): NormalizedChildrenType => {
  if (children === undefined) {
    return [];
  }
  return flatten(children);
};

function jsx<PropsType extends ComponentPropsType>(
  type: string | ((props: PropsType) => any),
  props: PropsType & {
    children?: ChildrenType;
  },
  key: KeyType
): JSXElementType {
  if (typeof type === "string") {
    const attributes = new Map<string, any>();
    Object.entries(props).forEach(([k, v]) => {
      if (k === "children") {
        return;
      }
      attributes.set(k, v);
    });

    return {
      type: "element",
      tagName: type,
      attributes,
      children: normalizeChildren(props.children),
    };
  } else {
    return {
      type: "component",
      func: type,
      key: key,
      props,
      children: normalizeChildren(props.children),
    };
  }
}

interface DOMElement {
  type: "element";
  elem: Element;
  attrs: Map<string, any>;
  eventListeners: { type: string; cb: () => void }[];
  children: (DOMElement | DOMTextNode)[];
}

interface DOMTextNode {
  type: "textNode";
  text: string;
  node: Node;
}

const patchAttributes = (repr: DOMElement, newAttrs: Map<string, any>) => {
  // 1) Удалить атрибуты, которые неактуальны
  repr.attrs.forEach((_v, k) => {
    if (newAttrs.has(k)) {
      repr.attrs.delete(k);
      repr.elem.removeAttribute(k);
    }
  });

  // 2) Заменить изменившие атрибуты
  repr.attrs.forEach((v, k) => {
    if (newAttrs.get(k) !== v) {
      if (
        k === "value" &&
        (repr.elem instanceof HTMLInputElement ||
          repr.elem instanceof HTMLTextAreaElement ||
          repr.elem instanceof HTMLSelectElement)
      ) {
        (repr.elem as any).value = newAttrs.get(k);
      } else {
        repr.elem.setAttribute(k, newAttrs.get(k));
      }
    }
  });

  // 3) Удалить старые event listeners
  repr.eventListeners.forEach((l) => {
    repr.elem.removeEventListener(l.type, l.cb);
  });

  // 4) Добавить новые атрибуты и event listeners
  newAttrs.forEach((v, k) => {
    if (!repr.attrs.has(k)) {
      if (k === "innerHTML") {
        repr.elem.innerHTML = v;
      } else if (
        k === "value" &&
        (repr.elem instanceof HTMLInputElement ||
          repr.elem instanceof HTMLTextAreaElement ||
          repr.elem instanceof HTMLSelectElement)
      ) {
        (repr.elem as any).value = v;
      } else if (k.startsWith("ON_")) {
        const type = k.slice(3);
        const cb = v as () => void;
        repr.elem.addEventListener(type, cb);
        repr.eventListeners.push({ type, cb });
      } else {
        repr.elem.setAttribute(k, v);
      }
    }
  });
};

class ComponentInstance<PropsType extends ComponentPropsType> {
  func: (props: PropsType) => any;
  instanceMap: Map<KeyType, ComponentInstance<any>>;
  domElement: DOMElement | undefined;
  vTree: JSXElement | undefined;
  props: PropsType;
  depth: number;
  states: any[] = [];
  parent: ComponentInstance<any> | undefined;

  constructor(
    func: (props: PropsType) => any,
    props: PropsType,
    parent: ComponentInstance<any> | undefined
  ) {
    this.func = func;
    this.props = props;
    this.instanceMap = new Map();
    this.parent = parent;
    this.depth = (parent?.depth ?? -1) + 1;

    this.update();
  }
  update() {
    this.updateVTree();
    this.patchInstances();
    this.patchDOMNodes();
  }
  /** Вызвать функцию шаблона компонента */
  updateVTree() {
    activeInstance = this;
    activeStateIndex = 0;
    this.vTree = this.func(this.props);
    if (this.vTree === undefined) {
      throw new Error("vTree is undefined");
    }
    activeInstance = undefined;
  }
  /** Обновить instanceMap в соответствии в VTRee */
  patchInstances() {
    if (this.vTree === undefined) {
      throw new Error("vTree is undefined");
    }

    // 1) Обойти всё VTree; получить карту виртуальных компонентов;
    const newInstanceMap = new Map<KeyType, JSXComponent<any>>();
    this.extractVirtualComponent(this.vTree, newInstanceMap);

    // 2) Удалить невостребованные интасы;
    this.instanceMap.forEach((v, k) => {
      if (!newInstanceMap.has(k)) {
        v.destroy();
        this.instanceMap.delete(k);
      }
    });

    // 3) Пометить интасы, у которых изменились пропсы, как грязные;
    this.instanceMap.forEach((v, k) => {
      const newProps = newInstanceMap.get(k) as JSXComponent<any>;
      if (!deepEqual(v.props, newProps)) {
        v.props = newProps.props;
        markDirty(v);
      }
    });

    // 4) Проинициализировать компоненты, которые есть только в виртуальном виде;
    newInstanceMap.forEach((v, k) => {
      if (!this.instanceMap.has(k)) {
        this.instanceMap.set(
          k,
          new ComponentInstance<any>(v.func, v.props, this)
        );
      }
    });
  }
  extractVirtualComponent(
    branch: JSXElement,
    mapToAdd: Map<KeyType, JSXComponent<any>>
  ) {
    branch.children.forEach((ch) => {
      if (typeof ch === "string") {
        return;
      }
      if (ch.type === "element") {
        this.extractVirtualComponent(ch, mapToAdd);
      } else {
        mapToAdd.set(ch.key, ch);
      }
    });
  }
  /** Обновить свои DOM-узлы и разместить дочерние интасы */
  patchDOMNodes() {
    if (this.vTree === undefined) {
      throw new Error();
    }
    const parentElem = this.domElement?.elem.parentElement;
    // 1) Заменяем корневой элемент
    if (
      this.domElement?.elem.tagName.toUpperCase() !==
      this.vTree?.tagName.toUpperCase()
    ) {
      const prevChild = this.domElement?.elem;
      this.domElement = {
        type: "element",
        eventListeners: [],
        elem: document.createElement(this.vTree?.tagName),
        attrs: new Map(),
        children: this.domElement?.children ?? [],
      };
      if (parentElem !== null && prevChild !== undefined) {
        parentElem?.replaceChild(this.domElement.elem, prevChild);
      }
    }

    patchAttributes(this.domElement, this.vTree.attributes);

    // 2) Запускаем рекурсию
    this.patchDOMNodesImpl(
      this.vTree.children,
      this.domElement.children,
      this.domElement.elem
    );
  }
  patchDOMNodesImpl(
    branch: (JSXElementType | string)[],
    domRepr: (DOMElement | DOMTextNode)[],
    parentElement: Element
  ) {
    let branchIndex = 0;
    let domReprIndex = 0;
    const NodeArray: Node[] = [];
    while (1) {
      if (branchIndex >= branch.length) {
        break;
      }

      const vNode = branch[branchIndex];

      if (typeof vNode !== "string" && vNode.type === "component") {
        NodeArray.push(
          (
            (this.instanceMap.get(vNode.key) as ComponentInstance<any>)
              .domElement as DOMElement
          ).elem
        );
        branchIndex++;
        continue;
      }

      if (domReprIndex == domRepr.length) {
        if (typeof vNode !== "string") {
          domRepr.push({
            type: "element",
            elem: document.createElement(vNode.tagName),
            attrs: new Map(),
            children: [],
            eventListeners: [],
          });
        } else {
          domRepr.push({
            type: "textNode",
            text: vNode,
            node: document.createTextNode(vNode),
          });
        }
      }

      const domNode = domRepr[domReprIndex];

      if (typeof vNode === "string" && domNode.type === "element") {
        // Удалить из DOM
        domNode.elem.parentElement?.removeChild(domNode.elem);
        domRepr.splice(domReprIndex, 1);
        continue;
      }

      if (typeof vNode !== "string" && domNode.type === "textNode") {
        // Удалить из DOM
        domNode.node.parentElement?.removeChild(domNode.node);
        domRepr.splice(domReprIndex, 1);
        continue;
      }

      if (typeof vNode === "string" && domNode.type === "textNode") {
        domNode.node.textContent = vNode;
        branchIndex++;
        domReprIndex++;
        NodeArray.push(domNode.node);
        continue;
      }

      if (typeof vNode !== "string" && domNode.type === "element") {
        if (
          domNode.elem.tagName.toUpperCase() !== vNode.tagName.toUpperCase()
        ) {
          const newElementRepr: DOMElement = {
            type: "element",
            eventListeners: [],
            attrs: new Map(),
            elem: document.createElement(vNode.tagName),
            children: [],
          };
          domRepr.splice(domReprIndex, 1, newElementRepr);
          NodeArray.push(newElementRepr.elem);
        } else {
          NodeArray.push(domNode.elem);
        }
        const elemRepr = domRepr[domReprIndex] as DOMElement;
        patchAttributes(elemRepr, vNode.attributes);
        this.patchDOMNodesImpl(
          vNode.children,
          elemRepr.children,
          elemRepr.elem
        );
        branchIndex++;
        domReprIndex++;
      }
    }
    while (domRepr.length > domReprIndex) {
      const r = domRepr[domReprIndex];
      if (r.type === "element") {
        r.elem.parentElement?.removeChild(r.elem);
      } else {
        r.node.parentElement?.removeChild(r.node);
      }
      domRepr.splice(domReprIndex, 1);
    }
    // parentElement.replaceChildren(...NodeArray);
    arrangeNodes(parentElement, NodeArray);
  }

  destroy() {
    this.instanceMap.forEach((v) => {
      v.destroy();
    });

    if (this.domElement?.elem.parentElement !== null) {
      this.domElement?.elem.parentElement.removeChild(this.domElement.elem);
    }

    if (storeSubscribersIndex.has(this)) {
      storeSubscribersIndex.get(this)?.forEach((storeName) => {
        const storeSubs = storeSubscribers.get(storeName);
        if (storeSubs != undefined) {
          storeSubs.delete(this);
        }
      });
      storeSubscribersIndex.delete(this);
    }
  }
}

const createApp = (elem: Element, fn: () => JSXElementType) => {
  // Создать инсанс fn
  const inst = new ComponentInstance<any>(fn, {}, undefined);
  // Монтировать
  elem.appendChild(inst.domElement?.elem as Node);
  // Наслаждаться работой
};

export type { JSX };
export { jsx, jsx as jsxs, jsx as jsxDEV, createApp, useState };

function arrangeNodes(parent: Element, children: Node[]) {
  let curNode: Node | null = parent.firstChild;
  children.forEach((child) => {
    if (curNode !== child) {
      parent.insertBefore(child, curNode);
    }
    curNode = child.nextSibling;
  });
}
