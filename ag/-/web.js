"use strict";
//app.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $$.Easing = {
            linear: function (t) { return t; },
            easeInQuad: function (t) { return t * t; },
            easeOutQuad: function (t) { return t * (2 - t); },
            easeInOutQuad: function (t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; },
            easeInCubic: function (t) { return t * t * t; },
            easeOutCubic: function (t) { return (--t) * t * t + 1; },
            easeInOutCubic: function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
            easeInQuart: function (t) { return t * t * t * t; },
            easeOutQuart: function (t) { return 1 - (--t) * t * t * t; },
            easeInOutQuart: function (t) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; },
            easeInQuint: function (t) { return t * t * t * t * t; },
            easeOutQuint: function (t) { return 1 + (--t) * t * t * t * t; },
            easeInOutQuint: function (t) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; }
        };
        let _pxStyleProps;
        function isPxStyleProp(prop) {
            if (!_pxStyleProps) {
                _pxStyleProps = {};
                const pxStyleProps = ['width', 'height'];
                const sides = ['left', 'top', 'right', 'bottom'];
                pxStyleProps.push(...sides);
                for (let i = 0, count = sides.length; i < count; i++) {
                    let side = sides[i];
                    side = side.charAt(0).toUpperCase() + side.slice(1);
                    pxStyleProps.push('margin' + side);
                    pxStyleProps.push('padding' + side);
                }
                for (let i = 0, count = pxStyleProps.length; i < count; i++)
                    _pxStyleProps[pxStyleProps[i]] = true;
            }
            return !!_pxStyleProps[prop];
        }
        const isArray = Array.isArray;
        const keyList = Object.keys;
        const hasProp = Object.prototype.hasOwnProperty;
        function is_deep_equal(a, b) {
            if (a === b)
                return true;
            if (a && b && typeof a == 'object' && typeof b == 'object') {
                var arrA = isArray(a), arrB = isArray(b), i, length, key;
                if (arrA != arrB)
                    return false;
                if (arrA && arrB) {
                    length = a.length;
                    if (length != b.length)
                        return false;
                    for (i = length; i-- !== 0;)
                        if (!is_deep_equal(a[i], b[i])) {
                            const result = false;
                            return result;
                        }
                    return true;
                }
                let setA = a instanceof Set;
                let setB = b instanceof Set;
                if (setA != setB)
                    return false;
                if (setA && setB) {
                    if (a.size != b.size)
                        return false;
                    let iter = a.keys();
                    let next = iter.next();
                    while (!next.done) {
                        if (!b.has(next.value))
                            return false;
                        next = iter.next();
                    }
                    iter = b.keys();
                    next = iter.next();
                    while (!next.done) {
                        if (!a.has(next.value))
                            return false;
                        next = iter.next();
                    }
                    return true;
                }
                let mapA = a instanceof Map;
                let mapB = b instanceof Map;
                if (mapA != mapB)
                    return false;
                if (mapA && mapB) {
                    const result = is_deep_equal([...a], [...b]);
                    return result;
                }
                var dateA = a instanceof Date, dateB = b instanceof Date;
                if (dateA != dateB)
                    return false;
                if (dateA && dateB)
                    return a.getTime() == b.getTime();
                var regexpA = a instanceof RegExp, regexpB = b instanceof RegExp;
                if (regexpA != regexpB)
                    return false;
                if (regexpA && regexpB)
                    return a.toString() == b.toString();
                var keys = keyList(a);
                length = keys.length;
                if (length !== keyList(b).length)
                    return false;
                for (i = length; i-- !== 0;)
                    if (!hasProp.call(b, keys[i]))
                        return false;
                for (i = length; i-- !== 0;) {
                    key = keys[i];
                    if (!is_deep_equal(a[key], b[key]))
                        return false;
                }
                return true;
            }
            return a !== a && b !== b;
        }
        $$.is_deep_equal = is_deep_equal;
        function createElem(p) {
            const dom_node = p && p.elem && typeof p.elem != 'string' ?
                p.elem :
                (p && p.ns && p.elem ?
                    document.createElementNS(p.ns, p.elem) :
                    document.createElement(p && p.elem || 'div'));
            const style = dom_node.style;
            function setStyleProp(prop, value) {
                if (Number.isFinite(value)) {
                    if (prop == 'opacity') {
                        value += '';
                    }
                    else if (isPxStyleProp(prop)) {
                        value += 'px';
                    }
                }
                else if (typeof value == 'boolean') {
                    if (prop == 'visibility')
                        value = value ? 'visible' : 'hidden';
                }
                if (typeof value != 'string') {
                    const msg = `prop: ${prop}, value: ${value}`;
                    console.error(msg);
                    console.trace();
                    throw new Error(msg);
                }
                else {
                    style[prop] = value;
                }
            }
            if (p.attrs)
                for (let attr in p.attrs)
                    dom_node.setAttribute(attr, p.attrs[attr]);
            if (p.style)
                for (let prop in p.style)
                    setStyleProp(prop, p.style[prop]);
            if (p.props)
                for (let prop in p.props)
                    dom_node[prop] = p.props[prop];
            if (p.events)
                for (let event in p.events)
                    dom_node.addEventListener(event, p.events[event], false);
            if (p.events_async)
                for (let event in p.events_async)
                    dom_node.addEventListener(event, p.events_async[event], { passive: true });
            if (p.events_sync)
                for (let event in p.events_sync)
                    dom_node.addEventListener(event, p.events_sync[event], { passive: false });
            if (p && p.cls)
                dom_node.classList.add(p.cls);
            if (p && p.parent) {
                if (p.parent.dom_node) {
                    p.parent.appendChild(dom_node);
                }
                else {
                    p.parent.appendChild(dom_node);
                }
            }
            let _raf;
            let _styleProps = {};
            let _nodeProps = {};
            let _nodeAttrs = {};
            function applyUpdates() {
                if (_raf === void 0)
                    _raf = requestAnimationFrame(function () {
                        for (let prop in _styleProps) {
                            setStyleProp(prop, _styleProps[prop]);
                            delete _styleProps[prop];
                        }
                        for (let prop in _nodeProps) {
                            dom_node[prop] = _nodeProps[prop];
                            delete _nodeProps[prop];
                        }
                        for (let attr in _nodeAttrs) {
                            dom_node.setAttribute(attr, _nodeAttrs[attr]);
                            delete _nodeAttrs[attr];
                        }
                        _raf = void 0;
                    });
            }
            const self = {
                dom_node() {
                    return dom_node;
                },
                updateDomStyle(styleProps) {
                    for (let prop in styleProps)
                        _styleProps[prop] = styleProps[prop];
                    applyUpdates();
                },
                updateDomProps(nodeProps) {
                    for (let prop in nodeProps)
                        _nodeProps[prop] = nodeProps[prop];
                    applyUpdates();
                },
                updateDomAttr(nodeAttrs, immediatly = false) {
                    if (immediatly) {
                        for (let attr in nodeAttrs)
                            dom_node.setAttribute(attr, nodeAttrs[attr]);
                    }
                    else {
                        for (let attr in nodeAttrs)
                            _nodeAttrs[attr] = nodeAttrs[attr];
                        applyUpdates();
                    }
                },
                appendChild(child) {
                    const child_node = child.dom_node ? child.dom_node() : child;
                    dom_node.appendChild(child_node);
                    return self;
                }
            };
            return self;
        }
        $$.createElem = createElem;
        let bodyCursor;
        let bodyCursorRaf;
        function setBodyCursor(p) {
            if ((bodyCursor === void 0 ||
                p.cursor !== 'default' ||
                p.origin === bodyCursor.origin && p.cursor != bodyCursor.cursor ||
                false)) {
                bodyCursor = p;
                if (bodyCursorRaf === void 0)
                    bodyCursorRaf = requestAnimationFrame(function () {
                        if (document.body.style.cursor != p.cursor)
                            document.body.style.cursor = p.cursor;
                        bodyCursorRaf = void 0;
                    });
            }
        }
        let AtomState;
        (function (AtomState) {
            AtomState[AtomState["invalid"] = 0] = "invalid";
            AtomState[AtomState["error"] = 1] = "error";
            AtomState[AtomState["valid"] = 2] = "valid";
        })(AtomState = $$.AtomState || ($$.AtomState = {}));
        let AtomType;
        (function (AtomType) {
            AtomType[AtomType["lazy"] = 0] = "lazy";
            AtomType[AtomType["force"] = 1] = "force";
        })(AtomType = $$.AtomType || ($$.AtomType = {}));
        let AtomValueDefType;
        (function (AtomValueDefType) {
            AtomValueDefType[AtomValueDefType["none"] = 0] = "none";
            AtomValueDefType[AtomValueDefType["simple"] = 1] = "simple";
            AtomValueDefType[AtomValueDefType["mastered"] = 2] = "mastered";
            AtomValueDefType[AtomValueDefType["shortcut"] = 3] = "shortcut";
        })(AtomValueDefType = $$.AtomValueDefType || ($$.AtomValueDefType = {}));
        function createAtomStore() {
            let _force_slaves_to_update = {};
            let _raf;
            function _update_force_slaves() {
                _raf = void 0;
                const slaves = Object.keys(_force_slaves_to_update);
                _force_slaves_to_update = {};
                for (let i = 0, count = slaves.length; i < count; i++) {
                    self.get(slaves[i]).value();
                }
            }
            function update_force_slaves(slaves) {
                for (let i = 0, count = slaves.length; i < count; i++) {
                    _force_slaves_to_update[slaves[i]] = true;
                }
                if (_raf === void 0)
                    _raf = requestAnimationFrame(_update_force_slaves);
            }
            function createAtom(store, name, p, type = AtomType.lazy) {
                let _store = store;
                let _state = AtomState.invalid;
                let _value;
                let _error;
                let _lazy_slaves = [];
                let _own_force_slaves = [];
                let _force_slaves;
                const _masters = p && (typeof p == 'function' ? null : p.masters.slice());
                let _value_def_type = AtomValueDefType.none;
                let _value_def;
                let _value_def_raf;
                let _value_def_invalid_atoms;
                if (p) {
                    if (typeof p == 'function') {
                        _value_def = p;
                        _value_def_type = AtomValueDefType.simple;
                    }
                    else {
                        const mastered_def = p;
                        if (mastered_def.value) {
                            _value_def = mastered_def.value;
                            _value_def_type = AtomValueDefType.mastered;
                        }
                        else if (mastered_def.v) {
                            _value_def = function value(p, val) {
                                const v = p.values();
                                if (!v && mastered_def.d) {
                                    _value_def_invalid_atoms = Object.keys(p.atoms()).filter(name => p.atoms()[name].state() !== AtomState.valid);
                                    if (_value_def_raf === void 0)
                                        _value_def_raf = setTimeout(() => {
                                            _value_def_raf = void 0;
                                            console.warn(name + ': atom update stopped by ', _value_def_invalid_atoms);
                                        }, 200);
                                }
                                if (v) {
                                    if (mastered_def.d) {
                                        clearTimeout(_value_def_raf);
                                        _value_def_raf = void 0;
                                    }
                                    const ret = mastered_def.v(v.get, val);
                                    if (ret !== void 0)
                                        val = ret;
                                }
                                return val;
                            };
                            _value_def_type = AtomValueDefType.mastered;
                        }
                        else {
                            const msg = 'atom "' + name + '" has no value def, though mastered';
                            console.error(msg);
                            console.trace();
                            throw new Error(msg);
                        }
                    }
                }
                function value_def(val) {
                    return _value_def_type == AtomValueDefType.simple ?
                        _value_def(val, _value) :
                        _value_def(master_provider, val, _value);
                }
                const master_provider = _value_def_type !== AtomValueDefType.mastered ? void 0 :
                    {
                        atoms: master_atoms,
                        values() {
                            const atoms = master_atoms();
                            const result = {};
                            for (let i = 0, count = _masters.length; i < count; i++) {
                                const name = _masters[i];
                                const atom = atoms[name];
                                const value = atom.value();
                                if (atom.state() != AtomState.valid)
                                    return;
                                result[name] = value;
                            }
                            function get(value_id) {
                                let value_name;
                                if (typeof value_id === 'string') {
                                    value_name = value_id;
                                }
                                else if (Number.isFinite(value_id)) {
                                    const master_idx = value_id;
                                    if (0 <= master_idx && master_idx < _masters.length) {
                                        value_name = _masters[master_idx];
                                    }
                                    else {
                                        const msg = 'atom::' + name + ': value_id "' + value_id + '" is out of masters range';
                                        console.error(msg);
                                        console.trace();
                                        throw new Error(msg);
                                    }
                                }
                                else {
                                }
                                const value = result[value_name];
                                if (value === void 0) {
                                    const msg = 'atom::' + name + ': value "' + value_name + '" not found in master values';
                                    console.error(msg);
                                    console.trace();
                                    throw new Error(msg);
                                }
                                return value;
                            }
                            get.get = get;
                            return get;
                        },
                    };
                const _type = type;
                function _spread_state(state, error) {
                    if (state === void 0)
                        state = _state;
                    if (error === void 0)
                        error = _error;
                    for (let i = 0, count = _lazy_slaves.length; i < count; i++) {
                        const slave = store.get(_lazy_slaves[i]);
                        slave.state(state, error);
                    }
                    for (let i = 0, count = _own_force_slaves.length; i < count; i++) {
                        const slave = store.get(_own_force_slaves[i]);
                        slave.state(state, error);
                    }
                    if (state === AtomState.invalid) {
                        const slaves = force_slaves();
                        if (slaves.length) {
                            update_force_slaves(slaves);
                        }
                    }
                }
                function force_slaves() {
                    if (!_force_slaves) {
                        _force_slaves = _own_force_slaves.slice();
                        for (let i = 0, count = _lazy_slaves.length; i < count; i++) {
                            const sub = _store.get(_lazy_slaves[i]).force_slaves();
                            _force_slaves.push(...sub);
                        }
                    }
                    return _force_slaves;
                }
                function _invalidate_force_slaves() {
                    if (_masters)
                        for (let i = 0, count = _masters.length; i < count; i++)
                            _store.get(_masters[i]).invalidate_force_slaves();
                }
                let _master_atoms;
                function master_atoms() {
                    if (!_master_atoms) {
                        _master_atoms = {};
                        for (let i = 0, count = _masters.length; i < count; i++) {
                            const name = _masters[i];
                            const atom = _store.get(name);
                            _master_atoms[name] = atom;
                        }
                    }
                    return _master_atoms;
                }
                function atom_is_valid_value(val) {
                    return !(val === void 0 || Number.isNaN(val));
                }
                function atom_update(val) {
                    let result;
                    if (_value_def) {
                        try {
                            const prev_value = _state === AtomState.valid ? _value : void 0;
                            result = _value = value_def(val);
                            if (_value !== prev_value) {
                                self.state(_value === void 0 || Number.isNaN(_value) ? AtomState.invalid : AtomState.valid);
                            }
                        }
                        catch (err) {
                            console.error(err);
                            self.state(AtomState.error, result = err);
                        }
                    }
                    return result;
                }
                function atom_value(val) {
                    let result;
                    if (val !== void 0) {
                        if (!is_deep_equal(val, _value)) {
                            if (!_value_def) {
                                result = _value = val;
                                self.state(AtomState.valid);
                            }
                            else {
                                result = atom_update(val);
                            }
                        }
                    }
                    else if (_state === AtomState.valid) {
                        result = _value;
                    }
                    else if (_state === AtomState.error) {
                        result = _error;
                    }
                    else if (_state === AtomState.invalid && _value_def) {
                        result = atom_update(val);
                    }
                    return result;
                }
                atom_value.is_valid_value = atom_is_valid_value;
                atom_value.update = atom_update;
                atom_value.value = atom_value;
                atom_value.type = function atom_type() { return _type; };
                atom_value.state = function atom_state(val, err) {
                    if (val !== void 0 && (val !== _state || val === AtomState.valid || val === AtomState.error && err && err !== _error)) {
                        _state = val;
                        if (_state === AtomState.error) {
                            _error = err;
                            _spread_state();
                        }
                        else {
                            _error = void 0;
                            _spread_state(AtomState.invalid);
                        }
                    }
                    return _state;
                };
                atom_value.error = () => _error;
                atom_value._value = () => _value;
                atom_value.masters = () => _masters && _masters.slice();
                atom_value.add_slave = (name) => {
                    if (store.get(name).type() == AtomType.lazy) {
                        if (_lazy_slaves.indexOf(name) < 0)
                            _lazy_slaves.push(name);
                    }
                    else {
                        if (_own_force_slaves.indexOf(name) < 0)
                            _own_force_slaves.push(name);
                        _invalidate_force_slaves();
                    }
                };
                atom_value.force_slaves = force_slaves;
                atom_value.invalidate_force_slaves = () => {
                    _force_slaves = void 0;
                    _invalidate_force_slaves();
                };
                const self = atom_value;
                return self;
            }
            let _store = {};
            function get(name) {
                if (_store[name])
                    return _store[name];
                const msg = 'no atom "' + name + '"';
                console.error();
                console.trace();
                throw new Error(msg);
            }
            function def(name, p, type = AtomType.lazy) {
                if (_store[name]) {
                    const msg = 'atom "' + name + '" already exists';
                    console.error();
                    console.trace();
                    throw new Error(msg);
                }
                const atom = _store[name] = createAtom(self, name, p, type);
                const masters = atom.masters();
                if (masters) {
                    const count = masters.length;
                    for (let i = 0; i < count; i++) {
                        const master_atom = _store[masters[i]];
                        if (master_atom) {
                            master_atom.add_slave(name);
                        }
                        else {
                            const msg = 'atom "' + masters[i] + '" can not be used as master before definition';
                            console.error(msg);
                            console.trace();
                            throw new Error(msg);
                        }
                    }
                    if (atom.type() == AtomType.force)
                        atom.value();
                }
            }
            function def_mastered_shortcut(name, masters, v, p) {
                const type = (p && p.t) !== void 0 ? p.t : AtomType.lazy;
                const mastered_def = { masters, v, d: p && p.d };
                return def(name, mastered_def, type);
            }
            function def_write_shortcut(name, w, type = AtomType.lazy) {
                const value = (val) => {
                    if (val !== void 0) {
                        const ret = w(val);
                        if (ret !== void 0)
                            val = ret;
                    }
                    return val;
                };
                return def(name, value, type);
            }
            function def_read_write_shortcut(name, r, w, type = AtomType.lazy) {
                const value = (val) => {
                    if (val === void 0) {
                        val = r();
                    }
                    else {
                        const ret = w(val);
                        if (ret !== void 0)
                            val = ret;
                    }
                    return val;
                };
                return def(name, value, type);
            }
            function def_read_shortcut(name, r, type = AtomType.lazy) {
                const value = (val) => {
                    if (val === void 0)
                        val = r();
                    return val;
                };
                return def(name, value, type);
            }
            get.get = get;
            get.def = def;
            get.m = def_mastered_shortcut;
            get.w = def_write_shortcut;
            get.rw = def_read_write_shortcut;
            get.r = def_read_shortcut;
            const self = get;
            return self;
        }
        $$.createAtomStore = createAtomStore;
        function ag_chart(chart_mode) {
            const _atoms = createAtomStore();
            _atoms.w('width', (val) => val);
            _atoms.w('paddingHor', (val) => {
                check_box_bar_elem.updateDomStyle({ marginLeft: val, marginRight: val });
                scroll_elem.updateDomStyle({ marginLeft: val, marginRight: val });
                title_elem.updateDomStyle({ paddingLeft: val, paddingRight: val });
            });
            _atoms.rw('is_visible', () => false, (val) => elem.updateDomStyle({ visibility: val }));
            _atoms.w('title', (val) => {
                const is_visible = !!val;
                title_elem.updateDomStyle({ display: is_visible ? 'block' : 'none' });
                if (is_visible) {
                    title_elem.updateDomProps({ innerText: val });
                }
            });
            _atoms.w('minHeight', (val) => {
                if (val < grid_min_height)
                    throw new Error(`${{ val, grid_min_height }}`);
            });
            _atoms.m('grid_height', ['minHeight'], (v) => {
                let height = v(0) - grid_height_correction;
                grid_elem.updateDomStyle({ height });
                return height;
            }, { t: AtomType.force });
            _atoms.m('scroll_width', ['width', 'paddingHor'], (v) => {
                const result = v(0) - 2 * v(1);
                return result;
            }, { d: true });
            _atoms.def('scroll_mid', {
                masters: ['scroll_width'],
                value(p, val, prev) {
                    const v = p.values();
                    if (v) {
                        if (val === void 0) {
                            if (!prev) {
                                val = {
                                    width: v.get('scroll_width'),
                                    left: void 0
                                };
                            }
                            else {
                                const ratio = v.get('scroll_width') / prev.total;
                                val = {
                                    width: Math.round(prev.width * ratio),
                                    left: Math.round(prev.left * ratio),
                                };
                            }
                        }
                        if (!val.total)
                            val.total = v.get('scroll_width');
                        val.width = Math.min(val.total, Math.max(scroll_mid_width_min(), val.width));
                        val.left = val.left === void 0 ? val.total - val.width : Math.min(val.total - val.width, Math.max(0, val.left));
                        if (!prev || val.left !== prev.left) {
                            scroll_left_elem.updateDomStyle({ width: val.left + scroll_selector_round_compensation });
                            scroll_mid_elem.updateDomStyle({ left: val.left });
                        }
                        if (!prev || val.width !== prev.width) {
                            scroll_mid_elem.updateDomStyle({ width: val.width });
                            scroll_mid_elem.updateDomAttr({ viewBox: scroll_mid_elem_viewBox(val.width) });
                            scroll_mid_path_elem.updateDomAttr({ d: scroll_mid_path_elem_d(val.width) });
                            scroll_mid_path3_elem.updateDomAttr({ d: scroll_mid_path3_elem_d(val.width) });
                        }
                        if (!prev || val.left !== prev.left || val.width !== prev.width) {
                            const left = val.left + val.width - scroll_selector_round_compensation;
                            const width = val.total - left;
                            scroll_right_elem.updateDomStyle({ left, width });
                        }
                    }
                    else {
                    }
                    return val;
                }
            }, AtomType.force);
            let _request;
            _atoms.w('data_url', (val) => {
                if (_request !== void 0)
                    _request.abort();
                _request = new XMLHttpRequest();
                _request.onreadystatechange = function () {
                    if (_request.readyState === 4) {
                        let data = _request.status !== 200 ? null : JSON.parse(_request.responseText);
                        _request = void 0;
                        if (data.columns.length < 2 || data.columns[0].length < 3)
                            data = null;
                        _atoms('data')(data);
                    }
                };
                _request.open('GET', val, true);
                _request.send(null);
            });
            _atoms.def('data');
            _atoms.m('columns', ['data'], (v) => {
                const val = v(0);
                const columns = [];
                if (!val) {
                }
                else {
                    function findIdOfX(types) {
                        for (var id in types)
                            if (types[id] === 'x')
                                return id;
                        return null;
                    }
                    var idOfX = findIdOfX(val.types);
                    if (!idOfX)
                        throw new Error('x axis not found in data');
                    if (chart_mode == 3 || chart_mode == 4) {
                        let xColumn;
                        for (let c = 0; c < val.columns.length; c++) {
                            let columnData = val.columns[c];
                            let id = columnData[0];
                            const color = val.colors[id];
                            const name = val.names[id];
                            let column = {
                                id,
                                name,
                                data: columnData,
                                color,
                                min: forceMinY !== undefined ? forceMinY : columnData[1],
                                max: columnData[1],
                            };
                            if (id === idOfX) {
                                column.min = columnData[1];
                                column.max = columnData[columnData.length - 1];
                                xColumn = column;
                            }
                            else {
                                columns.push(column);
                            }
                        }
                        setTimeout(() => {
                            _atoms('xColumn')(xColumn);
                        });
                        return columns;
                    }
                    else if (chart_mode == 2) {
                        let xColumn;
                        for (let c = 0; c < val.columns.length; c++) {
                            let columnData = val.columns[c];
                            let id = columnData[0];
                            const color = val.colors[id];
                            const name = val.names[id];
                            let column = {
                                id,
                                name,
                                data: columnData,
                                color,
                                min: forceMinY !== undefined ? forceMinY : columnData[1],
                                max: columnData[1],
                            };
                            if (id === idOfX) {
                                column.min = columnData[1];
                                column.max = columnData[columnData.length - 1];
                                xColumn = column;
                            }
                            else {
                                columns.push(column);
                            }
                        }
                        setTimeout(() => {
                            _atoms('xColumn')(xColumn);
                        });
                        return columns;
                    }
                    else {
                        const data = val;
                        if (chart_mode == 1 && data.columns.length !== 3)
                            throw new Error('chart_mode 1 expects exactly 2 data columns, found ' + (data.columns.length - 1));
                        for (var c = 0; c < data.columns.length; c++) {
                            let columnData = data.columns[c];
                            let id = columnData[0];
                            const color = data.colors[id];
                            const name = data.names[id];
                            let column = {
                                id,
                                name,
                                data: columnData,
                                color,
                            };
                            if (id === idOfX) {
                                column.min = columnData[1];
                                column.max = columnData[columnData.length - 1];
                                _atoms('xColumn')(column);
                            }
                            else {
                                for (var i = 2; i < columnData.length; i++) {
                                    var value = columnData[i];
                                    if (void 0 === column.min || column.min > value)
                                        column.min = value;
                                    if (void 0 === column.max || column.max < value)
                                        column.max = value;
                                }
                                columns.push(column);
                            }
                        }
                    }
                }
                return columns;
            }, { d: false });
            _atoms.def('xColumn');
            _atoms.m('intervalX', ['xColumn'], (v) => v(0).data[2] - v(0).data[1]);
            _atoms.m('previewMinMaxX', ['xColumn'], (v) => ({ min: v(0).min, max: v(0).max }));
            _atoms.m('previewRangeX', ['previewMinMaxX'], (v) => v(0).max - v(0).min);
            _atoms.m('selector_points', ['columns'], (v) => {
                const columns = v(0);
                const selector_points = [];
                for (var c = 0; c < columns.length; c++) {
                    selector_points.push(createElem({
                        cls: 'ag-chart-selector-point',
                        parent: grid_elem,
                        style: { borderColor: columns[c].color }
                    }));
                }
                return selector_points;
            }, { t: AtomType.force });
            _atoms.m('info_body', ['columns'], (v) => {
                const columns = v(0);
                const result = [];
                for (var c = 0; c < columns.length; c++) {
                    const name = columns[c].name;
                    const color = columns[c].color;
                    const info_item = createElem({
                        cls: 'ag-chart-info-item',
                        parent: info_body_elem,
                    });
                    result.push(info_item);
                    const item_percent = createElem({
                        cls: 'ag-chart-info-item-percent',
                        parent: info_item,
                        style: { display: chart_mode == 2 || chart_mode == 4 ? 'block' : 'none' },
                    });
                    const item_name = createElem({
                        cls: 'ag-chart-info-item-name',
                        parent: info_item,
                        props: { innerText: name }
                    });
                    const item_count = createElem({
                        cls: 'ag-chart-info-item-count',
                        parent: info_item,
                        style: { color }
                    });
                    info_items.push({ info_item, item_count, item_name, item_percent });
                }
                return result;
            }, { t: AtomType.force });
            _atoms.m('checkboxes', ['columns'], (v) => {
                const columns = v(0);
                const checkboxes = [];
                const checkbox_dom_nodes = [];
                if (columns.length > 1) {
                    const checks = Array(columns.length);
                    const pressProcessed = Array(columns.length);
                    const pressTimer = Array(columns.length);
                    let lastTarget;
                    for (var c = 0; c < columns.length; c++) {
                        checks[c] = true;
                        const name = columns[c].name;
                        const color = columns[c].color;
                        const item = createElem({
                            parent: check_box_bar_elem,
                            style: {
                                display: 'flex',
                                position: 'relative',
                                marginRight: '16px'
                            }
                        });
                        createElem({ parent: item,
                            style: {
                                width: '20px',
                                marginRight: '8px',
                                borderTop: '4px solid ' + color,
                                position: 'relative',
                                top: '6px',
                            }
                        });
                        createElem({ parent: item,
                            props: { innerText: name },
                        });
                    }
                }
                return checkboxes;
            }, { t: AtomType.force });
            _atoms.m('alpha_grid', ['columns'], (v, val) => {
                const columns = v(0);
                if (val === void 0) {
                    val = [];
                    for (var c = 0, count = columns.length; c < count; c++)
                        val.push(createAnimation(1, SCALE_DURATION));
                }
                return val;
            });
            _atoms.m('alpha_scroll', ['columns'], (v, val) => {
                const columns = v(0);
                if (val === void 0) {
                    val = [];
                    for (var c = 0, count = columns.length; c < count; c++)
                        val.push(createAnimation(1, SCALE_DURATION));
                }
                return val;
            });
            const touchPrecision = 15;
            const scroll_selector_width = 10;
            const scroll_selector_round_compensation = 4;
            let _scroll_mid_width_min;
            function scroll_mid_width_min() {
                return _atoms('scroll_width')() / 12 * 4;
                if (_scroll_mid_width_min === void 0)
                    _scroll_mid_width_min =
                        'ontouchstart' in window ?
                            (scroll_selector_width + touchPrecision) * 2 + touchPrecision :
                            scroll_selector_width * 4;
                return _scroll_mid_width_min;
            }
            function scroll_mid_width_default() {
                return Math.max(60, scroll_mid_width_min());
            }
            const header_height = 13;
            const grid_margin_top = 16;
            const scroll_margin_top = 10;
            const scroll_height = 40;
            const check_box_bar_margin_top = 14;
            const check_box_bar_min_height = 36;
            const grid_height_correction = header_height + grid_margin_top + check_box_bar_min_height + check_box_bar_margin_top + scroll_height + scroll_margin_top;
            const grid_min_height = 240 - grid_height_correction;
            const elem = createElem({ cls: 'ag-chart' });
            const header_elem = createElem({ cls: 'ag-chart-header', parent: elem });
            const title_elem = createElem({ cls: 'ag-chart-title', parent: header_elem });
            const label_cont_elem = createElem({ cls: 'ag-chart-label-container', parent: header_elem });
            const period_elem = createElem({ cls: 'ag-chart-period', parent: label_cont_elem });
            const grid_elem = createElem({
                cls: 'ag-chart-grid',
                parent: elem, style: {
                    marginTop: grid_margin_top + 'px',
                },
                events: {
                    mouseleave(event) { select_i(null); },
                    mouseenter(event) { select_i(event.clientX); },
                    mousemove(event) { select_i(event.clientX); },
                    touchstart(event) { select_i(event.touches[0].clientX); },
                    touchmove(event) { select_i(event.touches[0].clientX); },
                    touchend() { select_i(null); },
                    touchcancel() { select_i(null); },
                },
            });
            const info_elem = createElem({ cls: 'ag-chart-info', parent: elem });
            const info_header_elem = createElem({ cls: 'ag-chart-info-header', parent: info_elem });
            const info_body_elem = createElem({ cls: 'ag-chart-info-body', parent: info_elem });
            let _selected_i;
            const info_items = [];
            let last_info_left;
            function select_i(clientX) {
                if (clientX !== void 0) {
                    const previewMinMaxX = _atoms('previewMinMaxX')();
                    const intervalX = _atoms('intervalX')();
                    const mainScaleX = _atoms('mainScaleX')();
                    const mainScaleY = _atoms('mainScaleY')();
                    const mainOffsetX = _atoms('mainOffsetX')();
                    const mainOffsetY = _atoms('mainOffsetY')();
                    const alpha_grid = _atoms('alpha_grid')();
                    const xColumn = _atoms('xColumn')();
                    const columns = _atoms('columns')();
                    if (clientX !== null) {
                        const was_selected = _selected_i !== null;
                        const clientRect = grid_canvas_elem.dom_node().getBoundingClientRect();
                        let offsetLeft = clientX - clientRect.left;
                        if (offsetLeft < _atoms('paddingHor')()) {
                            clientX = null;
                        }
                        else {
                            let x = ((clientX - clientRect.left) * pixelRatio - mainOffsetX) / mainScaleX;
                            const selected_i = Math.round((x - previewMinMaxX.min) / intervalX) + 1;
                            if (selected_i >= xColumn.data.length) {
                                clientX = null;
                            }
                            else if (selected_i != _selected_i) {
                                _selected_i = selected_i;
                                const selected_x = xColumn.data[_selected_i];
                                const leftOffset = Math.round((selected_x * mainScaleX + mainOffsetX) / pixelRatio);
                                if (chart_mode != 2 && chart_mode != 3) {
                                    vert_line_elem.updateDomStyle({
                                        width: leftOffset + 'px',
                                        opacity: 1,
                                        transition: (!was_selected ? '' : 'opacity 0.1s, ') + (was_selected ? 'width 0.1s' : ''),
                                    });
                                }
                                else {
                                    const width = _atoms('width')();
                                    const theme = _atoms('theme')();
                                    const mainHeight = _atoms('mainHeight')();
                                    const leftWidth = Math.round(((selected_x - intervalX / 2) * mainScaleX + mainOffsetX) / pixelRatio) + 1;
                                    const rightOffset = Math.round(((selected_x + intervalX / 2) * mainScaleX + mainOffsetX) / pixelRatio);
                                    const rightWidth = width - rightOffset;
                                    vert_left_elem.updateDomStyle({
                                        position: 'absolute',
                                        height: (mainHeight / pixelRatio),
                                        left: 0,
                                        top: 0,
                                        width: leftWidth,
                                        background: theme == 'day' ? '#FFFFFF' : '#242F3E',
                                        opacity: '0.5',
                                        transition: (!was_selected ? '' : 'opacity 0.1s, ') + (was_selected ? 'width 0.1s' : ''),
                                    });
                                    vert_right_elem.updateDomStyle({
                                        position: 'absolute',
                                        height: (mainHeight / pixelRatio),
                                        right: 0,
                                        top: 0,
                                        width: rightWidth,
                                        background: theme == 'day' ? '#FFFFFF' : '#242F3E',
                                        opacity: '0.5',
                                        transition: (!was_selected ? '' : 'opacity 0.1s, ') + (was_selected ? 'width 0.1s' : ''),
                                    });
                                }
                                const client_y_values = [];
                                const selector_points = _atoms('selector_points')();
                                for (var c = 0; c < columns.length; c++) {
                                    var yColumn = columns[c];
                                    if (alpha_grid[c].toValue === 0) {
                                        info_items[c].info_item.updateDomStyle({ display: 'none' });
                                    }
                                    else {
                                        let client_y;
                                        let y;
                                        if (chart_mode == 0 || c == 0) {
                                            y = yColumn.data[_selected_i];
                                            client_y = Math.round((y * mainScaleY + mainOffsetY) / pixelRatio);
                                        }
                                        else {
                                            const mainScaleY = _atoms('mainScaleY2')();
                                            const mainOffsetY = _atoms('mainOffsetY2')();
                                            y = yColumn.data[_selected_i];
                                            client_y = Math.round((y * mainScaleY + mainOffsetY) / pixelRatio);
                                        }
                                        client_y_values.push(client_y);
                                        if (chart_mode == 1 || chart_mode == 0)
                                            selector_points[c].updateDomStyle({
                                                left: (leftOffset - 6) + 'px',
                                                top: (client_y - 6) + 'px',
                                                opacity: 1,
                                                transition: (!was_selected ? '' : 'opacity 0.1s, ') + (was_selected ? 'top 0.1s, left 0.1s' : ''),
                                            });
                                        info_items[c].info_item.dom_node().style.display = 'flex';
                                        info_items[c].item_count.updateDomProps({ innerText: y + '' });
                                    }
                                }
                                if (chart_mode == 2) {
                                    const previewMinMaxY = _atoms('previewMinMaxY')();
                                    for (var c = 0; c < columns.length; c++) {
                                        var yColumn = columns[c];
                                        if (alpha_grid[c].toValue === 0) {
                                        }
                                        else {
                                            let p = (yColumn.data[_selected_i] / previewMinMaxY.max * 100);
                                            p = p < 1 ? p.toPrecision(1) : Math.round(p);
                                            info_items[c].item_percent.updateDomProps({ innerText: p + '%' });
                                        }
                                    }
                                }
                                if (chart_mode == 4) {
                                    let total = 0;
                                    for (var c = 0; c < columns.length; c++) {
                                        var yColumn = columns[c];
                                        if (alpha_grid[c].toValue === 0) {
                                        }
                                        else {
                                            total += yColumn.data[_selected_i];
                                        }
                                    }
                                    for (var c = 0; c < columns.length; c++) {
                                        var yColumn = columns[c];
                                        if (alpha_grid[c].toValue === 0) {
                                        }
                                        else {
                                            let p = (yColumn.data[_selected_i] / total * 100);
                                            p = p < 1 ? p.toPrecision(1) : Math.round(p);
                                            info_items[c].item_percent.updateDomProps({ innerText: p + '%' });
                                        }
                                    }
                                }
                                {
                                    const infoClientRect = info_elem.dom_node().getBoundingClientRect();
                                    const infoWidth = (infoClientRect.right - infoClientRect.left);
                                    let left = Math.max(0, Math.min(_atoms('width')() - infoWidth, leftOffset - (infoWidth / 2)));
                                    let needAdjustLeft = false;
                                    const avail_lefts = [];
                                    if (chart_mode <= 1) {
                                        if (!client_y_values.length) {
                                            avail_lefts.push(left);
                                        }
                                        else {
                                            const max_client_y = Math.max(...client_y_values);
                                            const gridClientRect = grid_elem.dom_node().getBoundingClientRect();
                                            if (max_client_y - 6 - gridClientRect.top >= infoClientRect.height - 5) {
                                                avail_lefts.push(left);
                                            }
                                        }
                                    }
                                    let margin = chart_mode <= 1 ? 6 : 26;
                                    if (leftOffset + margin <= _atoms('width')() - infoWidth) {
                                        avail_lefts.push(leftOffset + margin);
                                    }
                                    if (leftOffset - infoWidth - margin >= 0) {
                                        avail_lefts.push(leftOffset - infoWidth - margin);
                                    }
                                    if (last_info_left == null || avail_lefts.length == 1) {
                                        left = avail_lefts[0];
                                    }
                                    else {
                                        let dist_min;
                                        let i_min;
                                        for (let i = 0; i < avail_lefts.length; i++) {
                                            if (i_min === void 0) {
                                                i_min = i;
                                                dist_min = Math.abs(last_info_left - avail_lefts[i]);
                                            }
                                            else {
                                                const dist = Math.abs(last_info_left - avail_lefts[i]);
                                                if (dist < dist_min) {
                                                    i_min = i;
                                                    dist_min = dist;
                                                }
                                            }
                                        }
                                        left = avail_lefts[i_min];
                                    }
                                    last_info_left = left;
                                    info_elem.updateDomStyle({
                                        left: left + 'px',
                                        opacity: 1,
                                        transition: (!was_selected ? '' : 'opacity 0.1s, ') + (was_selected ? 'top 0.1s, left 0.1s' : ''),
                                    });
                                    {
                                        let innerText;
                                        var date = new Date(selected_x);
                                        innerText = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'][selected_x];
                                        info_header_elem.updateDomProps({ innerText });
                                    }
                                }
                            }
                        }
                    }
                    if (clientX === null) {
                        _selected_i = null;
                        last_info_left = null;
                        const hide = {
                            opacity: 0,
                            transition: 'opacity 0.5s',
                        };
                        vert_line_elem.updateDomStyle(hide);
                        if (chart_mode == 0 || chart_mode == 1) {
                            const selector_points = _atoms('selector_points')();
                            for (var c = 0; c < columns.length; c++) {
                                selector_points[c].updateDomStyle(hide);
                            }
                        }
                        else if (chart_mode == 2 || chart_mode == 3) {
                            vert_left_elem.updateDomStyle({ opacity: 0 });
                            vert_right_elem.updateDomStyle({ opacity: 0 });
                        }
                        info_elem.updateDomStyle(hide);
                    }
                }
                return _selected_i;
            }
            const grid_canvas_elem = createElem({
                elem: 'canvas',
                cls: 'ag-chart-grid-canvas',
                parent: grid_elem,
                style: {
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                    width: '100%',
                    height: '100%',
                },
            });
            const grid_canvas_context = grid_canvas_elem.dom_node().getContext('2d');
            const vert_line_elem = createElem({ cls: 'ag-chart-vert-line', parent: grid_elem });
            const vert_left_elem = createElem({ cls: 'ag-chart-vert-left', parent: grid_elem, style: { opacity: 0 } });
            const vert_right_elem = createElem({ cls: 'ag-chart-vert-right', parent: grid_elem, style: { opacity: 0 } });
            const xLineStyle = {
                'day': {
                    0: { color: '#182D3B', opacity: .1 },
                    1: { color: '#182D3B', opacity: .1 },
                    2: { color: '#182D3B', opacity: .1 },
                    3: { color: '#252529', opacity: .5 },
                    4: { color: '#252529', opacity: .5 },
                },
                'night': {
                    0: { color: '#FFFFFF', opacity: .1 },
                    1: { color: '#FFFFFF', opacity: .1 },
                    2: { color: '#FFFFFF', opacity: .1 },
                    3: { color: '#FFFFFF', opacity: .1 },
                    4: { color: '#FFFFFF', opacity: .1 },
                },
            };
            function hexToRgbA(hex, opacity) {
                var c;
                if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
                    c = hex.substring(1).split('');
                    if (c.length == 3) {
                        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
                    }
                    c = +('0x' + c.join(''));
                    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + opacity + ')';
                }
                throw new Error('Bad Hex');
            }
            _atoms.w('theme', (val) => {
                vert_line_elem.updateDomStyle({
                    borderRight: '1px solid ' + hexToRgbA(xLineStyle[val][chart_mode].color, xLineStyle[val][chart_mode].opacity)
                });
                scroll_mid_path_elem.updateDomStyle({ color: { day: '#C0D1E1', night: '56626D' }[val] });
                return val;
            });
            const scroll_elem = createElem({ cls: 'ag-chart-scroll', parent: elem });
            const scroll_canvas_elem = createElem({
                elem: 'canvas',
                cls: 'ag-chart-scroll-canvas',
                parent: scroll_elem,
                style: {
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                    width: '100%',
                    height: '100%',
                },
            });
            const scroll_canvas_context = scroll_canvas_elem.dom_node().getContext('2d');
            const scroll_left_elem = createElem({ cls: 'ag-chart-scroll-left', parent: scroll_elem });
            const scroll_right_elem = createElem({ cls: 'ag-chart-scroll-right', parent: scroll_elem });
            function scroll_mid_elem_viewBox(width) {
                return '0 0 ' + (width * 3) + ' 126';
            }
            function scroll_mid_path_elem_d(width) {
                const innerWidth = (width - 20) * 3;
                const result = '' +
                    'M30 3' +
                    'l' + innerWidth + ' 0' +
                    'l0 120' +
                    'l-' + innerWidth + ' 0' +
                    'z' +
                    'M16 0a16 16 0 0 0 -16 16' +
                    'l0 94 a16 16 0 0 0 16 16' +
                    'l' + (innerWidth + 28) + ' 0 a16 16 90 0 0 16 -16 l0 -94a16 16 90 0 0 -16 -16z' +
                    '';
                return result;
            }
            const scroll_mid_elem = createElem({
                ns: 'http://www.w3.org/2000/svg',
                elem: 'svg',
                cls: 'ag-chart-scroll-mid',
                parent: scroll_elem,
                attrs: {
                    viewBox: scroll_mid_elem_viewBox(60),
                    preserveAspectRatio: 'xMidYMid',
                },
                style: {
                    height: (scroll_height + 3) + 'px',
                    top: '-1.6px',
                },
            });
            const scroll_mid_path_elem = createElem({
                ns: 'http://www.w3.org/2000/svg',
                elem: 'path',
                parent: scroll_mid_elem,
                attrs: {
                    d: scroll_mid_path_elem_d(60),
                },
            });
            const scroll_mid_path2_elem = createElem({
                ns: 'http://www.w3.org/2000/svg',
                elem: 'path',
                parent: scroll_mid_elem,
                attrs: {
                    fill: 'white',
                    d: 'M12 51a3 3 180 0 1 6 0l0 24 a3 3 180 0 1 -6 0z'
                },
            });
            const scroll_mid_path3_elem = createElem({
                ns: 'http://www.w3.org/2000/svg',
                elem: 'path',
                parent: scroll_mid_elem,
                attrs: {
                    fill: 'white',
                    d: scroll_mid_path3_elem_d(60),
                },
            });
            function scroll_mid_path3_elem_d(width) {
                return 'M' + (width * 3 - 18) + ' 51a3 3 180 0 1 6 0l0 24 a3 3 180 0 1 -6 0z';
            }
            const check_box_bar_elem = createElem({ cls: 'ag-chart-check-box-bar', parent: elem });
            scroll_elem.updateDomStyle({
                height: scroll_height + 'px',
                marginTop: scroll_margin_top + 'px',
            });
            let forceMinY = 0;
            var mainHeight;
            var textCountX = 6;
            var textCountY = 6;
            const SCALE_DURATION = 400;
            var TEXT_X_FADE_DURATION = 200;
            const pixelRatio = window.devicePixelRatio;
            var previewLineWidth = 1 * pixelRatio;
            const lineWidth = 1 * pixelRatio;
            var mainLineWidth = 2 * pixelRatio;
            var font = (10 * pixelRatio) + 'px system-ui';
            var textYMargin = -6 * pixelRatio;
            var textXMargin = 20 * pixelRatio;
            var textYHeight = 45 * pixelRatio;
            var MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            function formatDate(time, short = false) {
                var date = new Date(time);
                var s = MONTH_NAMES[date.getMonth()] + ' ' + date.getDate();
                if (short)
                    return s;
                return DAY_NAMES[date.getDay()] + ', ' + s;
            }
            function createAnimation(value, duration, easing) {
                return {
                    fromValue: value,
                    toValue: value,
                    value: value,
                    startTime: 0,
                    duration: duration,
                    delay: 0,
                    easing: easing || $$.Easing.easeOutQuad,
                };
            }
            const LIGHT_COLORS = {
                circleFill: '#ffffff',
                line: '#f2f4f5',
                zeroLine: '#ecf0f3',
                selectLine: '#dfe6eb',
                text: '#96a2aa',
                preview: '#eef2f5',
                previewAlpha: 0.8,
                previewBorder: '#b6cfe1',
                previewBorderAlpha: 0.5
            };
            let _colors = LIGHT_COLORS;
            const _anim_to_play = {};
            function play(p) {
                const atom_name = p.name;
                const value_key = p.key;
                const anim_name = atom_name + (value_key === void 0 ? '' : '_' + value_key);
                const atom = _atoms(atom_name);
                let value = atom.value();
                const anim = value_key === void 0 ? Object.assign({}, value) : Object.assign({}, value[value_key]);
                if (_anim_to_play[anim_name]) {
                    anim.toValue = p.toValue;
                    if (value_key === void 0) {
                        atom.value(anim);
                    }
                    else {
                        const new_value = Array.isArray(value) ? [...value] : Object.assign({}, value);
                        new_value[value_key] = anim;
                        atom.value(new_value);
                    }
                    return;
                }
                anim.startTime = void 0;
                anim.toValue = p.toValue;
                if (p.fromValue !== void 0) {
                    anim.value = p.fromValue;
                }
                if (anim.value !== void 0) {
                    anim.fromValue = anim.value;
                }
                else {
                    anim.fromValue = anim.value = p.toValue;
                }
                if (value_key === void 0) {
                    atom.value(anim);
                }
                else {
                    const new_value = Array.isArray(value) ? [...value] : Object.assign({}, value);
                    new_value[value_key] = anim;
                    atom.value(new_value);
                }
                if (anim.toValue != anim.fromValue) {
                    _anim_to_play[anim_name] = { atom_name, value_key };
                    playAnimation();
                }
            }
            function updateAnimation(anim_name, t) {
                const { atom_name, value_key } = _anim_to_play[anim_name];
                const atom = _atoms(atom_name);
                let value = atom.value();
                const anim = value_key === void 0 ? Object.assign({}, value) : Object.assign({}, value[value_key]);
                if (anim.value === anim.toValue)
                    return false;
                if (anim.value == null || isNaN(anim.value)) {
                    console.error({ anim_name }, anim.value);
                    anim.value = anim.toValue;
                }
                else {
                    if (anim.startTime === void 0) {
                        anim.startTime = t;
                    }
                    var progress = Math.max(0, Math.min(1, ((t - anim.startTime) - anim.delay) / anim.duration));
                    anim.value = anim.fromValue + (anim.toValue - anim.fromValue) * anim.easing(progress);
                }
                if (value_key === void 0) {
                    atom.value(anim);
                }
                else {
                    const new_value = Array.isArray(value) ? [...value] : Object.assign({}, value);
                    new_value[value_key] = anim;
                    atom.value(new_value);
                }
                return true;
            }
            let playAnimationRaf;
            function playAnimation() {
                if (playAnimationRaf === void 0)
                    playAnimationRaf = requestAnimationFrame(function (t) {
                        playAnimationRaf = void 0;
                        const anim_names = Object.keys(_anim_to_play);
                        let needReplay = false;
                        for (let i = 0, count = anim_names.length; i < count; i++) {
                            const anim_name = anim_names[i];
                            if (updateAnimation(anim_name, t)) {
                                needReplay = true;
                            }
                            else {
                                delete _anim_to_play[anim_name];
                            }
                        }
                        if (needReplay)
                            playAnimation();
                    });
            }
            _atoms.def('scroll_height', (val) => val || scroll_height);
            _atoms.def('previewMarginTop', (val) => val || 25 * pixelRatio);
            _atoms.def('scroll_canvas_width', {
                masters: ['scroll_width'],
                value(p) {
                    const v = p.values();
                    return !v ? void 0 : pixelRatio * v.get('scroll_width');
                },
            });
            _atoms.def('scroll_canvas_height', {
                masters: ['scroll_height'],
                value(p) {
                    const v = p.values();
                    if (v)
                        return pixelRatio * v.get('scroll_height');
                },
            });
            _atoms.def('scroll_canvas_context', {
                masters: ['scroll_canvas_width', 'scroll_canvas_height'],
                value(p, val) {
                    const v = p.values();
                    val = void 0;
                    if (v) {
                        const width = v.get('scroll_canvas_width');
                        const height = v.get('scroll_canvas_height');
                        scroll_canvas_elem.updateDomAttr({ width, height }, true);
                        val = scroll_canvas_elem.dom_node().getContext('2d');
                    }
                    return val;
                },
            });
            _atoms.def('grid_canvas_width', {
                masters: ['width'],
                value(p) {
                    const v = p.values();
                    return !v ? void 0 : pixelRatio * v.get('width');
                },
            });
            _atoms.def('grid_canvas_height', {
                masters: ['grid_height'],
                value(p) {
                    const v = p.values();
                    if (v)
                        return pixelRatio * v.get('grid_height');
                },
            });
            _atoms.def('grid_canvas_context', {
                masters: ['grid_canvas_width', 'grid_canvas_height'],
                value(p, val) {
                    const v = p.values();
                    val = void 0;
                    if (v) {
                        const width = v.get('grid_canvas_width');
                        const height = v.get('grid_canvas_height');
                        grid_canvas_elem.updateDomAttr({ width, height }, true);
                        val = grid_canvas_elem.dom_node().getContext('2d');
                    }
                    return val;
                },
            });
            _atoms.m('previewScaleX', ['scroll_width', 'previewRangeX'], (v) => v('scroll_width') * pixelRatio / v('previewRangeX'));
            _atoms.m('previewOffsetX', ['previewMinMaxX', 'previewScaleX'], (v) => -v('previewMinMaxX').min * v('previewScaleX'));
            _atoms.m('previewMinMaxY', ['xColumn', 'columns'], (v) => {
                const xColumn = v('xColumn');
                const columns = v('columns');
                const alpha = _atoms('alpha_grid')();
                let previewMinY = forceMinY !== undefined ? forceMinY : Number.MAX_VALUE;
                let previewMaxY = Number.MIN_VALUE;
                if (chart_mode == 0) {
                    const result = {};
                    for (var c = 0; c < columns.length; c++) {
                        if (alpha[c].toValue !== 0) {
                            var column = columns[c];
                            if (void 0 === result.min || result.min > column.min)
                                result.min = column.min;
                            if (void 0 === result.max || result.max < column.max)
                                result.max = column.max;
                        }
                    }
                    result.min = 0;
                    play({ name: 'previewMinY', toValue: result.min });
                    play({ name: 'previewMaxY', toValue: result.max });
                    return result;
                }
                else if (chart_mode == 1) {
                    const result = {};
                    let c = 0;
                    if (alpha[c].toValue !== 0) {
                        var column = columns[c];
                        if (void 0 === result.min || result.min > column.min)
                            result.min = column.min;
                        if (void 0 === result.max || result.max < column.max)
                            result.max = column.max;
                        play({ name: 'previewMinY', toValue: result.min });
                        play({ name: 'previewMaxY', toValue: result.max });
                    }
                    return result;
                }
                else if (chart_mode == 2 || chart_mode == 3) {
                    let total_max;
                    const totals = [];
                    for (let i = 1, count_i = xColumn.data.length; i < count_i; i++) {
                        let total = 0;
                        for (let c = 0, count_c = columns.length; c < count_c; c++) {
                            if (alpha[c].toValue !== 0) {
                                total += columns[c].data[i];
                            }
                        }
                        totals[i] = total;
                        if (void 0 === total_max || total_max < total)
                            total_max = total;
                    }
                    play({ name: 'previewMinY', fromValue: 0, toValue: 0 });
                    play({ name: 'previewMaxY', toValue: total_max });
                    return { min: 0, max: total_max };
                }
                else if (chart_mode == 4) {
                    const total_max = 100;
                    play({ name: 'previewMinY', fromValue: 0, toValue: 0 });
                    play({ name: 'previewMaxY', toValue: total_max });
                    play({ name: 'mainMinY', fromValue: 0, toValue: 0 });
                    play({ name: 'mainMaxY', toValue: total_max });
                    return { min: 0, max: total_max };
                }
                return { min: previewMinY, max: previewMaxY };
            }, { t: AtomType.force });
            _atoms.r('previewMinY', () => createAnimation(void 0, SCALE_DURATION));
            _atoms.r('previewMaxY', () => createAnimation(void 0, SCALE_DURATION));
            _atoms.r('previewMinY2', () => createAnimation(void 0, SCALE_DURATION));
            _atoms.r('previewMaxY2', () => createAnimation(void 0, SCALE_DURATION));
            _atoms.m('previewScaleY', ['scroll_height', 'previewMinY', 'previewMaxY'], (v) => {
                const minY = v('previewMinY');
                const maxY = v('previewMaxY');
                const mainHeight = v('scroll_height') * pixelRatio;
                const result = Number.isFinite(minY.value) && Number.isFinite(maxY.value) ?
                    -mainHeight / (maxY.value - minY.value) :
                    1;
                return result;
            }, { d: false });
            _atoms.m('previewOffsetY', ['scroll_height', 'previewMinY', 'previewScaleY'], (v) => {
                const mainMinY = v('previewMinY');
                const mainHeight = v('scroll_height') * pixelRatio;
                const mainScaleY = v('previewScaleY');
                const result = Number.isFinite(mainMinY.value) ?
                    mainHeight - mainMinY.value * mainScaleY :
                    0;
                return result;
            }, { d: false });
            _atoms.m('previewMinMaxY2', ['columns'], (v) => {
                const columns = v('columns');
                const alpha = _atoms('alpha_grid')();
                const result = {};
                if (chart_mode == 1) {
                    let c = 1;
                    if (alpha[c].toValue !== 0) {
                        var column = columns[c];
                        if (void 0 === result.min || result.min > column.min)
                            result.min = column.min;
                        if (void 0 === result.max || result.max < column.max)
                            result.max = column.max;
                        play({ name: 'previewMinY2', toValue: result.min });
                        play({ name: 'previewMaxY2', toValue: result.max });
                    }
                }
                return result;
            }, { t: AtomType.force });
            _atoms.m('previewScaleY2', ['scroll_height', 'previewMinY2', 'previewMaxY2'], (v) => {
                const mainMinY = v('previewMinY2');
                const mainMaxY = v('previewMaxY2');
                const mainHeight = v('scroll_height') * pixelRatio;
                const result = Number.isFinite(mainMinY.value) && Number.isFinite(mainMaxY.value) ?
                    -mainHeight / (mainMaxY.value - mainMinY.value) :
                    1;
                return result;
            }, { d: false });
            _atoms.m('previewOffsetY2', ['scroll_height', 'previewMinY2', 'previewScaleY2'], (v) => {
                const mainMinY = v('previewMinY2');
                const mainHeight = v('scroll_height') * pixelRatio;
                const mainScaleY = v('previewScaleY2');
                const result = Number.isFinite(mainMinY.value) ?
                    mainHeight - mainMinY.value * mainScaleY :
                    0;
                return result;
            }, { d: false });
            _atoms.m('mainMinMaxX', ['scroll_mid', 'previewOffsetX', 'previewScaleX'], (v) => {
                const scroll_mid = v('scroll_mid');
                const previewOffsetX = v('previewOffsetX');
                const previewScaleX = v('previewScaleX');
                function screenToPreviewX(screenX) {
                    return (screenX - previewOffsetX) / previewScaleX;
                }
                const result = {
                    min: screenToPreviewX(scroll_mid.left * pixelRatio),
                    max: screenToPreviewX((scroll_mid.left + scroll_mid.width) * pixelRatio),
                };
                _atoms('mainRangeX')(result.max - result.min);
                return result;
            }, { d: true });
            _atoms.def('mainRangeX');
            _atoms.r('textXWidth', () => 40 * pixelRatio);
            _atoms.m('textCountX', ['width', 'textXWidth'], (v) => Math.max(1, Math.floor(v(0) * pixelRatio / v(1) / 2)));
            _atoms.r('mainMinY', () => createAnimation(void 0, SCALE_DURATION, $$.Easing.easeOutQuad));
            _atoms.r('mainMaxY', () => createAnimation(void 0, SCALE_DURATION, $$.Easing.easeOutQuad));
            _atoms.r('mainMinY2', () => createAnimation(void 0, SCALE_DURATION, $$.Easing.easeOutQuad));
            _atoms.r('mainMaxY2', () => createAnimation(void 0, SCALE_DURATION, $$.Easing.easeOutQuad));
            _atoms.r('oldTextX_delta', () => 1);
            _atoms.r('oldTextX_alpha', () => createAnimation(0, TEXT_X_FADE_DURATION, $$.Easing.easeInQuad));
            _atoms.r('newTextX_delta', () => 1);
            _atoms.r('newTextX_alpha', () => createAnimation(0, TEXT_X_FADE_DURATION, $$.Easing.easeInQuad));
            _atoms.r('oldTextY_delta', () => 1);
            _atoms.r('oldTextY_alpha', () => createAnimation(0, SCALE_DURATION));
            _atoms.r('newTextY_delta', () => 1);
            _atoms.r('newTextY_alpha', () => createAnimation(0, SCALE_DURATION));
            _atoms.r('oldTextY2_delta', () => 1);
            _atoms.r('oldTextY2_alpha', () => createAnimation(0, SCALE_DURATION));
            _atoms.r('newTextY2_delta', () => 1);
            _atoms.r('newTextY2_alpha', () => createAnimation(0, SCALE_DURATION));
            _atoms.m('xTextAdjuster', [
                'mainRangeX',
                'intervalX',
                'textCountX',
            ], (v) => {
                const mainRangeX = v.get('mainRangeX');
                const intervalX = v.get('intervalX');
                const textCountX = v.get('textCountX');
                var delta = mainRangeX / intervalX / textCountX;
                var pow = 1;
                while (pow <= delta)
                    pow *= 2;
                const newTextX_delta = _atoms('newTextX_delta')();
                delta = pow;
                if (delta < newTextX_delta) {
                    _atoms('oldTextX_delta')(_atoms('newTextX_delta')());
                    play({ name: 'oldTextX_alpha', fromValue: 1, toValue: 1 });
                    _atoms('newTextX_delta')(delta);
                    play({ name: 'newTextX_alpha', toValue: 1, fromValue: 0 });
                }
                else if (delta > newTextX_delta) {
                    _atoms('oldTextX_delta')(newTextX_delta);
                    play({
                        name: 'oldTextX_alpha',
                        toValue: 0,
                        fromValue: _atoms('newTextX_alpha')().value,
                    });
                    _atoms('newTextX_delta')(delta);
                    play({ name: 'newTextX_alpha', toValue: 1, fromValue: 1 });
                }
                else {
                    _atoms('oldTextX_delta')(newTextX_delta);
                    play({ name: 'oldTextX_alpha', fromValue: 0, toValue: 0 });
                    play({ name: 'newTextX_alpha', toValue: 1, fromValue: 1 });
                }
                return true;
            }, { t: AtomType.force });
            _atoms.m('mainScaleX', ['width', 'paddingHor', 'mainRangeX', 'intervalX'], (v) => {
                const width = v.get('width');
                const paddingHor = v.get('paddingHor');
                const mainRangeX = v.get('mainRangeX');
                const intervalX = v.get('intervalX');
                const result = (chart_mode == 2 || chart_mode == 3) ?
                    (width - paddingHor * 2) * pixelRatio / (mainRangeX + intervalX)
                    : (width - paddingHor * 2) * pixelRatio / mainRangeX;
                return result;
            }, { d: true });
            _atoms.m('mainOffsetX', ['mainMinMaxX', 'paddingHor', 'mainScaleX', 'intervalX'], (v) => {
                const mainMinMaxX = v.get('mainMinMaxX');
                const paddingHor = v.get('paddingHor');
                const mainScaleX = v.get('mainScaleX');
                const intervalX = v.get('intervalX');
                let result;
                if (chart_mode == 2 || chart_mode == 3) {
                    result = -(mainMinMaxX.min - intervalX / 2) * mainScaleX + paddingHor * pixelRatio;
                }
                else {
                    result = -mainMinMaxX.min * mainScaleX + paddingHor * pixelRatio;
                }
                return result;
            });
            _atoms.m('mainMinMaxI', [
                'mainMinMaxX',
                'paddingHor',
                'mainScaleX',
                'intervalX',
                'previewMinMaxX',
                'xColumn',
            ], (v) => {
                const mainMinMaxX = v('mainMinMaxX');
                const previewMinMaxX = v('previewMinMaxX');
                const paddingHor = v('paddingHor');
                const mainScaleX = v('mainScaleX');
                const intervalX = v('intervalX');
                const xColumn = v('xColumn');
                const result = {
                    min: Math.max(1, Math.floor((mainMinMaxX.min - previewMinMaxX.min - paddingHor / mainScaleX) / intervalX)),
                    max: Math.min(xColumn.data.length, Math.ceil((mainMinMaxX.max - previewMinMaxX.min + paddingHor / mainScaleX) / intervalX) + 2)
                };
                function formatDate(time) {
                    var date = new Date(time);
                    var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                    var s = date.getDate() + ' ' + MONTH_NAMES[date.getMonth()] + ' ' + date.getFullYear();
                    return s;
                }
                return result;
            }, { d: true });
            _atoms.m('mainHeight', ['grid_height', 'previewMarginTop'], (v) => v(0) * pixelRatio - v(1));
            _atoms.m('mainMinMaxY', ['xColumn', 'columns', 'mainMinMaxI', 'previewMinMaxY'], (v) => {
                const xColumn = v.get('xColumn');
                const columns = v.get('columns');
                const mainMinMaxI = v.get('mainMinMaxI');
                const previewMinMaxY = v('previewMinMaxY');
                const alpha_grid = _atoms('alpha_grid')();
                const result = {
                    min: forceMinY !== undefined ? forceMinY : Number.MAX_VALUE,
                    max: Number.MIN_VALUE,
                };
                if (chart_mode == 2) {
                    let total_max = 0;
                    for (var i = mainMinMaxI.min; i < mainMinMaxI.max; i++) {
                        let total = 0;
                        for (var c = 0; c < columns.length; c++) {
                            if (alpha_grid[c].toValue == 1) {
                                total += columns[c].data[i];
                            }
                        }
                        if (total_max < total)
                            total_max = total;
                    }
                    const result = { min: 0, max: Math.round(total_max / previewMinMaxY.max * 100) };
                    play({ name: 'mainMinY', toValue: result.min });
                    play({ name: 'mainMaxY', toValue: result.max });
                    _atoms('mainRangeY')((result.max - result.min) || 0);
                    return result;
                }
                else if (chart_mode == 0) {
                    const result = {};
                    for (var c = 0; c < columns.length; c++) {
                        if (alpha_grid[c].toValue !== 0) {
                            var column = columns[c];
                            for (var i = mainMinMaxI.min; i < mainMinMaxI.max; i++) {
                                var y = column.data[i];
                                if (void 0 === result.min || result.min > y)
                                    result.min = y;
                                if (void 0 === result.max || result.max < y)
                                    result.max = y;
                            }
                        }
                    }
                    result.min = 0;
                    play({ name: 'mainMinY', toValue: result.min });
                    play({ name: 'mainMaxY', toValue: result.max });
                    _atoms('mainRangeY')((result.max - result.min) || 0);
                    return result;
                }
                else if (chart_mode == 1) {
                    const result = {};
                    c = 0;
                    if (alpha_grid[c].toValue !== 0) {
                        var column = columns[c];
                        for (var i = mainMinMaxI.min; i < mainMinMaxI.max; i++) {
                            var y = column.data[i];
                            if (void 0 === result.min || result.min > y)
                                result.min = y;
                            if (void 0 === result.max || result.max < y)
                                result.max = y;
                        }
                        play({ name: 'mainMinY', toValue: result.min });
                        play({ name: 'mainMaxY', toValue: result.max });
                    }
                    _atoms('mainRangeY')((result.max - result.min) || 0);
                    return result;
                }
                else if (chart_mode == 3) {
                    const result = { min: 0 };
                    c = 0;
                    if (alpha_grid[c].toValue !== 0) {
                        var column = columns[c];
                        for (var i = mainMinMaxI.min; i < mainMinMaxI.max; i++) {
                            var y = column.data[i];
                            if (void 0 === result.max || result.max < y)
                                result.max = y;
                        }
                        play({ name: 'mainMinY', toValue: result.min });
                        play({ name: 'mainMaxY', toValue: result.max });
                    }
                    _atoms('mainRangeY')((result.max) || 0);
                    return result;
                }
                else if (chart_mode == 4) {
                    const result = { min: 0, max: 100 };
                    play({ name: 'mainMinY', toValue: result.min });
                    play({ name: 'mainMaxY', toValue: result.max });
                    _atoms('mainRangeY')((result.max) || 0);
                    return result;
                }
                return result;
            });
            _atoms.w('mainRangeY', (val) => {
                let newTextY_delta = _atoms('newTextY_delta')();
                _atoms('oldTextY_delta')(newTextY_delta);
                play({
                    name: 'oldTextY_alpha',
                    fromValue: _atoms('newTextY_alpha')().value,
                    toValue: 0,
                });
                newTextY_delta = Math.floor(val / textCountY);
                _atoms('newTextY_delta')(newTextY_delta);
                play({
                    name: 'newTextY_alpha',
                    fromValue: 1 - _atoms('oldTextY_alpha')().value,
                    toValue: 1,
                });
            });
            _atoms.m('mainScaleY', ['mainMinY', 'mainMaxY', 'mainHeight'], (v) => {
                const mainMinY = v('mainMinY');
                const mainMaxY = v('mainMaxY');
                const mainHeight = v('mainHeight');
                let result;
                if (Number.isFinite(mainMinY.value) && Number.isFinite(mainMaxY.value))
                    result = -mainHeight / (mainMaxY.value - mainMinY.value);
                return result;
            }, { d: true });
            _atoms.m('mainOffsetY', ['mainHeight', 'mainMinY', 'mainScaleY'], (v) => {
                const mainMinY = v('mainMinY');
                const mainHeight = v('mainHeight');
                const mainScaleY = v('mainScaleY');
                let result;
                if (Number.isFinite(mainMinY.value))
                    result = mainHeight - mainMinY.value * mainScaleY;
                return result;
            }, { d: true });
            _atoms.m('mainMinMaxY2', ['columns', 'mainMinMaxI'], (v) => {
                const columns = v.get('columns');
                const mainMinMaxI = v.get('mainMinMaxI');
                const alpha_grid = _atoms('alpha_grid')();
                const result = {};
                if (chart_mode == 1) {
                    let c = 1;
                    if (alpha_grid[c].toValue !== 0) {
                        var column = columns[c];
                        for (var i = mainMinMaxI.min; i < mainMinMaxI.max; i++) {
                            var y = column.data[i];
                            if (void 0 === result.min || result.min > y)
                                result.min = y;
                            if (void 0 === result.max || result.max < y)
                                result.max = y;
                        }
                        play({ name: 'mainMinY2', toValue: result.min });
                        play({ name: 'mainMaxY2', toValue: result.max });
                    }
                    _atoms('mainRangeY2')((result.max - result.min) || 0);
                }
                return result;
            });
            _atoms.w('mainRangeY2', (val) => {
                let newTextY_delta = _atoms('newTextY2_delta')();
                _atoms('oldTextY2_delta')(newTextY_delta);
                play({
                    name: 'oldTextY2_alpha',
                    fromValue: _atoms('newTextY2_alpha')().value,
                    toValue: 0,
                });
                newTextY_delta = Math.floor(val / textCountY);
                _atoms('newTextY2_delta')(newTextY_delta);
                play({
                    name: 'newTextY2_alpha',
                    fromValue: 1 - _atoms('oldTextY2_alpha')().value,
                    toValue: 1,
                });
            });
            _atoms.m('mainScaleY2', ['mainMinY2', 'mainMaxY2', 'mainHeight'], (v) => {
                const mainMinY = v('mainMinY2');
                const mainMaxY = v('mainMaxY2');
                const mainHeight = v('mainHeight');
                const result = Number.isFinite(mainMinY.value) && Number.isFinite(mainMaxY.value) ?
                    -mainHeight / (mainMaxY.value - mainMinY.value) :
                    1;
                return result;
            });
            _atoms.m('mainOffsetY2', ['mainHeight', 'mainMinY2', 'mainScaleY2'], (v) => {
                const mainMinY = v('mainMinY2');
                const mainHeight = v('mainHeight');
                const mainScaleY = v('mainScaleY2');
                const result = Number.isFinite(mainMinY.value) ?
                    mainHeight - mainMinY.value * mainScaleY :
                    0;
                return result;
            });
            function getCleanContext(name_prefix, v, ctx_atom_state) {
                const ctx = v(name_prefix + '_context');
                if (ctx_atom_state == AtomState.valid) {
                    ctx.clearRect(0, 0, v(name_prefix + '_width'), v(name_prefix + '_height'));
                }
                return ctx;
            }
            let grid_renderer_raf;
            let grid_renderer_invalid_masters;
            _atoms.def('grid_renderer', {
                masters: [
                    'xColumn',
                    'columns',
                    'grid_canvas_context',
                    'grid_canvas_width',
                    'grid_canvas_height',
                    'mainHeight',
                    'paddingHor',
                    'width',
                    'scroll_width',
                    'mainMinMaxI',
                    'mainMinMaxX',
                    'mainScaleX',
                    'mainOffsetX',
                    'intervalX',
                    'alpha_grid',
                    'oldTextX_delta',
                    'oldTextX_alpha',
                    'newTextX_delta',
                    'newTextX_alpha',
                    'oldTextY_delta',
                    'oldTextY_alpha',
                    'newTextY_delta',
                    'newTextY_alpha',
                    'oldTextY2_delta',
                    'oldTextY2_alpha',
                    'newTextY2_delta',
                    'newTextY2_alpha',
                    'mainMinMaxY',
                    'mainOffsetY',
                    'mainScaleY',
                    'previewMinMaxY',
                    'theme',
                    'textXWidth',
                    'mainMinMaxY2',
                    'mainOffsetY2',
                    'mainScaleY2',
                    'previewMaxY',
                ],
                value(p, val) {
                    val = void 0;
                    const ctx_atom_state = p.atoms().grid_canvas_context.state();
                    const v = p.values();
                    const invalid_atoms = Object.keys(p.atoms()).filter(name => p.atoms()[name].state() == AtomState.invalid);
                    if (!v) {
                        const atoms = p.atoms();
                        if (grid_renderer_raf === void 0)
                            grid_renderer_raf = setTimeout(() => {
                                grid_renderer_raf = void 0;
                                let grid_renderer_invalid_masters;
                                try {
                                    grid_renderer_invalid_masters = Object.keys(atoms).filter(key => !atoms[key].is_valid_value(atoms[key].value()));
                                }
                                catch (err) {
                                    console.error(err);
                                }
                                console.warn('grid_renderer', grid_renderer_invalid_masters);
                            }, 100);
                    }
                    if (v) {
                        clearTimeout(grid_renderer_raf);
                        const xColumn = v('xColumn');
                        const columns = v('columns');
                        const paddingHor = v('paddingHor');
                        const width = v('width');
                        const mainHeight = v('mainHeight');
                        const grid_canvas_context = getCleanContext('grid_canvas', v, ctx_atom_state);
                        const scroll_width = v('scroll_width');
                        const mainMinMaxI = v('mainMinMaxI');
                        const mainScaleX = v('mainScaleX');
                        const mainOffsetX = v('mainOffsetX');
                        const intervalX = v('intervalX');
                        const mainMinMaxX = v('mainMinMaxX');
                        const mainMinMaxY = v('mainMinMaxY');
                        const mainOffsetY = v('mainOffsetY');
                        const mainScaleY = v('mainScaleY');
                        const alpha_grid = v('alpha_grid');
                        const oldTextX_alpha = v('oldTextX_alpha').value;
                        const oldTextX_delta = v('oldTextX_delta');
                        const newTextX_alpha = v('newTextX_alpha').value;
                        const newTextX_delta = v('newTextX_delta');
                        const oldTextY_alpha = v('oldTextY_alpha').value;
                        const oldTextY_delta = v('oldTextY_delta');
                        const newTextY_alpha = v('newTextY_alpha').value;
                        const newTextY_delta = v('newTextY_delta');
                        const previewMinMaxY = v('previewMinMaxY');
                        const textXWidth = v('textXWidth');
                        if (chart_mode == 0) {
                            const minMaxI = mainMinMaxI;
                            const lineWidth = mainLineWidth;
                            const scaleX = mainScaleX;
                            const offsetX = mainOffsetX;
                            const scaleY = mainScaleY;
                            const offsetY = mainOffsetY;
                            const ys = [];
                            const x = [];
                            const alphas = [];
                            const colors = [];
                            const canvas = grid_canvas_context;
                            const minI = minMaxI.min;
                            const maxI = minMaxI.max;
                            canvas.lineJoin = 'bevel';
                            canvas.lineCap = 'butt';
                            canvas.lineWidth = lineWidth;
                            var step = Math.floor((maxI - minI) / scroll_width);
                            if (step < 1)
                                step = 1;
                            for (let i = minI; i < maxI; i += step) {
                                x.push(Math.round(xColumn.data[i] * scaleX + offsetX));
                            }
                            for (var c = 0; c < columns.length; c++) {
                                var yColumn = columns[c];
                                if (alpha_grid[c].value === 0)
                                    continue;
                                alphas.push(alpha_grid[c].value);
                                colors.push(yColumn.color);
                                const y = [];
                                for (var i = minI; i < maxI; i += step)
                                    y.push(Math.round(yColumn.data[i] * scaleY + offsetY));
                                ys.push(y);
                            }
                            if (ys.length === 3) {
                                canvas.fillStyle = '#F2CECC';
                                let was_red;
                                let u = [];
                                let d = [];
                                for (let i = 0; i < x.length; i++) {
                                    const y_min = Math.min(...ys.map(y => y[i]));
                                    const is_red = ys[0][i] > y_min;
                                    if (is_red) {
                                        if (i == 0) {
                                            u.push({ x: x[i], y: Math.min(...ys.map(y => y[i])) });
                                            d.push({ x: x[i], y: ys[0][i] });
                                        }
                                        else if (was_red) {
                                            const ip = intersection(x[i - 1], x[i], ys[1][i - 1], ys[1][i], ys[2][i - 1], ys[2][i]);
                                            if (ip)
                                                u.push(ip);
                                            u.push({ x: x[i], y: y_min });
                                            d.push({ x: x[i], y: ys[0][i] });
                                        }
                                        else {
                                            const ip1 = intersection(x[i - 1], x[i], ys[0][i - 1], ys[0][i], ys[1][i - 1], ys[1][i]);
                                            const ip2 = intersection(x[i - 1], x[i], ys[0][i - 1], ys[0][i], ys[2][i - 1], ys[2][i]);
                                            if (ip1 && ip2) {
                                                if (ip1.x < ip2.x) {
                                                    console.error({ i });
                                                }
                                                else if (ip1.x > ip2.x) {
                                                    u.push(ip2);
                                                    u.push({ x: x[i], y: y_min });
                                                    d.push({ x: x[i], y: ys[0][i] });
                                                }
                                                else {
                                                    console.error({ i });
                                                }
                                            }
                                            else if (ip1) {
                                                u.push(ip1);
                                                u.push({ x: x[i], y: y_min });
                                                d.push(ip1);
                                                d.push({ x: x[i], y: ys[0][i] });
                                            }
                                            else if (ip2) {
                                                console.error({ i });
                                            }
                                            else {
                                                console.error({ i });
                                            }
                                        }
                                    }
                                    else if (was_red) {
                                        const ip1 = intersection(x[i - 1], x[i], ys[0][i - 1], ys[0][i], ys[1][i - 1], ys[1][i]);
                                        const ip2 = intersection(x[i - 1], x[i], ys[0][i - 1], ys[0][i], ys[2][i - 1], ys[2][i]);
                                        if (ip1 && ip2) {
                                            if (ip1.x < ip2.x) {
                                                u.push(ip2);
                                                d.push(ip2);
                                                fillRegion(u, d);
                                                u = [];
                                                d = [];
                                            }
                                            else if (ip1.x > ip2.x) {
                                                console.error({ i });
                                            }
                                            else {
                                                console.error({ i });
                                            }
                                        }
                                        else if (ip1) {
                                            u.push(ip1);
                                            d.push(ip1);
                                            fillRegion(u, d);
                                            u = [];
                                            d = [];
                                        }
                                        else if (ip2) {
                                            console.error({ i });
                                        }
                                        else {
                                            console.error({ i });
                                        }
                                    }
                                    was_red = is_red;
                                }
                                if (u.length && d.length)
                                    fillRegion(u, d);
                            }
                            function fillRegion(u, d) {
                                canvas.beginPath();
                                canvas.moveTo(u[u.length - 1].x, u[u.length - 1].y);
                                for (let i = u.length - 2; i >= 0; i--)
                                    canvas.lineTo(u[i].x, u[i].y);
                                for (let i = 0; i < d.length; i++)
                                    canvas.lineTo(d[i].x, d[i].y);
                                canvas.closePath();
                                canvas.fill();
                            }
                            function intersection(xa, xb, y1a, y1b, y2a, y2b) {
                                const delta1 = y1b - y1a;
                                const delta2 = y2b - y2a;
                                if (delta1 == delta2)
                                    return null;
                                const lambda = (y2a - y1a) / (delta1 - delta2);
                                if (lambda < 0 || lambda > 1)
                                    return null;
                                const x = lambda * xb + (1 - lambda) * xa;
                                const y = lambda * y1b + (1 - lambda) * y1a;
                                return { x, y };
                            }
                            for (let c = 0; c < ys.length; c++) {
                                const y = ys[c];
                                canvas.globalAlpha = alphas[c];
                                canvas.strokeStyle = colors[c];
                                canvas.beginPath();
                                canvas.moveTo(x[0], y[0]);
                                for (let i = 0; i < x.length; i++) {
                                    canvas.lineTo(x[i], y[i]);
                                }
                                canvas.stroke();
                            }
                        }
                        else if (chart_mode == 1) {
                            let c = 0;
                            if (alpha_grid[c].value !== 0) {
                                const minMaxI = mainMinMaxI;
                                const lineWidth = mainLineWidth;
                                const scaleX = mainScaleX;
                                const offsetX = mainOffsetX;
                                const scaleY = mainScaleY;
                                const offsetY = mainOffsetY;
                                var yColumn = columns[c];
                                grid_canvas_context.globalAlpha = alpha_grid[c].value;
                                grid_canvas_context.lineWidth = mainLineWidth;
                                grid_canvas_context.strokeStyle = yColumn.color;
                                renderPath(grid_canvas_context, scroll_width, xColumn, yColumn, mainMinMaxI.min, mainMinMaxI.max, mainScaleX, mainScaleY, mainOffsetX, mainOffsetY);
                            }
                            c = 1;
                            if (alpha_grid[c].value !== 0) {
                                const mainMinMaxY = v('mainMinMaxY2');
                                const mainOffsetY = v('mainOffsetY2');
                                const mainScaleY = v('mainScaleY2');
                                var yColumn = columns[c];
                                grid_canvas_context.globalAlpha = alpha_grid[c].value;
                                grid_canvas_context.lineWidth = mainLineWidth;
                                grid_canvas_context.strokeStyle = yColumn.color;
                                renderPath(grid_canvas_context, scroll_width, xColumn, yColumn, mainMinMaxI.min, mainMinMaxI.max, mainScaleX, mainScaleY, mainOffsetX, mainOffsetY);
                            }
                        }
                        else if (chart_mode == 2) {
                            const ctx = grid_canvas_context;
                            const i_min = mainMinMaxI.min;
                            const i_max = mainMinMaxI.max;
                            const scaleY = mainScaleY;
                            const previewMaxY = v('previewMaxY');
                            const offsetY = mainOffsetY;
                            const scaleX = mainScaleX;
                            const offsetX = mainOffsetX;
                            const minMaxY = mainMinMaxY;
                            const drawAreaHeight = mainHeight;
                            grid_canvas_context.globalAlpha = 1;
                            const width = intervalX * scaleX + 1;
                            let count = 0;
                            for (let i = Math.max(1, i_min - 10); i < Math.min(i_max + 1, xColumn.data[i]); i++) {
                                const x = Math.round((xColumn.data[i] - intervalX / 2) * scaleX + offsetX);
                                let total = 0;
                                for (var c = 0; c < columns.length; c++) {
                                    const h = 100 * columns[c].data[i] * alpha_grid[c].value / previewMaxY.value;
                                    const height = Math.round(-h * scaleY);
                                    const y = Math.round(drawAreaHeight - height + total * scaleY);
                                    ctx.fillStyle = columns[c].color;
                                    ctx.fillRect(x, y, width, height);
                                    total += h;
                                }
                            }
                        }
                        else if (chart_mode == 3) {
                            const ctx = grid_canvas_context;
                            const i_min = mainMinMaxI.min;
                            const i_max = mainMinMaxI.max;
                            const scaleY = mainScaleY;
                            const offsetY = mainOffsetY;
                            const scaleX = mainScaleX;
                            const offsetX = mainOffsetX;
                            const minMaxY = mainMinMaxY;
                            const drawAreaHeight = mainHeight;
                            grid_canvas_context.globalAlpha = 1;
                            const width = intervalX * scaleX + 3;
                            let count = 0;
                            for (let i = Math.max(1, i_min - 10); i < Math.min(i_max + 1, xColumn.data[i]); i++) {
                                const x = Math.round((xColumn.data[i] - intervalX / 2) * scaleX + offsetX);
                                let total = 0;
                                for (var c = 0; c < columns.length; c++) {
                                    const h = columns[c].data[i] * alpha_grid[c].value;
                                    const height = Math.round(-h * scaleY);
                                    const y = Math.round(drawAreaHeight - height + total * scaleY);
                                    ctx.fillStyle = columns[c].color;
                                    ctx.fillRect(x, y, width, height);
                                    total += h;
                                }
                            }
                        }
                        else if (chart_mode == 4) {
                            drawChart4(alpha_grid, xColumn, columns, intervalX, mainScaleX, mainOffsetX, mainMinMaxI.min, mainMinMaxI.max, mainScaleY, mainOffsetY, mainHeight, v('grid_canvas_width'), grid_canvas_context);
                        }
                        const theme = v('theme');
                        grid_canvas_context.strokeStyle = xLineStyle[theme][chart_mode].color;
                        grid_canvas_context.lineWidth = lineWidth;
                        grid_canvas_context.globalAlpha = 1 * xLineStyle[theme][chart_mode].opacity;
                        grid_canvas_context.beginPath();
                        grid_canvas_context.moveTo(paddingHor * pixelRatio, mainHeight);
                        grid_canvas_context.lineTo((width - paddingHor) * pixelRatio, mainHeight);
                        grid_canvas_context.stroke();
                        function renderLinesY(alpha, delta, minMaxY, offsetY, scaleY) {
                            if (alpha > 0) {
                                grid_canvas_context.globalAlpha = alpha * xLineStyle[theme][chart_mode].opacity;
                                for (var i = 1; i < textCountY; i++) {
                                    var value = minMaxY.min + delta * i;
                                    var y = mainToScreenY(value, scaleY, offsetY);
                                    grid_canvas_context.beginPath();
                                    grid_canvas_context.moveTo(paddingHor * pixelRatio, y);
                                    grid_canvas_context.lineTo((width - paddingHor) * pixelRatio, y);
                                    grid_canvas_context.stroke();
                                }
                            }
                        }
                        renderLinesY(oldTextY_alpha, oldTextY_delta, mainMinMaxY, mainOffsetY, mainScaleY);
                        renderLinesY(newTextY_alpha, newTextY_delta, mainMinMaxY, mainOffsetY, mainScaleY);
                        if (chart_mode == 1) {
                            const oldTextY_alpha = v('oldTextY2_alpha').value;
                            const oldTextY_delta = v('oldTextY2_delta');
                            const newTextY_alpha = v('newTextY2_alpha').value;
                            const newTextY_delta = v('newTextY2_delta');
                            const mainMinMaxY = v('mainMinMaxY2');
                            const mainOffsetY = v('mainOffsetY2');
                            const mainScaleY = v('mainScaleY2');
                            renderLinesY(oldTextY_alpha, oldTextY_delta, mainMinMaxY, mainOffsetY, mainScaleY);
                            renderLinesY(newTextY_alpha, newTextY_delta, mainMinMaxY, mainOffsetY, mainScaleY);
                        }
                        function mainToScreenX(x) {
                            return x * mainScaleX + mainOffsetX;
                        }
                        function mainToScreenY(y, scaleY, offsetY) {
                            return y * scaleY + offsetY;
                        }
                        function renderTextsX(alpha, delta, skipStep) {
                            if (alpha > 0) {
                                grid_canvas_context.globalAlpha = alpha * xTextStyle[theme][chart_mode].opacity;
                                if (skipStep)
                                    delta *= 2;
                                var endI = Math.min(Math.ceil((mainMinMaxX.max + 1) / intervalX / delta) * delta, xColumn.data.length);
                                if (skipStep)
                                    endI -= delta;
                                var startI = Math.max(mainMinMaxI.min - 1, 1);
                                function formatTextX(i) {
                                    return ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'][i];
                                }
                                for (var i = endI; i >= startI; i -= delta) {
                                    var value = xColumn.data[i];
                                    var x = mainToScreenX(value);
                                    const text = formatTextX(value);
                                    const w = grid_canvas_context.measureText(text).width;
                                    var offsetX = -w / 2;
                                    if (i === xColumn.data.length - 1) {
                                        offsetX = -w;
                                    }
                                    else if (i == 1) {
                                        offsetX = 0;
                                    }
                                    grid_canvas_context.fillText(text, x + offsetX, mainHeight + textXMargin);
                                }
                            }
                        }
                        const xTextStyle = {
                            'day': {
                                0: { color: '#525356', opacity: 1 },
                                1: { color: '#8E8E93', opacity: 1 },
                                2: { color: '#8E8E93', opacity: 1 },
                                3: { color: '#252529', opacity: .5 },
                                4: { color: '#252529', opacity: .5 },
                            },
                            'night': {
                                0: { color: '#A3B1C2', opacity: .6 },
                                1: { color: '#A3B1C2', opacity: .6 },
                                2: { color: '#A3B1C2', opacity: .6 },
                                3: { color: '#A3B1C2', opacity: .6 },
                                4: { color: '#A3B1C2', opacity: .6 },
                            },
                        };
                        grid_canvas_context.fillStyle = xTextStyle[theme][chart_mode].color;
                        grid_canvas_context.font = font;
                        var skipStepNew = oldTextX_delta > newTextX_delta;
                        renderTextsX(oldTextX_alpha, oldTextX_delta, !skipStepNew);
                        renderTextsX(newTextX_alpha, newTextX_delta, false);
                        function formatNumber(n, short = false) {
                            var abs = Math.abs(n);
                            if (abs > 1000000000 && short)
                                return (n / 1000000000).toFixed(2) + 'B';
                            if (abs > 1000000 && short)
                                return (n / 1000000).toFixed(2) + 'M';
                            if (abs > 1000 && short)
                                return (n / 1000).toFixed(1) + 'K';
                            if (abs > 1) {
                                var s = abs.toFixed(0);
                                var formatted = n < 0 ? '-' : '';
                                for (var i = 0; i < s.length; i++) {
                                    formatted += s.charAt(i);
                                    if ((s.length - 1 - i) % 3 === 0)
                                        formatted += ' ';
                                }
                                return formatted;
                            }
                            return n.toString();
                        }
                        function renderTextsY(alpha, delta, offsetY, scaleY, minMaxY, left) {
                            if (alpha > 0) {
                                grid_canvas_context.globalAlpha = alpha * (chart_mode == 1 ? 1 : yTextStyle[theme][chart_mode].opacity);
                                for (var i = 1; i < textCountY; i++) {
                                    var value = minMaxY.min + delta * i;
                                    var y = mainToScreenY(value, scaleY, offsetY);
                                    grid_canvas_context.fillText(formatNumber(value, true), left ? paddingHor * pixelRatio : (width - paddingHor - 30) * pixelRatio, y + textYMargin);
                                }
                            }
                        }
                        const yTextStyle = {
                            'day': {
                                0: { color: '#8E8E93', opacity: 1 },
                                1: { color: '#8E8E93', opacity: 1 },
                                2: { color: '#8E8E93', opacity: 1 },
                                3: { color: '#252529', opacity: .5 },
                                4: { color: '#252529', opacity: .5 },
                            },
                            'night': {
                                0: { color: '#A3B1C2', opacity: .6 },
                                1: { color: '#A3B1C2', opacity: .6 },
                                2: { color: '#A3B1C2', opacity: .6 },
                                3: { color: '#ECF2F8', opacity: .5 },
                                4: { color: '#ECF2F8', opacity: .5 },
                            },
                        };
                        grid_canvas_context.fillStyle = yTextStyle[theme][chart_mode].color;
                        if (chart_mode == 1)
                            grid_canvas_context.fillStyle = columns[0].color;
                        renderTextsY(oldTextY_alpha, oldTextY_delta, mainOffsetY, mainScaleY, mainMinMaxY, true);
                        renderTextsY(newTextY_alpha, newTextY_delta, mainOffsetY, mainScaleY, mainMinMaxY, true);
                        if (Number.isFinite(mainMinMaxY.min)) {
                            grid_canvas_context.globalAlpha = (chart_mode !== 1 ? 1 * yTextStyle[theme][chart_mode].opacity : alpha_grid[0].value);
                            grid_canvas_context.fillText(formatNumber(mainMinMaxY.min), paddingHor * pixelRatio, mainHeight + textYMargin);
                        }
                        if (chart_mode == 1) {
                            const oldTextY_alpha = v('oldTextY2_alpha').value;
                            const oldTextY_delta = v('oldTextY2_delta');
                            const newTextY_alpha = v('newTextY2_alpha').value;
                            const newTextY_delta = v('newTextY2_delta');
                            const mainOffsetY = v('mainOffsetY2');
                            const mainScaleY = v('mainScaleY2');
                            const mainMinMaxY = v('mainMinMaxY2');
                            grid_canvas_context.fillStyle = columns[1].color;
                            renderTextsY(oldTextY_alpha, oldTextY_delta, mainOffsetY, mainScaleY, mainMinMaxY, false);
                            renderTextsY(newTextY_alpha, newTextY_delta, mainOffsetY, mainScaleY, mainMinMaxY, false);
                            const mainMinMaxY2 = _atoms('mainMinMaxY2')();
                            if (Number.isFinite(mainMinMaxY2.min)) {
                                grid_canvas_context.globalAlpha = alpha_grid[1].value;
                                grid_canvas_context.fillText(formatNumber(mainMinMaxY2.min), (width - paddingHor - 30) * pixelRatio, mainHeight + textYMargin);
                            }
                        }
                    }
                    return val;
                },
            }, AtomType.force);
            function drawChart4(alpha_grid, xColumn, columns, intervalX, scaleX, offsetX, i_min, i_max, scaleY, offsetY, drawAreaHeight, canvas_width, ctx) {
                grid_canvas_context.globalAlpha = 1;
                const width = intervalX * scaleX + 1;
                let count = 0;
                const points = [];
                for (var c = 0; c < columns.length; c++) {
                    points.push([]);
                }
                for (let i = Math.max(1, i_min - 10), count = Math.min(i_max + 10, xColumn.data.length - 1); i < count; i++) {
                    const x = Math.round(xColumn.data[i] * scaleX + offsetX);
                    let total = 0;
                    for (var c = 0; c < columns.length; c++) {
                        const h = columns[c].data[i] * alpha_grid[c].value;
                        total += h;
                    }
                    const specific = [];
                    for (var c = 0; c < columns.length; c++) {
                        const h = columns[c].data[i] * alpha_grid[c].value;
                        specific.push(h / total * 100);
                    }
                    total = 0;
                    for (var c = 0; c < columns.length; c++) {
                        const h = specific[c];
                        const height = -h * scaleY;
                        const y = Math.round(drawAreaHeight - height + total * scaleY);
                        points[c].push({ x, y });
                        total += h;
                    }
                }
                for (let c = points.length - 1; c >= 0; c--) {
                    if (c == 0) {
                        ctx.beginPath();
                        ctx.moveTo(points[c][points[c].length - 1].x, drawAreaHeight);
                        ctx.lineTo(points[c][0].x, drawAreaHeight);
                        for (let i = 0, count = points[c].length; i < count; i++) {
                            const point = points[c][i];
                            ctx.lineTo(point.x, point.y);
                        }
                    }
                    else if (c < points.length - 1) {
                        ctx.beginPath();
                        const sub_line = points[c - 1];
                        const line = points[c];
                        const x = line[line.length - 1].x;
                        const y = sub_line[sub_line.length - 1].y;
                        ctx.moveTo(x, y);
                        for (let i = sub_line.length - 2; i >= 0; i--) {
                            const point = sub_line[i];
                            ctx.lineTo(point.x, point.y);
                        }
                        for (let i = 0; i < line.length; i++) {
                            const point = line[i];
                            ctx.lineTo(point.x, point.y);
                        }
                    }
                    else {
                        ctx.beginPath();
                        const sub_line = points[c - 1];
                        const x = sub_line[sub_line.length - 1].x;
                        const y = sub_line[sub_line.length - 1].y;
                        ctx.moveTo(x, y);
                        for (let i = sub_line.length - 2; i >= 0; i--) {
                            const point = sub_line[i];
                            ctx.lineTo(point.x, point.y);
                        }
                        ctx.lineTo(sub_line[0].x, 0);
                        ctx.lineTo(sub_line[sub_line.length - 1].x, 0);
                    }
                    ctx.closePath();
                    ctx.fillStyle = columns[c].color;
                    ctx.fill();
                }
            }
            let scroll_renderer_raf;
            let scroll_renderer_invalid_masters;
            _atoms.def('scroll_renderer', {
                masters: [
                    'xColumn',
                    'intervalX',
                    'columns',
                    'scroll_height',
                    'scroll_width',
                    'scroll_canvas_context',
                    'scroll_canvas_width',
                    'scroll_canvas_height',
                    'previewOffsetX',
                    'previewScaleX',
                    'alpha_scroll',
                    'alpha_grid',
                    'previewMinMaxY',
                    'previewOffsetY',
                    'previewScaleY',
                    'previewMinMaxY2',
                    'previewOffsetY2',
                    'previewScaleY2',
                ],
                value(p, val) {
                    val = void 0;
                    const ctx_atom_state = p.atoms().scroll_canvas_context.state();
                    const v = p.values();
                    if (v) {
                        clearTimeout(scroll_renderer_raf);
                        const xColumn = v('xColumn');
                        const intervalX = v('intervalX');
                        const columns = v('columns');
                        const scroll_height = v('scroll_height');
                        const grid_canvas_context = getCleanContext('scroll_canvas', v, ctx_atom_state);
                        const previewOffsetX = v('previewOffsetX');
                        const previewScaleX = v('previewScaleX');
                        const scroll_width = v('scroll_width');
                        const alpha_scroll = v('alpha_scroll');
                        const alpha_grid = v('alpha_grid');
                        const previewScaleY = v('previewScaleY');
                        const previewOffsetY = v('previewOffsetY');
                        const previewMinMaxY = v('previewMinMaxY');
                        if (chart_mode == 0) {
                            const minMaxI = { min: 1, max: xColumn.data.length };
                            const lineWidth = previewLineWidth;
                            const scaleX = previewScaleX;
                            const offsetX = previewOffsetX;
                            const scaleY = previewScaleY;
                            const offsetY = previewOffsetY;
                            for (var c = 0; c < columns.length; c++) {
                                var yColumn = columns[c];
                                if (alpha_grid[c].value === 0)
                                    continue;
                                grid_canvas_context.globalAlpha = alpha_grid[c].value;
                                grid_canvas_context.lineWidth = lineWidth;
                                grid_canvas_context.strokeStyle = yColumn.color;
                                renderPath(grid_canvas_context, scroll_width, xColumn, yColumn, minMaxI.min, minMaxI.max, scaleX, scaleY, offsetX, offsetY);
                            }
                        }
                        else if (chart_mode === 1) {
                            const minMaxI = { min: 1, max: xColumn.data.length };
                            const lineWidth = previewLineWidth;
                            const scaleX = previewScaleX;
                            const offsetX = previewOffsetX;
                            c = 0;
                            if (alpha_grid[c].value !== 0) {
                                var yColumn = columns[c];
                                const scaleX = previewScaleX;
                                const offsetX = previewOffsetX;
                                const scaleY = previewScaleY;
                                const offsetY = previewOffsetY;
                                grid_canvas_context.globalAlpha = alpha_grid[c].value;
                                grid_canvas_context.lineWidth = lineWidth;
                                grid_canvas_context.strokeStyle = yColumn.color;
                                renderPath(grid_canvas_context, scroll_width, xColumn, yColumn, minMaxI.min, minMaxI.max, scaleX, scaleY, offsetX, offsetY);
                            }
                            c = 1;
                            if (alpha_grid[c].value !== 0) {
                                var yColumn = columns[c];
                                const scaleY = v('previewScaleY2');
                                const offsetY = v('previewOffsetY2');
                                grid_canvas_context.globalAlpha = alpha_grid[c].value;
                                grid_canvas_context.lineWidth = lineWidth;
                                grid_canvas_context.strokeStyle = yColumn.color;
                                renderPath(grid_canvas_context, scroll_width, xColumn, yColumn, minMaxI.min, minMaxI.max, scaleX, scaleY, offsetX, offsetY);
                            }
                        }
                        else if (chart_mode == 2 || chart_mode == 3) {
                            const ctx = scroll_canvas_context;
                            const i_min = 1;
                            const i_max = xColumn.data.length;
                            const scaleY = previewScaleY;
                            const offsetY = previewOffsetY;
                            const scaleX = previewScaleX;
                            const offsetX = previewOffsetX;
                            const minMaxY = previewMinMaxY;
                            const drawAreaHeight = scroll_height * pixelRatio;
                            const width = intervalX * scaleX + 1;
                            let count = 0;
                            for (let i = i_min; i < i_max; i++) {
                                const x = Math.round(xColumn.data[i] * scaleX + offsetX);
                                let total = 0;
                                for (var c = 0; c < columns.length; c++) {
                                    const h = columns[c].data[i] * alpha_grid[c].value;
                                    const height = Math.round(-h * scaleY);
                                    const y = drawAreaHeight - height + total * scaleY;
                                    ctx.fillStyle = columns[c].color;
                                    ctx.fillRect(x, y, width, height);
                                    total += h;
                                }
                            }
                        }
                        else if (chart_mode === 4) {
                            drawChart4(alpha_grid, xColumn, columns, intervalX, previewScaleX, previewOffsetX, 1, xColumn.data.length, previewScaleY, previewOffsetY, scroll_height * pixelRatio, scroll_width * pixelRatio, scroll_canvas_context);
                        }
                        val = true;
                    }
                    return val;
                },
            }, AtomType.force);
            function renderPath(canvas, scroll_width, xColumn, yColumn, minI, maxI, scaleX, scaleY, offsetX, offsetY) {
                canvas.beginPath();
                canvas.lineJoin = 'bevel';
                canvas.lineCap = 'butt';
                {
                    const x = Math.round(xColumn.data[minI] * scaleX + offsetX);
                    const y = Math.round(yColumn.data[minI] * scaleY + offsetY);
                    canvas.moveTo(x, y);
                }
                var step = Math.floor((maxI - minI) / scroll_width);
                if (step < 1)
                    step = 1;
                for (var i = minI + 1; i < maxI; i += step) {
                    const x = Math.round(xColumn.data[i] * scaleX + offsetX);
                    const y = Math.round(yColumn.data[i] * scaleY + offsetY);
                    canvas.lineTo(x, y);
                }
                canvas.stroke();
            }
            function props(val) {
                const names = Object.keys(val);
                for (let i = 0, count = names.length; i < count; i++) {
                    const name = names[i];
                    _atoms(name)(val[name]);
                }
                _scroll_mid_width_min = void 0;
            }
            let scrollParams;
            function scrollMouseDownEventListener(event) {
                let isTouchEvent = !!event.touches;
                let precisionVert = isTouchEvent ? touchPrecision : 0;
                let precisionHor = isTouchEvent ? touchPrecision : 0;
                const clientX = isTouchEvent ? event.touches[0].clientX : event.clientX;
                const clientY = isTouchEvent ? event.touches[0].clientY : event.clientY;
                const clientRect = scroll_mid_elem.dom_node().getBoundingClientRect();
                if (clientRect.top - precisionVert <= clientY && clientY <= clientRect.bottom + precisionVert) {
                    let action = 0;
                    if (clientX - precisionHor - scroll_selector_width <= clientRect.left && clientRect.left <= clientX + precisionHor) {
                        action = 1;
                    }
                    else if (clientX - precisionHor <= clientRect.right && clientRect.right <= clientX + precisionHor + scroll_selector_width) {
                        action = 2;
                    }
                    else if (clientRect.left + precisionHor <= clientX && clientX <= clientRect.right) {
                        action = 3;
                        if (!isTouchEvent)
                            setBodyCursor({ origin: self, cursor: 'grabbing' });
                    }
                    if (action != 0)
                        scrollParams = Object.assign({ action, clientX }, _atoms('scroll_mid')());
                }
            }
            let lastMoveClientX;
            let lastMoveClientY;
            function scrollMouseMoveEventListener(event) {
                const isTouchEvent = !!event.touches;
                const clientX = isTouchEvent ? event.touches[0].clientX : event.clientX;
                const clientY = isTouchEvent ? event.touches[0].clientY : event.clientY;
                let skipProcessing = false;
                if (isTouchEvent && lastMoveClientX !== void 0) {
                    const deltaX = Math.round(Math.abs(clientX - lastMoveClientX));
                    const deltaY = Math.round(Math.abs(clientY - lastMoveClientY));
                    if (deltaY && deltaX / deltaY < 2)
                        skipProcessing = true;
                }
                lastMoveClientX = clientX;
                lastMoveClientY = clientY;
                if (scrollParams) {
                    let width = scrollParams.width, left = scrollParams.left;
                    let delta = clientX - scrollParams.clientX;
                    if (scrollParams.action == 3) {
                        left = scrollParams.left + delta;
                    }
                    else if (scrollParams.action == 2) {
                        if (scrollParams.width + delta < scroll_mid_width_min()) {
                            delta = scroll_mid_width_min() - scrollParams.width;
                        }
                        else if (scrollParams.left + scrollParams.width + delta > scrollParams.total) {
                            delta = scrollParams.total - (scrollParams.left + scrollParams.width);
                        }
                        width = scrollParams.width + delta;
                    }
                    else if (scrollParams.action == 1) {
                        let delta = clientX - scrollParams.clientX;
                        if (scrollParams.width - delta < scroll_mid_width_min()) {
                            delta = scrollParams.width - scroll_mid_width_min();
                        }
                        else if (scrollParams.left + delta < 0) {
                            delta = -scrollParams.left;
                        }
                        width = scrollParams.width - delta;
                        left = scrollParams.left + delta;
                    }
                    _atoms('scroll_mid')({ width, left });
                }
                else if (!isTouchEvent) {
                    const clientRect = scroll_mid_elem.dom_node().getBoundingClientRect();
                    const cursor = (clientRect.top <= clientY && clientY <= clientRect.bottom) && (clientX - scroll_selector_width <= clientRect.left && clientRect.left <= clientX ||
                        clientX <= clientRect.right && clientRect.right <= clientX + scroll_selector_width ||
                        false) ? 'col-resize' : 'default';
                    setBodyCursor({ origin: self, cursor });
                }
                if (isTouchEvent && scrollParams && event.cancelable) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                _scroll_mid_width_min = void 0;
            }
            function scrollMouseUpEventListener() {
                scrollParams = void 0;
                lastMoveClientX = void 0;
                lastMoveClientY = void 0;
                setBodyCursor({ origin: self, cursor: 'default' });
            }
            document.body.addEventListener('mousedown', scrollMouseDownEventListener);
            document.body.addEventListener('touchstart', scrollMouseDownEventListener, { passive: true });
            document.body.addEventListener('mousemove', scrollMouseMoveEventListener);
            document.body.addEventListener('touchmove', scrollMouseMoveEventListener, { passive: false });
            document.body.addEventListener('mouseup', scrollMouseUpEventListener, { passive: true });
            document.body.addEventListener('touchend', scrollMouseUpEventListener, { passive: true });
            document.body.addEventListener('touchcancel', scrollMouseUpEventListener, { passive: true });
            const self = Object.assign({}, elem, { props });
            return self;
        }
        $$.ag_chart = ag_chart;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//app.view.js.map
//# sourceMappingURL=web.js.map