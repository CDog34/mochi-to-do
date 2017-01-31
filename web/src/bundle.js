function appendNode ( node, target ) {
	target.appendChild( node );
}

function insertNode ( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function detachNode ( node ) {
	node.parentNode.removeChild( node );
}

function teardownEach ( iterations, detach, start ) {
	for ( var i = ( start || 0 ); i < iterations.length; i += 1 ) {
		iterations[i].teardown( detach );
	}
}

function createElement ( name ) {
	return document.createElement( name );
}

function createText ( data ) {
	return document.createTextNode( data );
}

function createComment () {
	return document.createComment( '' );
}

function setAttribute ( node, attribute, value ) {
	node.setAttribute ( attribute, value );
}

function get ( key ) {
	return key ? this._state[ key ] : this._state;
}

function fire ( eventName, data ) {
	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
	if ( !handlers ) return;

	for ( var i = 0; i < handlers.length; i += 1 ) {
		handlers[i].call( this, data );
	}
}

function observe ( key, callback, options ) {
	var group = ( options && options.defer ) ? this._observers.pre : this._observers.post;

	( group[ key ] || ( group[ key ] = [] ) ).push( callback );

	if ( !options || options.init !== false ) {
		callback.__calling = true;
		callback.call( this, this._state[ key ] );
		callback.__calling = false;
	}

	return {
		cancel: function () {
			var index = group[ key ].indexOf( callback );
			if ( ~index ) group[ key ].splice( index, 1 );
		}
	};
}

function on ( eventName, handler ) {
	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
	handlers.push( handler );

	return {
		cancel: function () {
			var index = handlers.indexOf( handler );
			if ( ~index ) handlers.splice( index, 1 );
		}
	};
}

function noop () {}

function dispatchObservers ( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

		var callbacks = group[ key ];
		if ( !callbacks ) continue;

		for ( var i = 0; i < callbacks.length; i += 1 ) {
			var callback = callbacks[i];
			if ( callback.__calling ) continue;

			callback.__calling = true;
			callback.call( component, newValue, oldValue );
			callback.__calling = false;
		}
	}
}

let addedCss$1 = false;
function addCss$1 () {
	var style = createElement( 'style' );
	style.textContent = "\n\t.header  .mochi[svelte-814328128], .header  [svelte-814328128] .mochi, .header[svelte-814328128]  .mochi, [svelte-814328128] .header  .mochi {\n\t    float: right;\n\t    width: 225px;\n\t    height: 185px;\n\t}\n\n\t.header  h1[svelte-814328128], .header  [svelte-814328128] h1, .header[svelte-814328128]  h1, [svelte-814328128] .header  h1 {\n\t    clear: both;\n\t    color: rgba(0, 0, 0, 0.54);\n\t}\n";
	appendNode( style, document.head );

	addedCss$1 = true;
}

function renderMainFragment$1 ( root, component ) {
	var section = createElement( 'section' );
	setAttribute( section, 'svelte-814328128', '' );
	section.className = "header";
	
	var img = createElement( 'img' );
	setAttribute( img, 'svelte-814328128', '' );
	img.className = "mochi";
	img.src = "http://www.feathersnfurshoppe.com/images/smallanimaldocs/Hamster.gif";
	
	appendNode( img, section );
	appendNode( createText( "\n    " ), section );
	
	var h1 = createElement( 'h1' );
	setAttribute( h1, 'svelte-814328128', '' );
	
	appendNode( h1, section );
	appendNode( createText( "餅·待办事项" ), h1 );

	return {
		mount: function ( target, anchor ) {
			insertNode( section, target, anchor );
		},
		
		update: noop,
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( section );
			}
		}
	};
}

