<script>
  export let name;
  export let onClick = () => {};
</script>

<button class="gate" on:click={onClick} title="Click to change gate">
  {name}
</button>

<style>
  .gate {
    padding: 4px 8px;
    border: 1px solid #555;
    background: #2a2a2a;
    color: #fff;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .gate:hover {
    background: #1a5a99;
    border-color: #1a5a99;
  }
</style>
