<template>
    <div class="card" @mouseover="mouseOver" @mouseout="mouseOut">
        <div class="card-front">
            <div class="card-title">{{this.device.name}}</div>
            <div class="card-subtitle">{{this.device.device}}</div>
            <hr>
            <div class="card-body">
                <span>цех/отдел: {{this.device.unit}}</span>
                <span>корпус: {{this.device.build}} кабинет: {{this.device.office}}</span>
                <span>принято {{this.start_date}}</span>
                <span class="line"><span class="inline">отпечатков с начала месяца: {{printouts}}</span><span class="inline" v-if="this.device.type">, цветных: {{color_printouts}}, ч/б: {{bw_printouts}}</span></span>
                <br>
                <span>Модель: {{this.device.model}}</span>
                <span>Производитель: {{this.device.vendor}}</span>
                <span>S/N: {{this.device.serial}}</span>
                <span>начальный остаток: {{this.device.balance}} отпечатков: {{this.device.result.printouts}}</span>
                <div class="attbar">
                    <Btnbar v-bind:buttons="attentions"></Btnbar>
                </div>
            </div>
        </div>
        <template v-if="active">
            <div class="details">
                <Tonerlevel></Tonerlevel>
                <div class="graph">
                    <h2>Отпечатано в 2020</h2>
                    <Chart :width="380" :height="200"></Chart>
                </div>
                <div class="attbar">
                    <Btnbar v-bind:buttons="buttons"></Btnbar>
                </div>
            </div>
        </template>
    </div>
</template>

<script>

    const Toner = require('@/assets/icons/move_to_inbox-24px.svg')
    const Paper = require('@/assets/icons/save_alt-24px.svg')
    const Flag = require('@/assets/icons/flag-24px.svg')
    const Edit = require('@/assets/icons/create-24px.svg')
    const Camera = require('@/assets/icons/camera_alt-24px.svg')
    const Report = require('@/assets/icons/insert_chart_outlined-24px.svg')
    const Timer = require('@/assets/icons/av_timer-24px.svg')
    const Trash = require('@/assets/icons/delete-24px.svg')

    import Tonerlevel from './Tonerlevel'
    import Chart from './Chart'
    import Btnbar from './Btnbar'

    export default {
        name: "devcard",
        props: ['device'],
        components: {
            Tonerlevel,
            Chart,
            Btnbar,
        },
        data() {
            return {
                active: false,
                attentions: [
                    {id: 0, svg: Toner, opacity: 0.1},
                    {id: 1, svg: Flag, opacity: 1},
                    {id: 2, svg: Paper, opacity: 0.1},
                ],
                buttons: [
                    {id: 0, svg: Edit, opacity: 0.1},
                    {id: 1, svg: Camera, opacity: 0.1},
                    {id: 2, svg: Report, opacity: 1},
                    {id: 3, svg: Timer, opacity: 1},
                    {id: 4, svg: Trash, opacity: 1},
                ],
                myVar: undefined,
            }
        },
        computed: {
            printouts(){
                return this.device.result.printouts - this.device.result.start_printouts
            },
            color_printouts(){
                return this.device.result.col_printouts - this.device.result.start_col_printouts
            },
            bw_printouts(){
                return this.device.result.bw_printouts - this.device.result.start_bw_printouts
            },
            start_date() {
                return new Date(this.device.start_date).toLocaleDateString();
            }
        },
        methods: {
            mouseOver: function () {
                clearTimeout(this.myVar);
                this.myVar = setTimeout(() => this.active = true, 500)
            },
            mouseOut: function () {
                clearTimeout(this.myVar);
                this.myVar = setTimeout(() => this.active = false, 500)
            }
        },
    }
</script>

<style scoped>
    .card {
        font-family: playregular;
        position: relative;
        margin: 20px 0;
        width: 420px;
        height: 600px;
        background: #fff;
        transform-style: preserve-3d;
        transform: perspective(2000px);
        transition: 1s;
        box-shadow: inset 300px 0 50px rgba(0, 0, 0, 0.5);
        border-radius: 0 5px 5px 0;
    }

    .card:hover {
        box-shadow: inset 20px 0 50px rgba(0, 0, 0, 0.5);
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
        border-radius: 0 5px 5px 0;
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
        font-family: playbold;
        text-transform: uppercase;
        transition: 1s;
        margin-top: 10px;
        margin-left: 20px;
        text-align: left;
    }

    .card .card-front .card-subtitle {
        text-transform: uppercase;
        font-family: playbold;
        transition: 1s;
        margin-top: 10px;
        margin-left: 20px;
        text-align: left;
        font-size: 0.9em;
        opacity: 0.4;
    }

    .card .card-front .attbar {
        display: flex;
        height: 350px;
        flex-direction: column-reverse;
    }

    .card .card-front hr {
        margin-left: 20px;
        margin-right: 20px;
        color: #eeeeee;
        background-color: #eeeeee;
    }

    .card .card-front span {
        margin-left: 20px;
        transition: 1s;
    }

    .card .card-front p {
        transition: 1s;
    }

    .card:hover .card-front {
        transform: rotateY(-180deg);
        box-shadow: inset 20px 0 50px rgba(0, 0, 0, 0.5);
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

    .card:hover .card-front span {
        transform: rotateY(-180deg);
        margin-right: 20px;
        transition: 1s;
    }

    .card:hover .card-front p {
        transform: rotateY(-180deg);
        transition: 1s;
    }

    .card:hover .card-front .attbar {
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
    .line {
        float: left;
    }
    .inline {
        display: contents;
        margin: 0px;
        padding: 0px;
    }
</style>