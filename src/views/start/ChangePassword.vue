<template>
    <div>
         <b-form @submit="onSubmit" v-if="show" @back="navigate">
      <b-form-group id="passwordgrp"
                    label="Enter new password:"
                    label-for="password">
        <b-form-input id="password"
                      type="password"
                      v-model="form.password"
                      placeholder="Enter new Password">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="back" variant="primary">Back</b-button>
    </b-form>
    </div>
</template>

<script>
import router from "@/router";
export default {
  

data () {
    return {
      form: {
        password: '',
      },
      show: true,
      success: false
        }
    },

methods: {

navigate(){
    router.push({name: "profile"})
},

onSubmit (evt) {
      evt.preventDefault();
      const req = new Request("http://127.0.0.1:9090/users")
      var userobj = {
          //felet är nånstans här asså
        username: this.$cookies.get("username"),
        password: this.form.password
      };
      return fetch(req, {
          //funakr inte just nu
        method: "PATCH",
        body: JSON.stringify(userobj),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$cookies.get("token")
        }
      })
      .then(res => {
        console.log(res.status)
        if(res.status === 200){
            this.success=true
        } else if(res.status != 200){
          this.success=false
          console.log(res.statusText)
        }
            return res.json()
      }).then(data => {
        console.log("it push")
        if(this.success){
          router.push({ name: "profile"})
        }
          this.message= data.error
          this.password= ''
        })
        .catch(err => {
          console.log(err);
        })
    }
},
    
}
</script>

<style>

</style>
