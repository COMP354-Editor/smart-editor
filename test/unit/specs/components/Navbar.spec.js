import Vue from 'vue'

import Navbar from '@/components/Navbar'

describe('Navbar.vue', () => {
  it('should render', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(Navbar)
    }).$mount();

    expect(vm.$el !== null).to.be.true;
    expect(vm.$el.querySelector('.dragBar') !== null).to.be.true;
  })
})
