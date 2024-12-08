<template>
  <!-- <Suspense>
    <App/>
    <template #fallback>
      <Skeleton/>
    </template>
  </Suspense> -->
</template>

<script>
  // import App from '.pages/index/index.vue'
  // import Skeleton from './pages/skeleton/skeleton.vue'
  // import { Suspense } from 'vue'
  
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
