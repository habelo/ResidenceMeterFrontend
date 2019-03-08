<template>
 <div>
   <h1 class="display-4">Please log in</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="usernamegrp"
                    label="Username"
                    label-for="username"
                    description="Login with your username.">
        <b-form-input id="username"
                      type="text"
                      v-model="form.username"
                      required
                      placeholder="Enter Username">
        </b-form-input>
      </b-form-group>
      <b-form-group id="passwordgrp"
                    label="Password:"
                    label-for="password">
        <b-form-input id="password"
                      type="password"
                      v-model="form.password"
                      required
                      placeholder="Enter Password">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <!-- <b-alert v-else-if="success==false" variant="danger" show>{{message}}</b-alert> -->
    <b-alert v-if="!success" variant="danger" show>{{message}}</b-alert>
  </div>
</template>

<script>
import router from "@/router";
import jwt_decode from 'jwt-decode';

export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
      },
      decoded: '',
      show: true,
      success: true,
      message: ''
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      const req = new Request("http://127.0.0.1:9090/login")
      var userobj = {
        username: this.form.username,
        password: this.form.password
      };
      return fetch(req, {
        method: "POST",
        body: JSON.stringify(userobj),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if(res.status === 200){
          this.success=true
          console.log(res)
          var token = res.headers.get("Authorization").split("Bearer ").pop()
          this.decoded = jwt_decode(token)
          this.$cookies.set("decoded", this.decoded.roles)
          this.$cookies.set("token", token)
          this.$cookies.set("username", this.form.username)
        } else if(res.status != 200){
          this.success=false
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
    },
    onReset (evt) {
      evt.preventDefault()
      this.form.username = ''
      this.form.password = ''
      this.show = false
      this.$nextTick(() => { this.show = true })
    }
  }
}
</script>

<style scoped>

</style>
