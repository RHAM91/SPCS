<template>
    <b-container fluid="">
        <b-row>
            <b-col sm="12" class="mt-3">
                <h3>
                    Buscar
                </h3>
            </b-col>
            <b-col sm="12" class="mt-3">
                <b-input-group size="sm">
                    <b-input-group-prepend is-text>
                        <b-icon icon="search"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input type="search" v-model="search" id="clie" size="sm" placeholder="Buscar" @keyup.enter="buscar" autocomplete="off"></b-form-input>
                </b-input-group>
            </b-col>
            <b-col sm="12" class="mt-3">
                <b-table class="table-bordered table-striped" :items="registros" :fields="fields" :per-page="perPage" :current-page="currentPage" small style="font-size: 12px;">
                    
                    <template v-slot:cell(dpi) = 'idp'>
                        <div style="height: 40px;display: flex; justify-content:center;align-items:center;">
                            {{idp.item.dpi}}
                        </div>
					</template>

                    <template v-slot:cell(nombre) = 'nome'>
                        <div style="display: flex;align-items:center;height: 40px;">
                            {{nome.item.nombre}}
                        </div>
					</template>

                    <template v-slot:cell(cargo) = 'dire'>
                        <div style="display: flex;align-items:center;justify-content:center;height: 40px;">
                            {{dire.item.cargo}}
                        </div>
					</template>

                    <template v-slot:cell(nombre_iglesia) = 'tel'>
                        <div style="display: flex;justify-content:center;align-items:center;height: 40px;">
                            {{tel.item.nombre_iglesia}}
                        </div>
					</template>
                    
                    <template v-slot:cell(btn) = 'row'>
                        <div style="display: flex; justify-content:center;align-items:center;height: 40px;">
                            <b-button type="button" size="sm" title="Ficha alumno" variant="warning" @click="abrir_modal_ficha(row.item.dpi)"><i class="fas fa-info-circle"></i></b-button>
                        </div>
					</template>

				</b-table>
                <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="my-table"
                ></b-pagination>

            </b-col>
        </b-row>

        <FichaMiembro v-if="modalficha" :dpi="item_miembro" v-on:salir="cerrar_modal_ficha" />

    </b-container>
</template>

<script>
import { mapActions } from 'vuex'
import { minix } from '@/components/functions/alertas'

import FichaMiembro from './FichaMiembro.vue'

export default {
    name: 'BuscarMiembro',
    components:{
        FichaMiembro
    },
    computed: {
        rows(){
            return 5
        }
    },
    data() {
        return {
            search: '',
            modalficha: false,
            item_miembro: '',

            registros: [],
            perPage: 15,
			currentPage: 1,
            fields: [
                {
                    key: 'dpi',
                    thStyle: 'width: 10%;text-align: center;',
                },
                {
                    key: 'nombre',
                    thStyle: 'width: 35%;',
                },
                {
                    key: 'cargo',
                    thStyle: 'width: 10%;text-align:center;'
                },
                {
                    key: 'nombre_iglesia',
                    thStyle: 'width: 35%;text-align:center;'
                },
                {
                    key: 'btn',
                    thStyle: 'width: 10%;text-align:center;'
                }
            ]

        }
    },
    methods: {
        async buscar(){
            // optimizar: se podría crear una ruta que solo devuelta el dpi, para que este se envie a la FichaMiembro.vue y alli si descargue toda la informacion segun el dpi
            if (this.search == '' || this.search == undefined) {
                minix({icon: 'info', mensaje: 'Escribe algo para buscar', tiempo: 3000})
                document.getElementById('clie').focus()
            }else{
                let data = {
                    api: `pastores/nombre/${this.search.toUpperCase()}`,
                }

                let r = await this.getData(data)
                this.registros = r
            }
        },
        abrir_modal_ficha(item){
            this.modalficha = true
            this.item_miembro = item
        },
        cerrar_modal_ficha(){
            this.modalficha = false
            this.search = ''
            document.getElementById('clie').focus()
            
        },
        ...mapActions(['getData'])
    },
    mounted() {
        document.getElementById('clie').focus()
    },
}
</script>

<style>

</style>