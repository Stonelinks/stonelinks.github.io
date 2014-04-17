---
layout: page
title: Experimental FIRST Robotics Simulator
base_url: "../"
---

TODO: fix everything

<script src="{{ page.base_url }}js/physics/physi.js" type="text/javascript"></script>

<script type="text/javascript">

$(document).ready(function() {
  simulator.simulator($('#simulator'))
});

</script>

<style type="text/css">

  #page-body {
    width: 780px;
  }

</style>

Arrow keys to move, spacebar to shoot frisbees

Score:<b id="score">0</b>

<div id="simulator">
</div>

