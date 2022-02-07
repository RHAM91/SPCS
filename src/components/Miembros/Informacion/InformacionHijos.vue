<template>
    <b-container fluid>
        <b-row v-if="mostrar_datos_hijos">
            <b-col sm="12" class="mt-3">
                <table class="table table-sm table-bordered table-striped" style="font-size: 11px;">
                    <thead>
                        <tr>
                            <th style="width: 65%">
                                Nombre
                            </th>
                            <th style="width: 20%;text-align: center;">
                                Fecha de nacimiento
                            </th>
                            <th style="width: 15%;text-align: center;">
                                Edad
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in hijos" :key="index">
                            <td>
                                {{item.nombre}}
                            </td>
                            <td style="text-align: center;">
                                {{item.fecha_de_nacimiento | nfecha}}
                            </td>
                            <td style="text-align: center;">
                                {{item.fecha_de_nacimiento | edad}} años
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>
        <NoEncontrado v-if="mostrar_datos_hijos == false" :titulo="'No se encontraron registros'" />
    </b-container>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'

import NoEncontrado from '@/components/others/NoEncontrado.vue'

export default {
    name: 'InformacionHijos',
    props: ['iMiembro'],
    components: {
        NoEncontrado
    },
    filters:{
        nfecha: function(val){
            return moment(val).format('DD/MM/YYYY')
        },
        edad: function(val){
            // const aactual = moment(Date.now()).format('YYYY')
            // return  aactual - moment(val).format('YYYY')
            const nacimiento = moment(val)
            const hoy = moment()
            return hoy.diff(nacimiento, 'years')
        }
    },
    data() {
        return {
            hijos:[],
            mostrar_datos_hijos: false
        }
    },
    methods: {
        async obtenerInfo(){
            let f = await this.getData({api: `miembros/c/datoshijos/${this.iMiembro.dpi}`})

            if(f.message){
                if (f.message == 'NO EXISTEN REGISTROS') {
                    this.mostrar_datos_hijos = false
                }
            }else{
                this.mostrar_datos_hijos = true
                this.hijos = f
            }

        },
        ...mapActions(['getData'])
    },
    mounted() {
        this.obtenerInfo()
    },
}
</script>

<style>

</style>