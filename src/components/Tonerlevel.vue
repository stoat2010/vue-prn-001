<template>
    <div class="toner">
        <h2>Уровень тонера</h2>
        <svg width='388px' height='20px'>
            <rect class = "outher-rect" width="388px" height="17" x="0" y="0" rx="3" ry="3"/>
            <rect class="black-inner-rect" width="194px" height="15" x="1" y="1" rx="3" ry="3"  />
            <text class="percent" x="170" y="13" fill="white">50%</text>
        </svg>
        <svg width='388px' height='20px'>
            <rect class = "outher-rect" width="388px" height="17" x="0" y="0" rx="3" ry="3"/>
            <rect class="red-inner-rect" width="194px" height="15" x="1" y="1" rx="3" ry="3"  />
            <text class="percent" x="170" y="13" fill="white">50%</text>
        </svg>
        <svg width='388px' height='20px'>
            <rect class = "outher-rect" width="388px" height="17" x="0" y="0" rx="3" ry="3"/>
            <rect class="cyan-inner-rect" width="194px" height="15" x="1" y="1" rx="3" ry="3"  />
            <text class="percent" x="170" y="13" fill="white">50%</text>
        </svg>
        <svg width='388px' height='20px'>
            <rect class = "outher-rect" width="388px" height="17" x="0" y="0" rx="3" ry="3"/>
            <rect class="yellow-inner-rect" width="194px" height="15" x="1" y="1" rx="3" ry="3"  />
            <text class="percent" x="170" y="13" fill="white">50%</text>
        </svg>
    </div>
</template>

<script>
    export default {
        name: "tonerlevel"
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