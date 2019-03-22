<template>
    <div>
    <h1 class="display-3">Choose journey</h1>

<b-form-group id="startgrp"
                    label="Start:"
                    label-for="start"
                    description="State exact address">
        <b-form-input id="start-input"
                      type="text"
                      v-model="form.start"
                      required
                      placeholder="Enter your starting position">
        </b-form-input>
      </b-form-group>
      <b-form-group id="destinationgrp"
                    label="Destination:"
                    label-for="destination">
        <b-form-input id="destination"
                      type="text"
                      v-model="form.destination"
                      required
                      placeholder="Enter your destination">
        </b-form-input>
        <b-button variant="outline-primary" id="routebutton" @click="getRoute($event.srcElement.id)">Get my route!</b-button>
      </b-form-group>

    <b-list-group>
      <b-list-group-item
        v-b-toggle="'route'+route.origin"
        v-for="route in routes"
        v-bind:key="route.arrival"
        >
        {{route}}
        <b-collapse :id="'route'+route.origin" class="mt-2">
          <b-card>
            <p class="card-text">Created: {{route}}</p>
            <b-collapse id="collapse1_inner" class="mt-2">
              <p>Vad här</p>
            </b-collapse>
          </b-card>
        </b-collapse>
      </b-list-group-item>
    </b-list-group>

    <div>
    
    </div>
  </div>
</template>

<script>
export default {
data () {
    return {
      form: {
        start: '',
        destination: '',
      },
      routes:[],
    }
  },

methods: {
  
  getRoute(){
    const req = new Request("http://127.0.0.1:9090/travel?start="+this.form.start+"&destination="+this.form.destination)
      return fetch(req, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$cookies.get("token")
          }
      })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
          return res.json()
          }
        }).then(data => {
          this.routes = data;
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        });
  }
}

}
</script>

<style>

</style>
