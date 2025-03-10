(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['menu.hbs'] = template({'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
    return '<div class="button-menu" id="menu">\n    <div class="button_type_menu" id="button-close-menu">\n        <div class="button__text">Свернуть</div>\n        <img src="../static/icons/close-menu.svg" alt="Войти" class="button__img">\n    </div>\n    <div class="button_type_menu" id="button-profile">\n        <div class="button__text">Профиль</div>\n        <img src="../static/icons/profile.svg" alt="Войти" class="button__img">\n    </div>\n    <div class="button_type_menu" id="button-setting">\n        <div class="button__text">Настройки</div>\n        <img src="../static/icons/setting.svg" alt="Войти" class="button__img">\n    </div>\n    <div class="button_type_menu" id="button-logout">\n        <div class="button__text">Выход</div>\n        <img src="../static/icons/logout.svg" alt="Войти" class="button__img">\n    </div>\n</div>';
},'useData':true});
templates['logout.hbs'] = template({'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
    return '<div class="button-menu" id="menu">\n    <div class="button_type_menu" id="button-login">\n        Войти\n        <img src="../static/icons/login.svg" alt="Войти" class="button__img">\n    </div>\n</div>';
},'useData':true});
templates['login-account.hbs'] = template({'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
    };

  return '<div class="button-menu" id="menu">\n    '
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,'name') || (depth0 != null ? lookupProperty(depth0,'name') : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === 'function' ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{'name':'name','hash':{},'data':data,'loc':{'start':{'line':2,'column':4},'end':{'line':2,'column':14}}}) : helper)))
    + '\n    <div class="avatar" id="avatar">\n        <img src="../static/icons/menu.svg" alt="Меню" class="avatar__icon">\n        <img src="../static/icons/avatar.png" alt="Аватарка" class="avatar__img">\n    </div>\n</div>';
},'useData':true});
templates['card.hbs'] = template({'1':function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
    };

  return '  <div class="cards">\n'
    + ((stack1 = lookupProperty(helpers,'each').call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,'course') : depth0),{'name':'each','hash':{},'fn':container.program(2, data, 0),'inverse':container.noop,'data':data,'loc':{'start':{'line':3,'column':2},'end':{'line':36,'column':11}}})) != null ? stack1 : '')
    + '  </div>\n';
},'2':function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3='function', alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
    };

  return '    <div class="card">\n      <div class="picture" style="background-image: url(../static/icons/picture-test.png);">\n        <div class="descriptions">\n          <div class="description">\n            <img src="../static/icons/time.svg" alt="" class="description__icon">\n            '
    + alias4(((helper = (helper = lookupProperty(helpers,'time_to_pass') || (depth0 != null ? lookupProperty(depth0,'time_to_pass') : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'time_to_pass','hash':{},'data':data,'loc':{'start':{'line':9,'column':12},'end':{'line':9,'column':30}}}) : helper)))
    + ' ч\n          </div>\n          <div class="heart">\n            <img src="../static/icons/heart.svg" alt="" class="heart__img">\n          </div>\n        </div>\n        <div class="descriptions">\n          <div class="description">\n            <img src="../static/icons/user.svg" alt="" class="description__icon">\n            '
    + alias4(((helper = (helper = lookupProperty(helpers,'purchases_amount') || (depth0 != null ? lookupProperty(depth0,'purchases_amount') : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'purchases_amount','hash':{},'data':data,'loc':{'start':{'line':18,'column':12},'end':{'line':18,'column':34}}}) : helper)))
    + '\n          </div>\n        </div>\n      </div>\n      <div class="name">\n        '
    + alias4(((helper = (helper = lookupProperty(helpers,'title') || (depth0 != null ? lookupProperty(depth0,'title') : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'title','hash':{},'data':data,'loc':{'start':{'line':23,'column':8},'end':{'line':23,'column':19}}}) : helper)))
    + '\n      </div>\n      <div class="rating-and-price">\n        <div class="rating">\n          <img src="../static/icons/star.svg" alt="" class="rating__star full">\n          <img src="../static/icons/star.svg" alt="" class="rating__star full">\n          <img src="../static/icons/star.svg" alt="" class="rating__star full">\n          <img src="../static/icons/star.svg" alt="" class="rating__star full">\n          <img src="../static/icons/star.svg" alt="" class="rating__star">\n        </div>\n        <div class="rating-and-price__price">'
    + alias4(((helper = (helper = lookupProperty(helpers,'price') || (depth0 != null ? lookupProperty(depth0,'price') : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{'name':'price','hash':{},'data':data,'loc':{'start':{'line':33,'column':45},'end':{'line':33,'column':56}}}) : helper)))
    + ' ₽</div>\n      </div>\n    </div>\n';
},'4':function(container,depth0,helpers,partials,data) {
    return '  <div class="dont-content">\n  Нету курсов\n  </div>\n';
},'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
    };

  return ((stack1 = lookupProperty(helpers,'if').call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,'count_courses') : depth0),{'name':'if','hash':{},'fn':container.program(1, data, 0),'inverse':container.program(4, data, 0),'data':data,'loc':{'start':{'line':1,'column':0},'end':{'line':42,'column':9}}})) != null ? stack1 : '');
},'useData':true});
templates['window-login.hbs'] = template({'compiler':[8,'>= 4.3.0'],'main':function(container,depth0,helpers,partials,data) {
    return '<div class="blur">\n    <div id="window" class="window">\n        <div class="form">\n            <div class="logo">SkillForce</div>\n            <div class="error" id="error"></div>\n            <input type="email" id="email" placeholder="Почта" class="form__input">\n            <input type="text" id="name" placeholder="Псевдоним" class="form__input">\n            <input type="password" id="password" placeholder="Пароль" class="form__input">\n            <input type="password" id="password_admit" placeholder="Подтвердить пароль" class="form__input">\n        </div>\n        <div class="buttons">\n            <button class="buttons__button active" id="sign-up">Регистрация</button>\n            <button class="buttons__button" id="log-in">Вход</button>\n        </div>\n    </div>\n</div>';
},'useData':true});
})();