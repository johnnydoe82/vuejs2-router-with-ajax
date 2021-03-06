import Vue from 'vue'

describe('Options computed', () => {
  it('basic usage', done => {
    const vm = new Vue({
      template: '<div>{{ b }}</div>',
      data: {
        a: 1
      },
      computed: {
        b () {
          return this.a + 1
        }
      }
    }).$mount()
    expect(vm.b).toBe(2)
    expect(vm.$el.textContent).toBe('2')
    vm.a = 2
    expect(vm.b).toBe(3)
    waitForUpdate(() => {
      expect(vm.$el.textContent).toBe('3')
    }).then(done)
  })

  it('with setter', done => {
    const vm = new Vue({
      template: '<div>{{ b }}</div>',
      data: {
        a: 1
      },
      computed: {
        b: {
          get () { return this.a + 1 },
          set (v) { this.a = v - 1 }
        }
      }
    }).$mount()
    expect(vm.b).toBe(2)
    expect(vm.$el.textContent).toBe('2')
    vm.a = 2
    expect(vm.b).toBe(3)
    waitForUpdate(() => {
      expect(vm.$el.textContent).toBe('3')
      vm.b = 1
      expect(vm.a).toBe(0)
    }).then(() => {
      expect(vm.$el.textContent).toBe('1')
    }).then(done)
  })

  it('watching computed', done => {
    const spy = jasmine.createSpy('watch computed')
    const vm = new Vue({
      data: {
        a: 1
      },
      computed: {
        b () { return this.a + 1 }
      }
    })
    vm.$watch('b', spy)
    vm.a = 2
    waitForUpdate(() => {
      expect(spy).toHaveBeenCalledWith(3, 2)
    }).then(done)
  })

  it('caching', () => {
    const spy = jasmine.createSpy('cached computed')
    const vm = new Vue({
      data: {
        a: 1
      },
      computed: {
        b () {
          spy()
          return this.a + 1
        }
      }
    })
    expect(spy.calls.count()).toBe(0)
    vm.b
    expect(spy.calls.count()).toBe(1)
    vm.b
    expect(spy.calls.count()).toBe(1)
  })

  it('cache: false', () => {
    const spy = jasmine.createSpy('cached computed')
    const vm = new Vue({
      data: {
        a: 1
      },
      computed: {
        b: {
          cache: false,
          get () {
            spy()
            return this.a + 1
          }
        }
      }
    })
    expect(spy.calls.count()).toBe(0)
    vm.b
    expect(spy.calls.count()).toBe(1)
    vm.b
    expect(spy.calls.count()).toBe(2)
  })
})
