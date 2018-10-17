<template>
  <div id="app">
    <h1>Vue timeline</h1>
    <div class="menus">
      <SourcePointTimeline
        v-for="(menu, index) in menus"
        :show="menu.show" 
        :key="index" 
        :setup="setup"
        class="menu-wrapper"
      >
        <div class="menu" @click="toggleMenu(menu)">
          <div class="menu-body" >
            <div class="menu-title">{{ index }}</div>
            <div class="menu-footer">
              <div class="menu-footer-body">Message</div>
            </div>
          </div>
        </div>
      </SourcePointTimeline>
    </div>
  </div>
</template>

<script>
import Timeline from './components/Timeline'
import SourcePointTimeline from './components/SourcePointTimeline'
import { TimelineMax, TimelineLite } from 'gsap/all';

export default {
  name: 'app',
  data() {
    return {
      menus: Array(10).fill().map(() => ({show: false}))
    }
  },
  components: {
    SourcePointTimeline,
  },
  methods: {
    toggleMenu(menu) {
      menu.show = !menu.show;
    },
    setup(el, rect) {
      const tl = new TimelineMax();
      tl.to(el, 0.3, { top: 0, left: 0, width: '100%', height: '100%' });

      return tl;
    }
  }
}
</script>

<style lang="scss">

*, *:before, *:after { 
  box-sizing: border-box;
}

/* #zoom-root .test { */
#zoom-root {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  .test {
    border: 1px solid black;
    padding: 10px;
  }
  
}

body {
  background-color: #ebdcbd;
  color:#878787;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  font-size: 14px;
}

#app {
  width: 100%;
  max-width: 600px;
  margin: 50px auto 0 auto;
  border: 1px solid #4b4a4a;
}

.menus {
  display: flex;
  flex-wrap: wrap;
}

$backgroundsPool: (#9becca, #f1efac, #d1a1ea, #ece7ef);
@each $backgroundColor in $backgroundsPool {
  $i: index($backgroundsPool, $backgroundColor);
  $darkerBackgroundColor: darken($backgroundColor, 20%);

  .menu-wrapper:nth-child(#{length($backgroundsPool)}n+#{$i}) .menu {
    & { background-color: $backgroundColor; }
    .menu-footer { background-color: $darkerBackgroundColor };
    .menu-footer-body {
      @if(lightness($darkerBackgroundColor) < 55) {
        color: white; 
      } 
    }
  }
  
}

.next-icon {
  width: 0;
  height: 0;

  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left:8px solid #4a4a4a;
      
  
}

.back-icon {
  @extend .next-icon;

  border-left: 0;
  border-right:8px solid #4a4a4a;
}

.menu-wrapper {
  border: 1px solid #4b4a4a;
  width: 50%;
}
.menu {
  & {
    
  }

  .menu-title {
    padding: 50px 0;
    font-size: 1.5em;
    color:white;
    text-align: center;
    text-shadow: 0px 0px 3px #404040;
  }

  .menu-footer {
    position: relative;
  }

  .menu-footer-body {
    & {
      /* mix-blend-mode: difference; */
      /* color:white; */
      line-height: 40px;
      padding: 0 5px 0 10px;
      color:#4a4a4a;
    }
    
    &:after {
      @extend .next-icon;

      content: '';
      display: block;
      position: absolute;
      top:50%;
      right: 10px;
      margin-top: -8px;
    }
  }

}


</style>
