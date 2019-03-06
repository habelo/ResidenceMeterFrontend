<template>
  <div>
  <b-img src="https://picsum.photos/1024/400/?image=41" fluid-grow alt="Fluid-Grow image" />
  <div id="centerstage">
    <h1 class="display-4">Hello and Welcome to ResidenceMeter</h1>
     <b-button-group vertical size="lg">
    <b-button v-on:click="navigate('login')" >Login</b-button>
    <b-button v-on:click="navigate('create')">Create new Account</b-button>
  </b-button-group>
  </div>
</div>
</template>


<script>
import router from "@/router";

export default {

methods: {
  navigate(button){
    this.$cookies.set("olle", "olle")
    if(button=='create')
    router.push({ name: "new-user"})
    if(button=='login')
    router.push({ name: "login"})
  }
}
}
</script>

<style scoped>
  #centerstage{
    text-align: center;
  }

</style>