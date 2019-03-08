<template>
  <div>
    <h1 class="display-4">Please make new user</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="usernamegrp"
        label="Username"
        label-for="username"
        description="Write your desired username.">
        <b-form-input
          id="username"
          type="text"
          v-model="form.username"
          required
          placeholder="Enter Username"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="passwordgrp" label="Password:" label-for="password">
        <b-form-input
          id="password"
          type="password"
          v-model="form.password"
          required
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button v-if="success!=null" @click="navigate()" variant="secondary">To Login</b-button>
    </b-form>
    <b-alert v-if="success" variant="success" show>User Created!</b-alert>
    <b-alert v-else-if="success==false" variant="danger" show>{{message}}</b-alert>
  </div>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      show: true,
      success: null,
      message: ""
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const req = new Request("http://127.0.0.1:9090/users");
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
          console.log(res);
          if (res.status === 201) {
            this.success = true;
          }
          //får ej ut responsetexten
          // if (res.status === 409 || res.status === 400) {
          if (res.status != 201) {
            this.success = false;
          }
          return res.json();
        }).then(data => {
          console.log(data)
          this.message= data.error
        })
        .catch(err => {
          console.log(err);
        });
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.username = "";
      this.form.password = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    navigate() {
      router.push({ name: "login" });
    }
  }
};
</script>

<style scoped>
</style>