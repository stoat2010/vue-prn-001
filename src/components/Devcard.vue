<template>
    <div class="card" @mouseover="mouseOver" @mouseout="mouseOut">
        <div class="card-front" v-bind:class='{disabled: this.device_off, enabled: !this.device_off}'>
            <div class="card-title">{{this.device.name}}</div>
            <div class="card-subtitle">{{this.device.device}}</div>
            <hr>
            <div class="card-body">
                <template v-if="active">
                    <h2>Уровень тонера</h2>
                    <Tonerlevel v-bind:type="0" :toner_level='this.toner_level(+this.device.result.black_toner[3],+this.device.result.black_toner[2])'></Tonerlevel>
                    <template v-if="this.device.type">
                        <Tonerlevel v-bind:type="1" :toner_level='this.toner_level(+this.device.result.red_toner[3],+this.device.result.red_toner[2])'></Tonerlevel>
                        <Tonerlevel v-bind:type="2" :toner_level='this.toner_level(+this.device.result.cyan_toner[3],+this.device.result.cyan_toner[2])'></Tonerlevel>
                        <Tonerlevel v-bind:type="3" :toner_level='this.toner_level(+this.device.result.yellow_toner[3],+this.device.result.yellow_toner[2])'></Tonerlevel>
                    </template>
                    <template v-else>
                        <div style="min-height: 70px; width: 100%"></div>
                    </template>
                </template>
                <template v-else>
                    <span>цех/отдел: {{this.device.unit}}</span>
                    <span>корпус: {{this.device.build}} кабинет: {{this.device.office}}</span>
                    <span>принято {{this.start_date}}</span>
                    <span class="line"><span class="inline">отпечатков с начала месяца: <b>{{printouts}}</b></span><span class="inline" v-if="this.device.type">, цветных: <b>{{color_printouts}}</b>, ч/б: <b>{{bw_printouts}}</b></span></span>
                    <br>
                    <span>Модель: {{this.device.model}}</span>
                    <span>Производитель: {{this.device.vendor}}</span>
                    <span>S/N: {{this.device.serial}}</span>
                    <span>начальный остаток: {{this.device.balance}} отпечатков: {{this.device.result.printouts}}</span>
                </template>
                <div class="attbar">
                    <Btnbar v-bind:buttons="attentions"></Btnbar>
                </div>
            </div>
        </div>
        <template v-if="active">
            <div class="details">
                <div class="graph">
                    <div class="title">
                        <a href="" v-on:click.prevent="delYear">-</a>
                        <h2>Отпечатано в {{this.year}}</h2>
                        <a href="" v-on:click.prevent="addYear">+</a>
                    </div>
                    <Chart :width="380" :height="200" v-bind:values='this.devGraphs'></Chart>
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

    import {mapGetters, mapActions, mapMutations} from 'vuex'

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
                year: new Date().getFullYear(),
                attentions: [
                    {id: 0, svg: Toner, opacity: this.toner_alarm},
                    {id: 1, svg: Flag, opacity: this.snmp_error},
                    {id: 2, svg: Paper, opacity: this.paper},
                ],
                buttons: [
                    {id: 0, svg: Edit, opacity: 0.1},
                    {id: 1, svg: Camera, opacity: 0.1},
                    {id: 2, svg: Report, opacity:this.changeOpacity("inreport")},
                    {id: 3, svg: Timer, opacity: this.changeOpacity("convenience")},
                    {id: 4, svg: Trash, opacity: 1, fill: "black"},
                ],
                myVar: undefined,

            }
        },
        computed: {
            ...mapGetters(['devGraphs']),
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
            },
            toner_alarm: function() {
                if (!this.device.type) {
                    if (+this.device.result.black_toner[3] < 5) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    if (+this.device.result.black_toner[3] < 5 || +this.device.result.red_toner[3] < 5 || +this.device.result.cyan_toner[3] < 5 || +this.device.result.yellow_toner[3] < 5) {
                        return true
                    } else {
                        return false
                    }
                }
            },
            paper: function() {
                    if (this.device.convenience) {
                        if ( this.device.tray_status > 0) {
                            return true
                        } else {
                            return false
                        }
                    }else{
                        return false
                    }
            },
            snmp_error: function() {
                if (this.device.result.snmp_error) {
                    return true

                }else{
                    return false
                }
            },
            device_off: function() {

                    if (this.device.status) {
                        return false
                    } else {
                        return true
                    }
            }
        },
        watch: {
          snmp_error: function(newVal) {
              if(newVal){
                  this.addPopup({
                      id: Date.now(),
                      type: true,
                      device: this.device.name,
                      location: "корпус: " + this.device.build + " кабинет: " + this.device.office,
                      message: "Ошибка SNMP опроса"
                  });
              }else{
                  this.addPopup({
                      id: Date.now(),
                      type: false,
                      device: this.device.name,
                      location: "корпус: " + this.device.build + " кабинет: " + this.device.office,
                      message: "устройство опрошено"
                  });
              }
          },
          paper: function(newVal) {

              if(newVal){
                  if (this.device.tray_status === 1) {
                      this.addPopup({
                          id: Date.now(),
                          type: true,
                          device: this.device.name,
                          location: "корпус: " + this.device.build + " кабинет: " + this.device.office,
                          message: "Заканчивается бумага в лотке № 2"
                      });
                  }
                  if (this.device.tray_status === 2) {
                      this.addPopup({
                          id: Date.now(),
                          type: true,
                          device: this.device.name,
                          location: "корпус: " + this.device.build + " кабинет: " + this.device.office,
                          message: "Заканчивается бумага в лотке № 3"
                      });
                  }
                  if (this.device.tray_status === 3) {
                      this.addPopup({
                          id: Date.now(),
                          type: true,
                          device: this.device.name,
                          location: "корпус: " + this.device.build + " кабинет: " + this.device.office,
                          message: "Заканчивается бумага в лотках № 2 и 3"
                      });
                  }
              }
          },
          toner_alarm: function(newVal) {
              if(newVal) {
                  if (!this.device.type) {
                      if (+this.device.result.black_toner[3] < 2) {
                          this.addPopup({
                              id: Date.now(),
                              type: true,
                              device: this.device.name,
                              location: "корпус: " + this.device.build + " кабинет: " + this.device.office,
                              message: "Заканчивается чёрный тонер"
                          });
                      }
                  } else {
                      if (+this.device.result.black_toner[3] < 2) {
                          this.addPopup({
                              id: Date.now(),
                              type: true,
                              device: this.device.name,
                              location: "корпус: " + this.device.build + " кабинет: " + this.device.office,
                              message: "Заканчивается чёрный тонер"
                          });
                      }
                      if (+this.device.result.red_toner[3] < 2) {
                          this.addPopup({
                              id: Date.now(),
                              type: true,
                              device: this.device.name,
                              location: "корпус: " + this.device.build + " кабинет: " + this.device.office,
                              message: "Заканчивается красный тонер"
                          });
                      }
                      if (+this.device.result.yellow_toner[3] < 2) {
                          this.addPopup({
                              id: Date.now(),
                              type: true,
                              device: this.device.name,
                              location: "корпус: " + this.device.build + " кабинет: " + this.device.office,
                              message: "Заканчивается красный тонер"
                          });
                      }
                      if (+this.device.result.cyan_toner[3] < 2) {
                          this.addPopup({
                              id: Date.now(),
                              type: true,
                              device: this.device.name,
                              location: "корпус: " + this.device.build + " кабинет: " + this.device.office,
                              message: "Заканчивается красный тонер"
                          });
                      }
                  }
              }else{
                  this.addPopup({
                      id: Date.now(),
                      type: false,
                      device: this.device.name,
                      location: "корпус: " + this.device.build + " кабинет: " + this.device.office,
                      message: "Картридж заменён"
                  });
              }
          },
            device_off: function(newVal) {
                if (this.device.convenience) {
                    if (newVal) {
                        this.addPopup({
                            id: Date.now(),
                            type: false,
                            device: this.device.name,
                            location: "корпус: " + this.device.build + " кабинет: " + this.device.office,
                            message: "Устройство доступно"
                        });
                    } else {
                        this.addPopup({
                            id: Date.now(),
                            type: true,
                            device: this.device.name,
                            location: "корпус: " + this.device.build + " кабинет: " + this.device.office,
                            message: "Устройство недоступно"
                        });
                    }
                }
            },
        },
        methods: {
            ...mapActions(['fetchGraphs']),
            ...mapMutations(['addPopup']),
            mouseOver: function () {
                clearTimeout(this.myVar);
                this.myVar = setTimeout(() => {
                    this.active = true;
                    this.fetchGraphs([this.device.name, this.year])
                }, 500)
            },
            mouseOut: function () {
                clearTimeout(this.myVar);
                this.myVar = setTimeout(() => this.active = false, 500)
            },
            toner_level: function(curr, max) {
                if(curr>0) {
                    return 100 * curr / max;
                }else{
                    return 0;
                }
            },
            changeOpacity: function(field) {
                if (this.device[field]){
                    return true
                } else {
                    return false
                }

            },
            start_toner_alarm: function() {

                    if (!this.device.type) {
                        if (+this.device.result.black_toner[3] < 2) {
                            this.addPopup({
                                id: Date.now(),
                                type: true,
                                device: this.device.name,
                                location: "корпус: " + this.device.build + " кабинет: " + this.device.office,
                                message: "Заканчивается чёрный тонер"
                            });
                        }
                    } else {
                        if (+this.device.result.black_toner[3] < 2) {
                            this.addPopup({
                                id: Date.now(),
                                type: true,
                                device: this.device.name,
                                location: "корпус: " + this.device.build + " кабинет: " + this.device.office,
                                message: "Заканчивается чёрный тонер"
                            });
                        }
                        if (+this.device.result.red_toner[3] < 2) {
                            this.addPopup({
                                id: Date.now(),
                                type: true,
                                device: this.device.name,
                                location: "корпус: " + this.device.build + " кабинет: " + this.device.office,
                                message: "Заканчивается красный тонер"
                            });
                        }
                        if (+this.device.result.yellow_toner[3] < 2) {
                            this.addPopup({
                                id: Date.now(),
                                type: true,
                                device: this.device.name,
                                location: "корпус: " + this.device.build + " кабинет: " + this.device.office,
                                message: "Заканчивается желтый тонер"
                            });
                        }
                        if (+this.device.result.cyan_toner[3] < 2) {
                            this.addPopup({
                                id: Date.now(),
                                type: true,
                                device: this.device.name,
                                location: "корпус: " + this.device.build + " кабинет: " + this.device.office,
                                message: "Заканчивается синий тонер"
                            });
                        }
                    }
            },
            start_paper: function() {
                if (this.device.convenience) {
                    if (this.device.tray_status === 1) {
                        this.addPopup({
                            id: Date.now(),
                            type: true,
                            device: this.device.name,
                            location: "корпус: " + this.device.build + " кабинет: " + this.device.office,
                            message: "Заканчивается бумага в лотке № 2"
                        });
                    }
                    if (this.device.tray_status === 2) {
                        this.addPopup({
                            id: Date.now(),
                            type: true,
                            device: this.device.name,
                            location: "корпус: " + this.device.build + " кабинет: " + this.device.office,
                            message: "Заканчивается бумага в лотке № 3"
                        });
                    }
                    if (this.device.tray_status === 3) {
                        this.addPopup({
                            id: Date.now(),
                            type: true,
                            device: this.device.name,
                            location: "корпус: " + this.device.build + " кабинет: " + this.device.office,
                            message: "Заканчивается бумага в лотках № 2 и 3"
                        });
                    }
                }
            },
            device_off: function(l) {
                if(this.device.statusl){
                    this.addPopup({
                        id: Date.now(),
                        type: false,
                        device: this.device.name,
                        location: "корпус: " + this.device.build + " кабинет: " + this.device.office,
                        message: "Устройство доступно"
                    });
                }else{
                    this.addPopup({
                        id: Date.now(),
                        type: true,
                        device: this.device.name,
                        location: "корпус: " + this.device.build + " кабинет: " + this.device.office,
                        message: "Устройство недоступно"
                    });
                }
            },
            addYear: function() {
                this.year = this.year + 1
            },
            delYear: function() {
                this.year = this.year - 1
            },
        },
        created() {
            this.attentions[0].opacity = this.toner_alarm;
            this.attentions[1].opacity = this.snmp_error;
            this.attentions[2].opacity = this.paper;
            this.start_toner_alarm();
            this.start_paper();
        },
        beforeUpdate() {
            this.attentions[0].opacity = this.toner_alarm;
            this.attentions[1].opacity = this.snmp_error;
            this.attentions[2].opacity = this.paper;
        }
    }
