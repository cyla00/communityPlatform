<script>
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import {collapsed} from './state'

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
            collapsed,
        }
    }
}
</script>

<template>
    <router-link :to="to" class="link" :class="{active: isActive}">
        <i class="icon" :class="icon"/>
        <transition name="fade">
        <span v-if="!collapsed">
            <slot/>
        </span>
        </transition>
    </router-link>
</template>

<style>
    .fade-enter-active,
    .fade-leave-active{
        transition: opacity 0.1s;
    }

    .fade-enter,
    .fade-leave-to{
        opacity: 0;
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
        color: #ffffff;
        text-decoration: none;
    }

    .link:hover{
        background-color: rgba(77, 77, 209, 0.5);
        border-radius: 20px;
    }

    .link:active{
        background-color: rgba(77, 77, 209, 0.5);
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