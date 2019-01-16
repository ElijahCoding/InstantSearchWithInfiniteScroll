<template>
  <div>
    <ais-index
        index-name="articles"
        :search-store="searchStore"
    >
      <div class="field">
        <ais-input
            class="input"
            placeholder="Search articles"
            id="search"
        />
      </div>

      <template v-if="searchIsntEmpty">
        <ais-results
            :stack="true"
            :results-per-page="10"
        >
          <template slot-scope="{ result }">
            <div class="box">
              <h1 class="title">
                {{ result.title }}
              </h1>
              <p>{{ result.teaser }}</p>
            </div>
          </template>
        </ais-results>

        <ais-no-results>
          Hmm, no results
        </ais-no-results>

        <AppLoader
            v-if="this.searchStore.results.length"
            v-observe-visibility="{
              callback: incrementPage,
              throttle: 500
            }"
        />

      </template>
    </ais-index>
  </div>
</template>

<script>
import AppLoader from '@/components/AppLoader'
import { createFromAlgoliaCredentials } from 'vue-instantsearch'

export default {
  components: {
    AppLoader
  },

  data () {
    return {
      searchStore: null
    }
  },

  computed: {
    searchIsntEmpty () {
      if (!this.searchStore) {
        return false
      }

      return this.searchStore._helper.state.query.length > 0
    }
  },

  methods: {
    incrementPage (visible) {
      if (visible) {
        const params = this.searchStore.queryParameters

        this.searchStore.queryParameters = Object.assign({}, params, {
          page: params.page + 1
        })

        this.searchStore.refresh()
      }
    }
  },

  watch: {
    'searchStore.query' (value) {
      this.$router.replace({
        query: {
          q: value
        }
      })
    }
  },

  created () {
    this.searchStore = createFromAlgoliaCredentials(
      'WMW72T6RLI',
      '43d16e02844e04deb0abb99e937c0fee'
    )

    this.searchStore.queryParameters = {
      page: 1
    }
  }
}
</script>
