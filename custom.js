var Sport = Vue.extend({
	props: ['id'],
	template: '#mytemplate',
	created() {
		axios.get(this.$route.params.id + '.json')
			.then(response => this.tags = response.data.tags)
		console.log(this.$route.params.id);
	},
	watch: {
		'$route' (to, from) {
			axios.get(this.$route.params.id + '.json')
				.then(response => this.tags = response.data.tags)
			console.log(this.$route.params.id);
		}
	},
	data: function() {
		return {
			tags: ''
		}
	},
})

var router = new VueRouter({
	mode: 'hash',
	base: window.location.href,
	routes: [
		{path: '/someroute/:id', name: 'someroute', component: Sport },
	],
});

var app = new Vue({
	router: router,
	data: {
		message: 'Vue is running.'
	}
}).$mount('#app');