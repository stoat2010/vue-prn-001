<template>
    <div class="bar">
        <ul>
            <Button v-for="(btn) in this.buttons" :key="btn.id" v-bind:svg="btn.svg" :opacity="btn.opacity"></Button>
        </ul>
    </div>
</template>

<script>

    import Button from './Button'

    export default {
        name: "Btnbar",
        props: ["buttons"],
        components: {Button}
    }
</script>

<style scoped>
    .bar {
        width: 100%;
        transition: 1s;
        display: flex;
        justify-content: center;
        flex-direction: column-reverse;
    }
    ul {

        width: 100%;
        height: 50px;
        margin-left: 20px;
        margin-right: 20px;
        padding: 0;
        display: flex;
        pointer-events: none;
    }

</style>