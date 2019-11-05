<template>
  <div>
    <AppHero />
    <div class="container">
      <section class="section">
      <div class="m-b-lg">
        <h1 class="title is-inline">Featured Meetups in "Location"</h1>
        <AppDropdown />
        <button class="button is-primary is-pulled-right m-r-sm">Create Meetups</button>
        <router-link :to="{name: 'PageMeetupFind'}" class="button is-primary is-pulled-right m-r-sm">All</router-link>
      </div>
      <div class="row columns is-multiline">
         <MeetupItem v-for="meetup in meetups"
          :key="meetup._id"
          :meetup="meetup"
         />
        
        
      </div>
      </section>
      <section class="section">
        <div>
          <h1 class="title">Categories</h1>
          <div class="columns cover is-multiline is-mobile">
            <div class="column is-one-quarter" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1508355991726-ebd81e4802f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1506&q=80" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Sport</div>
                </span>
              </a>
            </div>
            <div class="column is-one-quarter is-rounded" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Movies</div>
                </span>
              </a>
            </div>
            <div class="column is-one-quarter is-rounded" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1511735111819-9a3f7709049c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Music</div>
                </span>
              </a>
            </div>
            <div class="column is-one-quarter is-rounded" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1509670811615-bb8b07cb3caf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1510&q=80" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Dance</div>
                </span>
              </a>
            </div>
            <div class="column is-one-quarter is-rounded" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Party</div>
                </span>
              </a>
            </div>
            <div class="column is-one-quarter is-rounded" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1490633874781-1c63cc424610?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Books</div>
                </span>
              </a>
            </div>
            <div class="column is-one-quarter is-rounded" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1536510233921-8e5043fce771?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1542&q=80" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Food</div>
                </span>
              </a>
            </div>
            <div class="column is-one-quarter is-rounded" :style="{'min-height': '160px'}">
              <a href="#">
                <span class="is-primary is-top is-medium tooltip">
                  <figure class="image is-4by3 imageFade">
                    <img class="is-rounded" src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt="">
                  </figure>
                  <div class="subtitle m-t-xs bold">Games</div>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import MeetupItem from '@/components/MeetupItem'
  export default {    
    created () {      
      this.$store.dispatch('fetchMeetups');
      this.$store.dispatch('fetchCategories');
      
    },
    components:{
      MeetupItem
    },
    computed:{
      meetups(){
        return this.$store.state.meetups
      },
      categories(){
        return this.$store.state.categories
      }
    }
  }
</script>

<style scoped>
  .is-rounded {
    border-radius: 10px !important;
  }
</style>
