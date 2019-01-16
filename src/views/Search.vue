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
    </ais-index>
  </div>
</template>

<script>
import { createFromAlgoliaCredentials } from 'vue-instantsearch'

export default {
  data () {
    return {
      searchStore: null
    }
  },

  created () {
    this.searchStore = createFromAlgoliaCredentials(
      'WMW72T6RLI',
      '43d16e02844e04deb0abb99e937c0fee'
    )

    console.log(this.searchStore);
  }
}
</script>
