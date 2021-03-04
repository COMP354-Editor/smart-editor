import Vue from 'vue'
import DocumentHeaderPanel from '/src/renderer/components/DocumentHeaderPanel'

describe('DocumentHeaderPanel.vue', () => {
  it('should contain title', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(DocumentHeaderPanel)
    }).$mount()

    expect(vm.$el.querySelector('#title').textContent).to.contain('Title')
  })
})
