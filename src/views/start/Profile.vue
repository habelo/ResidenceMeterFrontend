<template>
  <div>
    <h1 class="display-3">Welcome {{username}}</h1>
    <b-list-group v-if="isAdmin">
      <b-list-group-item
        v-b-toggle="'userpart'+u.username"
        v-for="u in users.content"
        v-bind:key="u.username"
        :variant="styleIfAdmin(u)">
        {{u.username}}
        <b-collapse :id="'userpart'+u.username" class="mt-2">
          <b-card>
            <p class="card-text">Created: {{u.created}}</p>
            <b-button v-for="r in u.roles" v-b-toggle.collapse1_inner size="sm" variant="danger">Remove {{r}} role</b-button>
            <b-button v-for="r in roles.content" v-bind:key="r.name" v-b-toggle.collapse1_inner size="sm">Add {{r.name}} role</b-button>
            <b-collapse id="collapse1_inner" class="mt-2">
            </b-collapse>
          </b-card>
        </b-collapse>
      </b-list-group-item>
    </b-list-group>

    <div>
      <b-pagination size="md" :total-rows="totalSize" v-model="page" :per-page="5"/>
      <b-button variant="outline-primary" id="logout" @click="navigate($event.srcElement.id)">Log Out</b-button>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {
      username: "",
      users: [],
      roles: [],
      variantStyle: "primary",
      page: 0,
      size: 5,
      totalSize: 10,
      isAdmin: false
    };
  },
  methods: {
    styleIfAdmin(u) {
      if (u.roles.includes("ADMIN")) {
        return "primary";
      } else if (u.roles[0] == "USER") {
        return "warning";
      }
      return "";
    },
    navigate(id){
      if(id=="logout"){
        router.push({ name: "home"})
      }
    }
  },
  watch: {
    page: function(val) {
      console.log("it watched");
      const jo = new Request(
        "http://localhost:9090/users?page=" + (this.page-1) + "&size=" + this.size
      );
      fetch(jo, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
      })
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else {
            console.error();
          }
        })
        .then(users => {
          if (users === undefined || users.length === 0) {
            //fix some kind of warningbox
            this.users.push("No users")
          } else {
            this.users = users;
            if(this.page>1)
            this.totalSize += users.content.length
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  mounted() {
    console.log("it mounts")
    this.username = sessionStorage.getItem("username");
         const jo = new Request(
      "http://localhost:9090/users/roles"
    );
    fetch(jo, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token")
      }
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.error();
        }
      })
      .then(roles => {
        if (roles === undefined || roles.length === 0) {
          //check this fix
          this.roles.push("No roles somehow")
        } else {
          this.roles = roles;
        }
      })
      .catch(error => {
        console.error(error);
      });
  },
  created: function() {
    console.log("it creates");

    if(sessionStorage.getItem("decoded").includes("ADMIN")){
      this.isAdmin=true
    }

    const jo = new Request(
      "http://localhost:9090/users?page=" + this.page + "&size=" + this.size
    );
    fetch(jo, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token")
      }
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.error();
        }
      })
      .then(users => {
        if (users === undefined || users.length === 0) {
          //fix some kind of warningbox
                      this.users.push("No users")
        } else {
          this.users = users;
        }
      })
      .catch(error => {
        console.error(error);
      });
  },
  beforeUpdate() {
    
  }
};
</script>

<style>
</style>
