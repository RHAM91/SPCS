<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="cabecera_modal">
                <b-button type="button" variant="outline-danger" @click="cerrar" size="sm">Cerrar</b-button>
            </div>
            <b-container fluid="">
                <b-row>
                    <b-col sm="12" class="mt-3">
                        <b-form-input type="text" id="campobuscarmiembro" v-model="campobuscarmiembro" @keyup.enter="buscar" placeholder="Escribe algo para buscar" size="sm"></b-form-input>
                    </b-col>
                    <b-col sm="12" class="mt-3">
                        <table class="table table-sm table-striped table-bordered" style="font-size: 12px;">
                            <thead>
                                <tr>
                                    <td style="width: 90%;">
                                        Nombre
                                    </td>
                                    <td style="width: 10%;text-align: center;">
                                        ...
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in resultados" :key="index">
                                    <td>
                                        {{item.nombre}}
                                    </td>
                                    <td style="text-align: center;">
                                        <b-button type="button" size="sm" variant="danger" @click="seleccion(item)"><i class="fas fa-check-square"></i></b-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'BuscarMiembro',
    data() {
        return {
            campobuscarmiembro: '',
            resultados: []
        }
    },
    methods: {
        cerrar(){
            this.$emit('salir')
        },
        async buscar(){

            let data = {
                api: `miembros/nombre/${this.campobuscarmiembro.toUpperCase()}`
            }

            let f = await this.getData(data)
            this.resultados = f
        },
        seleccion(cui){
            this.$emit('seleccion', cui)
            this.cerrar()
        },
        ...mapActions(['getData'])
    },
    mounted() {
        document.getElementById('campobuscarmiembro').focus()
    },
}
</script>

<style>

</style>