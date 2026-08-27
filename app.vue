<template>
  <div class="min-h-screen bg-sht-off-white text-sht-charcoal">
    <LiveTimeBar />
    <MediaNavbar />
    <main :class="$route.path === '/' ? '' : 'public-page-main'"><NuxtPage /></main>
    <MediaFooter />
  </div>
</template>
