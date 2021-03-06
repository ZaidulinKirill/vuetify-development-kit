let lastClickedElement = null
let doubleClickTimeout = null
const onDoubleClick = ($emit, item) => { $emit(item) }
const selectRow = $emit => (item) => {
  if (lastClickedElement && Object.is(lastClickedElement, item)) {
    onDoubleClick($emit, item)
    lastClickedElement = null
  } else {
    if (doubleClickTimeout) {
      clearTimeout(doubleClickTimeout)
    }

    lastClickedElement = item
    doubleClickTimeout = setTimeout(() => { lastClickedElement = null }, 500)
  }
}

export default (Table) => {
  return {
    functional: true,
    name: 'WithDoubleClickEventDataTable',
    render (createElement, context) {
      return createElement(Table, {
        ...context.data,
        on: {
          'click:row': selectRow(item => context.listeners['dblclick:row'] && context.listeners['dblclick:row'](item)),
          ...context.data.on
        }
      }, context.children)
    }
  }
}
