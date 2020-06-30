<template>
    <div class="toner">

        <svg width='388px' height='20px'>
            <rect class = "outher-rect" width="388px" height="17" x="0" y="0" rx="3" ry="3"/>
            <rect class="black-inner-rect"  v-bind:width="this.toner_level*388/100" :class="{'red-inner-rect': this.type === 1, 'cyan-inner-rect': this.type === 2, 'yellow-inner-rect': this.type === 3}" height="15" x="1" y="1" rx="3" ry="3"  />
            <text class="percent" x="170" y="13" fill="white">{{this.toner_level}}%</text>
        </svg>
    </div>
</template>

<script>
    export default {
        name: "tonerlevel",
        props: ['type', 'toner_level']
    }
</script>

<style scoped>
    .outher-rect {
        border: 1px solid #000000;
        fill: #9e9e9e;
    }
    .black-inner-rect {
        border: 1px solid #000000;
        fill: #000000;
        transition: fill 1s;
    }
    .cyan-inner-rect {
        border: 1px solid #000000;
        fill: #1565c0;
        transition: fill 1s;
    }
    .red-inner-rect {
        border: 1px solid #000000;
        fill: #d81b60;
        transition: fill 1s;
    }
    .yellow-inner-rect {
        border: 1px solid #000000;
        fill: #f9a825;
        transition: fill 1s;
        pointer-events: none;
    }
    .toner {
        transition: 1s;
    }
    .percent {
        font-size: 0.7rem;
        font-weight: bold;
    }
</style>