function Header ( options ) {
	options = options || {};
	
	this._state = options.data || {};

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root;
	this._yield = options._yield;

	if ( !addedCss$1 ) addCss$1();
	
	this._fragment = renderMainFragment$1( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
}

Header.prototype.get = get;
Header.prototype.fire = fire;
Header.prototype.observe = observe;
Header.prototype.on = on;

Header.prototype.set = function set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

Header.prototype.teardown = function teardown ( detach ) {
	this.fire( 'teardown' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
};

let addedCss$3 = false;
function addCss$3 () {
	var style = createElement( 'style' );
	style.textContent = "\n\tinput[svelte-2312013245], [svelte-2312013245] input {\n      border: 1px solid rgba(0, 0, 0, 0.12);\n      font-size: 20px;\n      padding: 12px 15px 12px 54px;\n  }\n\n  input[svelte-2312013245]:focus, [svelte-2312013245] input:focus, input[svelte-2312013245]:hover, [svelte-2312013245] input:hover {\n      outline: none;\n      box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);\n  }\n";
	appendNode( style, document.head );

	addedCss$3 = true;
}

function renderMainFragment$3 ( root, component ) {
	var input = createElement( 'input' );
	setAttribute( input, 'svelte-2312013245', '' );
	input.type = "text";
	input.placeholder = "请输入...";

	return {
		mount: function ( target, anchor ) {
			insertNode( input, target, anchor );
		},
		
		update: noop,
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( input );
			}
		}
	};
}

function TodoInput ( options ) {
	options = options || {};
	
	this._state = options.data || {};

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root;
	this._yield = options._yield;

	if ( !addedCss$3 ) addCss$3();
	
	this._fragment = renderMainFragment$3( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
}

TodoInput.prototype.get = get;
TodoInput.prototype.fire = fire;
TodoInput.prototype.observe = observe;
TodoInput.prototype.on = on;

TodoInput.prototype.set = function set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

TodoInput.prototype.teardown = function teardown ( detach ) {
	this.fire( 'teardown' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
};

let addedCss$5 = false;
function addCss$5 () {
	var style = createElement( 'style' );
	style.textContent = "\n\t.todo-list-item[svelte-2919854985], [svelte-2919854985] .todo-list-item {\n\t    display: flex;\n\t    flex-direction: row;\n\t    align-items: center;\n\t    border: 1px solid rgba(0, 0, 0, 0.12);\n\t    border-top: none;\n\t    padding: 12px 15px;\n\t    background-color: white;\n\t    transition: 0.1s ease-in all;\n\t    cursor: default;\n\t}\n\n\t.todo-list-item[svelte-2919854985]:hover, [svelte-2919854985] .todo-list-item:hover {\n\t    background-color: #f8f8f8;\n\t}\n\n\t.todo-list-item  .is-done[svelte-2919854985], .todo-list-item  [svelte-2919854985] .is-done, .todo-list-item[svelte-2919854985]  .is-done, [svelte-2919854985] .todo-list-item  .is-done {\n\t    cursor: pointer;\n\t}\n\n\t.todo-list-item  .content[svelte-2919854985], .todo-list-item  [svelte-2919854985] .content, .todo-list-item[svelte-2919854985]  .content, [svelte-2919854985] .todo-list-item  .content {\n\t    flex: 1;\n\t    padding: 0 15px;\n\t    line-height: 28px;\n\t}\n\n\t.todo-list-item  .content.done[svelte-2919854985], .todo-list-item  [svelte-2919854985] .content.done, .todo-list-item[svelte-2919854985]  .content.done, [svelte-2919854985] .todo-list-item  .content.done {\n\t    text-decoration: line-through;\n\t    font-style: italic;\n\t    color: rgba(0, 0, 0, 0.25);\n\t}\n\n\t.todo-list-item  .remove[svelte-2919854985], .todo-list-item  [svelte-2919854985] .remove, .todo-list-item[svelte-2919854985]  .remove, [svelte-2919854985] .todo-list-item  .remove {\n\t    border: none;\n\t    background-color: transparent;\n\t    font-size: 20px;\n\t    color: rgba(0, 0, 0, 0.54);\n\t    cursor: pointer;\n\t}\n\n\t.todo-list-item  .remove[svelte-2919854985]:focus, .todo-list-item  [svelte-2919854985] .remove:focus, .todo-list-item[svelte-2919854985]  .remove:focus, [svelte-2919854985] .todo-list-item  .remove:focus {\n\t    outline: none;\n\t}\n\tinput[svelte-2919854985], [svelte-2919854985] input {\n\t    border: 1px solid rgba(0, 0, 0, 0.12);\n\t    font-size: 20px;\n\t    padding: 12px 15px 12px 54px;\n\t}\n";
	appendNode( style, document.head );

	addedCss$5 = true;
}

function renderMainFragment$5 ( root, component ) {
	var li = createElement( 'li' );
	setAttribute( li, 'svelte-2919854985', '' );
	li.className = "todo-list-item";
	setAttribute( li, 'ng-repeat', "item in items track by $index" );
	
	var input = createElement( 'input' );
	setAttribute( input, 'svelte-2919854985', '' );
	input.title = "is done";
	input.className = "is-done";
	input.type = "checkbox";
	
	appendNode( input, li );
	appendNode( createText( "\n    " ), li );
	
	var span = createElement( 'span' );
	setAttribute( span, 'svelte-2919854985', '' );
	span.className = "content";
	
	appendNode( span, li );
	appendNode( createText( "吃饭／睡觉" ), span );
	appendNode( createText( "\n    " ), li );
	
	var button = createElement( 'button' );
	setAttribute( button, 'svelte-2919854985', '' );
	button.className = "remove";
	
	appendNode( button, li );
	appendNode( createText( "×" ), button );

	return {
		mount: function ( target, anchor ) {
			insertNode( li, target, anchor );
		},
		
		update: noop,
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( li );
			}
		}
	};
}

