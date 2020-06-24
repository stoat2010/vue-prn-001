<template>
    <div class="card" @mouseover="mouseOver" @mouseout="mouseOver">
        <div class="card-front">
            <div class="card-title">31MFD504-HPE77822-634.UC.LOCAL</div>
            <div class="card-subtitle">172.25.6.119</div>
            <hr>
            <div class="card-body">
                <span>цех/отдел: Центр печати</span>
                <span>корпус: 504 кабинет: 305а</span>
                <span>принято 23.04.2019</span>
                <span>отпечатков с начала месяца: 2824, цветных: 2130, ч/б: 694</span>
                <br>
                <span>Модель: HP Color LaserJet MFP E77822</span>
                <span>Производитель: Hewlett-Packard</span>
                <span>S/N: CNC1LBJ014</span>
                <span>начальный остаток: 11 отпечатков: 33537</span>
            </div>
        </div>
        <template v-if="active">
        <div class="details">
            <Tonerlevel></Tonerlevel>
            <div class="graph">
                <h2>Отпечатано в 2020</h2>
                <Chart :width="380" :height="250"></Chart>
            </div>
        </div>
        </template>
    </div>
</template>

<script>

    import Tonerlevel from './Tonerlevel'
    import Chart from './Chart'

    export default {
        name: "devcard",
        components: {
            Tonerlevel,
            Chart,
        },
        data(){
            return {
                active: false
            }
        },
        methods: {
            mouseOver: function(){
                setTimeout(()=>this.active = !this.active,500)
            }
        },
    }
</script>

<style scoped>
    .card {
        position: relative;
        margin: 20px 0;
        width: 420px;
        height: 600px;
        background: #fff;
        transform-style: preserve-3d;
        transform: perspective(2000px);
        transition: 1s;
        box-shadow: inset 300px 0 50px rgba(0,0,0, 0.5);
    }
    .card:hover {
        box-shadow: inset 20px 0 50px rgba(0,0,0, 0.5);
    }
    .card .card-front {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 1px solid #ccc;
        transform-origin: left;
        z-index: 2;
        transition: 1s;
        background: #fff;
        opacity: 1;
        box-shadow: inset 20px 0 50px rgba(0,0,0, 0.5);
    }
    .card .card-front .card-body {
        font-size: 0.8em;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        text-align: left;
    }
    .card .card-front .card-title {
        text-transform: uppercase;
        transition: 1s;
        margin-top: 30px;
        margin-left: 20px;
        text-align: left;
    }
    .card .card-front .card-subtitle {
        text-transform: uppercase;
        transition: 1s;
        margin-top: 10px;
        margin-left: 20px;
        text-align: left;
        font-size: 0.9em;
        opacity: 0.5;
    }
    .card .card-front hr {
        margin-left: 20px;
        margin-right: 20px;
        color: #eeeeee;
        background-color: #eeeeee;
    }
    .card .card-front span{
        margin-left: 20px;
        transition: 1s;
    }
    .card .card-front p {
        transition: 1s;
    }
    .card:hover .card-front {
        transform: rotateY(-180deg);
    }
    .card:hover .card-front .card-title {
        transform: rotateY(-180deg);
        transition: 1s;
        margin-right: 20px;
    }
    .card:hover .card-front .card-subtitle {
        transform: rotateY(-180deg);
        transition: 1s;
        margin-right: 20px;
    }
    .card:hover .card-front span{
        transform: rotateY(-180deg);
        margin-right: 20px;
        transition: 1s;
    }
    .card:hover .card-front p {
        transform: rotateY(-180deg);
        transition: 1s;
    }
    .card .details {
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        padding: 20px;
        z-index: 1;
        color: #fff;
        transition: 1s;
        pointer-events: none;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .card:hover .details {
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        padding: 20px;
        z-index: 1;
        color: #000;
        transition: 2s;
    }
    .graph {
        width: 100%;
        height: 300px;
    }
</style>