<template>
  <!--type="hover stripe border center"-->
  <table :class="type">
    <thead>
      <tr>
        <slot name="columns"></slot>
      </tr>
    </thead>
    <tbody>
      <slot name="tbody"></slot>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "grid",
  props: {
    type: String
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300");

* {
  font-family: "Roboto", sans-serif;
}

table {
  border-collapse: collapse;
  margin: 30px 10px;
  -webkit-box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.1);
}

td {
  padding: 10px 20px;
}

table:not(.stripe):not(.border) td {
  border: solid #eee;
  border-width: 1px 0px;
}

th {
  padding: 10px 20px;
  text-align: left;
  background: #48f;
  color: white;
}

.border {
  border: solid #aaa;
  border-width: 1px;
}

.border td,
.border th {
  border: solid #aaa;
  border-width: 1px 1px;
}

.center,
.center th {
  text-align: center;
}

.stripe tr {
  border: none;
}

.stripe tr:nth-child(even) {
  background-color: #f5f5f5;
}

.hover tr:hover {
  background-color: #d9e9f9;
}

/* Colors ***********************/
.green {
  background-color: #2ba;
}

.red {
  background-color: #f34;
}

.purple {
  background-color: #a6c;
}

.orange {
  background-color: #f82;
}

@media screen and (max-width: 600px) {
  table {
    display: block;
    margin: 30px 0px;
  }

  tbody {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    width: auto;
  }

  thead {
    float: left;
  }

  .border {
    border: none;
  }

  tbody tr {
    display: inline-block;
  }

  thead tr {
    display: block;
  }

  th {
    display: block;
    text-align: right;
    padding: 11px;
  }

  td {
    display: block;
    text-align: left;
  }
}
</style>