function TodoItem ( options ) {
	options = options || {};
	
	this._state = options.data || {};

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root;
	this._yield = options._yield;

	if ( !addedCss$5 ) addCss$5();
	
	this._fragment = renderMainFragment$5( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
}

TodoItem.prototype.get = get;
TodoItem.prototype.fire = fire;
TodoItem.prototype.observe = observe;
TodoItem.prototype.on = on;

TodoItem.prototype.set = function set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

TodoItem.prototype.teardown = function teardown ( detach ) {
	this.fire( 'teardown' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
};

var template$2 = (function () {
	return {
		components:{
			TodoItem
		},
		data(){
			return {
				todoDatas:[0,1,2,3,4]
			}
		}
	}
}());

let addedCss$4 = false;
function addCss$4 () {
	var style = createElement( 'style' );
	style.textContent = "\n\t.todo-list[svelte-2967471599], [svelte-2967471599] .todo-list {\n\t    display: flex;\n\t    flex-direction: column;\n\t    align-items: stretch;\n\t    padding: 0;\n\t    margin: 0;\n\t}\n";
	appendNode( style, document.head );

	addedCss$4 = true;
}

function renderMainFragment$4 ( root, component ) {
	var ul = createElement( 'ul' );
	setAttribute( ul, 'svelte-2967471599', '' );
	ul.className = "todo-list";
	
	var eachBlock_anchor = createComment();
	appendNode( eachBlock_anchor, ul );
	var eachBlock_value = root.todoDatas;
	var eachBlock_iterations = [];
	
	for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
		eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
		eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
	}

	return {
		mount: function ( target, anchor ) {
			insertNode( ul, target, anchor );
		},
		
		update: function ( changed, root ) {
			var eachBlock_value = root.todoDatas;
			
			for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
				if ( !eachBlock_iterations[i] ) {
					eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
					eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
				} else {
					eachBlock_iterations[i].update( changed, root, eachBlock_value, eachBlock_value[i], i );
				}
			}
			
			teardownEach( eachBlock_iterations, true, eachBlock_value.length );
			
			eachBlock_iterations.length = eachBlock_value.length;
		},
		
		teardown: function ( detach ) {
			teardownEach( eachBlock_iterations, false );
			
			if ( detach ) {
				detachNode( ul );
			}
		}
	};
}

function renderEachBlock ( root, eachBlock_value, data, data__index, component ) {
	var todoItem = new template$2.components.TodoItem({
		target: null,
		_root: component._root || component
	});

	return {
		mount: function ( target, anchor ) {
			todoItem._fragment.mount( target, anchor );
		},
		
		update: noop,
		
		teardown: function ( detach ) {
			todoItem.teardown( detach );
		}
	};
}

function TodoList ( options ) {
	options = options || {};
	
	this._state = Object.assign( template$2.data(), options.data );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root;
	this._yield = options._yield;

	if ( !addedCss$4 ) addCss$4();
	this._renderHooks = [];
	
	this._fragment = renderMainFragment$4( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
	
	while ( this._renderHooks.length ) {
		var hook = this._renderHooks.pop();
		hook.fn.call( hook.context );
	}
}

TodoList.prototype.get = get;
TodoList.prototype.fire = fire;
TodoList.prototype.observe = observe;
TodoList.prototype.on = on;

TodoList.prototype.set = function set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
	
	while ( this._renderHooks.length ) {
		var hook = this._renderHooks.pop();
		hook.fn.call( hook.context );
	}
};

