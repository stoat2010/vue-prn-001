<template>
    <div class="back">
        <div class="front">
            <div class="form">
                <h2>Добавить устройство</h2>
                <div class="form__group field">
                    <input type="input" class="form__field" placeholder="F.Q.D.N." name="name" id='name' v-model="add_body.name" required />
                </div>
                <div class="select">
                    <select name="slct" id="slct" v-model="add_body.template">
                        <option selected disabled>Шаблон опроса устройства</option>
                        <option v-for="template in this.allTemplates" v-bind:value='template.name[0]'>{{template.text}}</option>
                    </select>
                </div>
                <div class="select">
                    <select name="type" id="type" v-model="add_body.type">
                        <option selected v-bind:value=false>Монохромный</option>
                        <option v-bind:value=true>Цветной</option>
                    </select>
                </div>
                <div class="btns">
                    <a href="#" id="submit" v-on:click.prevent="()=>{addDev(add_body);toggleBlur(getBlur)}">ДОБАВИТЬ</a>
                    <a href="#" id="clear" v-on:click.prevent="clearFrm()">ОЧИСТИТЬ</a>
                    <a href="#" id="close" v-on:click.prevent="toggleBlur(getBlur)">ЗАКРЫТЬ</a>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "Addfrm",
        data() {
            return {
                add_body: {
                    name: '',
                    template: '',
                    type: false,
                },
            }
        },
        computed: {
            ...mapGetters(['allTemplates', 'getBlur']),
        },
        methods: {
            ...mapMutations(['toggleBlur']),
            ...mapActions(['fetchTemplates', 'addDev']),
            clearFrm: function() {
                this.add_body.name = ''
                this.add_body.template = ''
                this.add_body.type = false
            }
        },
        mounted() {
            this.fetchTemplates()
        }
    }
</script>

<style scoped>
    .back {
        width: 600px;
        height: 450px;
        background-color: rgb(49,51,53);
        color: white;
        position: fixed;
        left: 50px;
        top: 80px;
        z-index: 100;
        filter: none;
        border-radius: 10px;
        box-shadow: 0 15px 30px rgba(0,0,0,0.7);
    }
    .back .front {
        width: 580px;
        height: 430px;
        position: fixed;
        top: 6px;
        left: 6px;
        background-color: rgb(49,51,53);
        color: white;
        position: relative;
        margin: 0;
        z-index: 100;
        filter: none;
        border-radius: 10px;
        border: 4px solid #cccccc;
    }
    .back .front .btns {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80%;
        flex-direction: row;
        margin-top: 40px;
    }
    #submit {
        background-color: rgb(50,251,107);
        color: #2c3e50;
    }
    #clear {
        background-color: rgb(239,176,44);
        color: white;
    }
    #close {
        background-color: rgb(187,29,21);
        color: white;
    }
    .back .front a {
        position: relative;
        padding: 10px 20px;
        display: inline-block;
        margin-top: 20px;
        text-decoration: none;
        background-color: rgb(242,242,242);
        color: black;
        border-radius: 5px;
        font-size: 0.7rem;
    }
    .form {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .form__group {
        position: relative;
        padding: 15px 0 0;
        margin-top: 10px;
        width: 80%;

    }

    .form__field {
        font-family: inherit;
        width: 100%;
        border: 0;
        border-bottom: 2px solid #9b9b9b;
        outline: 0;
        font-size: 1.3rem;
        color: white;
        padding: 7px 0;
        background: transparent;
        transition: border-color 0.2s;
    }

    .form__field:focus {
        color: #ffffff;
        padding-bottom: 6px;
        border-width: 3px;
        border-image: linear-gradient(to right, #aaaaaa,#eeeeee);
        border-image-slice: 1;
    }
    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        appearance: none;
        outline: 0;
        box-shadow: none;
        border: 0 !important;
        background: #9b9b9b;
        background-image: none;

    }
    /* Remove IE arrow */
    select::-ms-expand {
        display: none;
    }
    /* Custom Select */
    .select {
        margin-top: 40px;
        position: relative;
        display: flex;
        width: 80%;
        height: 3em;
        line-height: 3;
        background: #9b9b9b;
        overflow: hidden;
        border-radius: 5px;

    }
    select {
        flex: 1;
        padding: 0 .5em;
        color: #fff;
        cursor: pointer;

    }
    /* Arrow */
    .select::after {
        content: '\25BC';
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 1em;
        background: #9b9b9b;
        cursor: pointer;
        pointer-events: none;
        -webkit-transition: .25s all ease;
        -o-transition: .25s all ease;
        transition: .25s all ease;

    }
    /* Transition */
    .select:hover::after {
        color: #f39c12;
    }
</style>