</script>

<style scoped>
    .card {
        font-family: playregular;
        position: relative;
        margin: 20px 0;
        width: 420px;
        height: 350px;
        transform-style: preserve-3d;
        transform: perspective(2000px);
        transition: 1s;
        box-shadow: inset 300px 0 50px rgba(0, 0, 0, 0.5);
        border-radius: 0 5px 5px 0;
        background: #fff;
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

        opacity: 1;
        border-radius: 0 5px 5px 0;
    }

    .card .card-front .card-body {
        font-size: 0.8em;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: left;
        min-height: 285px;
    }

    .card .card-front .card-title {
        font-family: playbold;
        text-transform: uppercase;
        transition: 1s;
        margin-top: 10px;
        margin-left: 20px;
        text-align: left;
        letter-spacing: 0.05rem;
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
        left: 0px;
        bottom: 0px;
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
    .card:hover .card-front H2 {
        transform: rotateY(-180deg);
        transition: 1s;
        text-align: center;
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

    .card .details .title {
        display: flex;
        justify-content: space-around;
        vertical-align: middle;
        align-content: center;
        align-items: center;
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
    .card:hover .details a {
        position: relative;
        width: 20px;
        height: 20px;
        display: flex;
        text-align: center;
        align-content: center;
        align-items: center;
        justify-content: center;
        margin: 0 2px;
        border-radius: 50%;
        padding: 6px;
        box-sizing: border-box;
        text-decoration: none;
        box-shadow: 0 5px 10px rgba(0,0,0,0.3);
        transition: 1s;
        pointer-events: all;
        background-color: white;
        border: 1px solid #cccccc;
    }
    .graph {
        width: 100%;
        height: 220px;
        margin-bottom: 45px;
    }
    .line {
        float: left;
    }
    .inline {
        display: contents;
        margin: 0px;
        padding: 0px;
    }
    .disabled{
        background-color: #cccccc;
    }
    .enabled{
        background-color: #ffffff;
    }
</style>