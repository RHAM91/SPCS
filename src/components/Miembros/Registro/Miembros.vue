<template>
    <b-container fluid="">
        <b-row>
            <b-col sm="12" class="mt-3">
                <h1>
                    Pastores
                </h1>
            </b-col>
            <b-col sm="12">
                <b-tabs content-class="mt-3">
                    <b-tab title="Registro Información general" @click="setSubModulo('InformacionGeneral')" active></b-tab>
                    <!-- <b-tab title="Registro datos Iglesia" id="modulo_1" :disabled="modulo_1"  @click="setSubModulo('DatosIglesia')" ></b-tab>
                    <b-tab title="Registro datos hijos" id="modulo_2" :disabled="modulo_2" @click="setSubModulo('DatosHijos')"></b-tab> -->
                </b-tabs>
            </b-col>
            
            <b-col sm="12" v-if="submodulo == 'InformacionGeneral'">
                <InformacionGeneral v-on:comprobacion="activacion" v-on:desactivar="desactivacion"/>
            </b-col>

            <b-col sm="12" v-if="submodulo == 'DatosIglesia'">
                <DatosIglesia v-on:comprobacion="activacion"/>
            </b-col>

            <b-col sm="12" v-if="submodulo == 'DatosHijos'">
                <DatosHijos />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

import InformacionGeneral from './InformacionGeneral.vue'
import DatosIglesia from './DatosIglesia.vue'
import DatosHijos from './DatosHijos.vue'

export default {
    name: 'Miembros',
    components: {
        InformacionGeneral,
        DatosIglesia,
        DatosHijos
    },
    data() {
        return {
            submodulo: 'InformacionGeneral',
            modulo_1: false, // dejar en true ambos
            modulo_2: false
        }
    },
    methods: {
        setSubModulo(sub){
            this.submodulo = sub
        },
        activacion(v){
            this[v] = false
        },
        desactivacion(v){
            this.modulo_1 = false
            this.modulo_2 = false
        }
    },
}
</script>

<style>

</style>