TodoList.prototype.teardown = function teardown ( detach ) {
	this.fire( 'teardown' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
};

var template$1 = (function () {
  return {
    components:{
      TodoInput,
      TodoList
    }
  }
}());

let addedCss$2 = false;
function addCss$2 () {
	var style = createElement( 'style' );
	style.textContent = "\n  .box[svelte-1243235162], [svelte-1243235162] .box {\n      display: flex;\n      flex-direction: column;\n      align-items: stretch;\n      box-shadow: 0 0 80px rgba(0, 0, 0, 0.08);\n  }\n";
	appendNode( style, document.head );

	addedCss$2 = true;
}

function renderMainFragment$2 ( root, component ) {
	var section = createElement( 'section' );
	setAttribute( section, 'svelte-1243235162', '' );
	section.className = "box";
	
	var todoInput = new template$1.components.TodoInput({
		target: section,
		_root: component._root || component
	});
	
	appendNode( createText( "\n    " ), section );
	
	var todoList = new template$1.components.TodoList({
		target: section,
		_root: component._root || component
	});

	return {
		mount: function ( target, anchor ) {
			insertNode( section, target, anchor );
		},
		
		update: noop,
		
		teardown: function ( detach ) {
			todoInput.teardown( false );
			todoList.teardown( false );
			
			if ( detach ) {
				detachNode( section );
			}
		}
	};
}

function Box ( options ) {
	options = options || {};
	
	this._state = options.data || {};

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root;
	this._yield = options._yield;

	if ( !addedCss$2 ) addCss$2();
	this._renderHooks = [];
	
	this._fragment = renderMainFragment$2( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
	
	while ( this._renderHooks.length ) {
		var hook = this._renderHooks.pop();
		hook.fn.call( hook.context );
	}
}

Box.prototype.get = get;
Box.prototype.fire = fire;
Box.prototype.observe = observe;
Box.prototype.on = on;

Box.prototype.set = function set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
	
	while ( this._renderHooks.length ) {
		var hook = this._renderHooks.pop();
		hook.fn.call( hook.context );
	}
};

Box.prototype.teardown = function teardown ( detach ) {
	this.fire( 'teardown' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
};

var template = (function () {
	return {
		components:{
			Header,
			Box
		}
	}
}());

let addedCss = false;
function addCss () {
	var style = createElement( 'style' );
	style.textContent = "\n\t.container[svelte-3893971718], [svelte-3893971718] .container {\n\t    display: flex;\n\t    flex-direction: row;\n\t    justify-content: center;\n\t}\n\n\t.wrapper[svelte-3893971718], [svelte-3893971718] .wrapper {\n\t    width: 600px;\n\t    padding-top: 50px;\n\t    padding-bottom: 50px;\n\t}\n";
	appendNode( style, document.head );

	addedCss = true;
}

function renderMainFragment ( root, component ) {
	var div = createElement( 'div' );
	setAttribute( div, 'svelte-3893971718', '' );
	div.className = "container";
	
	var div1 = createElement( 'div' );
	setAttribute( div1, 'svelte-3893971718', '' );
	div1.className = "wrapper";
	
	appendNode( div1, div );
	
	var header = new template.components.Header({
		target: div1,
		_root: component._root || component
	});
	
	appendNode( createText( "\n\t    " ), div1 );
	
	var box = new template.components.Box({
		target: div1,
		_root: component._root || component
	});

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},
		
		update: noop,
		
		teardown: function ( detach ) {
			header.teardown( false );
			box.teardown( false );
			
			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function App ( options ) {
	options = options || {};
	
	this._state = options.data || {};

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root;
	this._yield = options._yield;

	if ( !addedCss ) addCss();
	this._renderHooks = [];
	
	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
	
	while ( this._renderHooks.length ) {
		var hook = this._renderHooks.pop();
		hook.fn.call( hook.context );
	}
}

App.prototype.get = get;
App.prototype.fire = fire;
App.prototype.observe = observe;
App.prototype.on = on;

App.prototype.set = function set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
	
	while ( this._renderHooks.length ) {
		var hook = this._renderHooks.pop();
		hook.fn.call( hook.context );
	}
};

App.prototype.teardown = function teardown ( detach ) {
	this.fire( 'teardown' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
};

const app = new App({
	target:document.querySelector('app')
});
