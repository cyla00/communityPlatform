<script>
import {computed} from 'vue'
import {useRoute} from 'vue-router'

export default {
    props: {
        to: {type: String, required: true},
        icon: {type: String, required: true},
    },
    data(props){
        const route = useRoute()
        const isActive = computed(() => route.path === props.to)
        return {
            isActive,
        }
    }
}
</script>

<template>
    <router-link :to="to" class="link" :class="{active: isActive}">
        <i class="icon" :class="icon"/>
        <span>
            <slot/>
        </span>
    </router-link>
</template>

<style>

    :root{
        --btn-hover-bg: rgba(36, 81, 100, 0.5);
    }

    .link{
        display: flex;
        align-items: center;
        cursor: pointer;
        position: relative;
        font-weight: 400;
        user-select: none;
        margin: 1em 0;
        padding: 1em;
        border-radius: 0.25em;
        height: 1.5em;
        color: #F7FFFF;
        text-decoration: none;
    }

    .link:hover{
        background-color: var(--btn-hover-bg);
        border-radius: 20px;
    }

    .link:active{
        background-color: rgba(38, 193, 202, 0.5);
        border-radius: 20px;
    }

    .link .icon{
        flex-shrink: 0;
        width: 25px;
        margin-right: 10px;
    }
    span{
        padding-left: 0.5em;
    }
</style>