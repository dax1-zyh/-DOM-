window.dom = {
    //增
    //dom.create(`<div>hi</div>`) 用于创建节点
    create(string) {
        const container = document.createElement('template');
        container.innerHTML = string.trim();    //将字符串两边的空格去掉
        return container.content.firstChild;
    },
    //dom.after(node,node2) 用于新增弟弟
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nestSibling);
    },
    //dom.before(node,node2)    用于新增哥哥
    before(node, node2) {
        node.parentNode.insertBefore(node2, node);
    },
    //dom.append(parent,child)  用于新增儿子
    append(parent, node) {
        parent.appendChild(node);
    },
    //dom.wrap(`<div></div>`)   用于新增爸爸
    wrap(node, parent) {
        dom.before(node, parent);
        dom.append(parent, node);
    },
    //删
    //dom.remove(node)  用于删除节点
    remove(node) {
        node.parentNode.removeChild(node);
        return node;
    },
    //dom.empty(parent) 用于删除后代
    empty(node) {
        const array = [];
        let x = node.firstChild;
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array;
    },
    //改
    //用于读写属性
    attr(node, name, value) {
        if (arguments.length === 3) {
            node.setAttribute(name, value);
        } else if (arguments.length === 2) {
            return node.getAttribute(name);
        }
    },
    //用于读写文本内容
    text(node, string) {
        if (arguments.length === 2) {       //重载
            if ('innerText' in node) {      //适配
                node.innerText = string;      //ie
            } else {
                node.textContent = string;    //firefox/chrome
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText;
            } else {
                return node.textContent;
            }
        }
    },
    //用于读写HTML内容
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    //用于修改style
    style(node, name, value) {
        if (arguments.length === 3) {
            // dom.style('div','color','red')
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                //dom.style(div,'color')
                return node.style[name]
            } else if (name instanceof Object) {
                //dom.style(dib,{color:'red'})
                const object = name
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }
        }
    },
    //用于添加class
    //用于删除class
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },
    //用于添加事件监听
    on(node, eventName, fn) {
        node.addEvenListener(eventName, fn)
    },
    //用于删除时间监听
    off(node, eventName, fn) {
        node.removeEvenListener(eventName, fn)
    },
    //查
    //用于获取标签或标签们
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    //用于获取父元素
    parent(node) {
        return node, parentNode
    },
    //用于获取子元素
    children(node) {
        return node.children
    },
    //用于获取兄弟姐妹元素
    siblings(node) {
        return Array.from(node.parentNode.children)
            .filter(n => n !== node)
    },
    //用于获取弟弟
    next(node) {
        let x = node.nextSibling
        while (x && x.node.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    //用于获取哥哥
    previous(node) {
        let x = node.previousSibling
        while (x && x.node.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    //用于遍历所有节点
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    //用于获取排行老几
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }
}