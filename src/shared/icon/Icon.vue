<template>
  <span :class="`icon-${name}`" />
</template>

<script>
export default {
  name: "icon",
  props: ["name"]
}
</script>

<style>
@charset "UTF-8";

 @font-face {
  font-family: 'icons';
  src: url('./font/icons.eot?87729592');
  src: url('./font/icons.eot?87729592#iefix') format('embedded-opentype'),
       url('./font/icons.woff2?87729592') format('woff2'),
       url('./font/icons.woff?87729592') format('woff'),
       url('./font/icons.ttf?87729592') format('truetype'),
       url('./font/icons.svg?87729592#icons') format('svg');
  font-weight: normal;
  font-style: normal;
}
/* Chrome hack: SVG is rendered more smooth in Windozze. 100% magic, uncomment if you need it. */
/* Note, that will break hinting! In other OS-es font will be not as sharp as it could be */
/*
@media screen and (-webkit-min-device-pixel-ratio:0) {
  @font-face {
    font-family: 'icons';
    src: url('../font/icons.svg?87729592#icons') format('svg');
  }
}
*/
 
 [class^="icon-"]:before, [class*=" icon-"]:before {
  font-family: "icons";
  font-style: normal;
  font-weight: normal;
  speak: never;
 
  display: inline-block;
  text-decoration: inherit;
  width: 1em;
  margin-right: .2em;
  text-align: center;
  /* opacity: .8; */
 
  /* For safety - reset parent styles, that can break glyph codes*/
  font-variant: normal;
  text-transform: none;
 
  /* fix buttons height, for twitter bootstrap */
  line-height: 1em;
 
  /* Animation center compensation - margins should be symmetric */
  /* remove if not needed */
  margin-left: .2em;
 
  /* you can be more comfortable with increased icons size */
  /* font-size: 120%; */
 
  /* Font smoothing. That was taken from TWBS */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
  /* Uncomment for 3D effect */
  /* text-shadow: 1px 1px 1px rgba(127, 127, 127, 0.3); */
}
 
.icon-plus:before { content: '\2b'; } /* '+' */
.icon-undo:before { content: '\21b6'; } /* '↶' */
.icon-trash:before { content: '\e01b'; } /* '' */
.icon-user:before { content: '👤'; } /* '\1f464' */
.icon-floppy:before { content: '💾'; } /* '\1f4be' */
.icon-search:before { content: '🔍'; } /* '\1f50d' */
</style>