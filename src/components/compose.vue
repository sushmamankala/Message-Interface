<template>
  <div id="compose">
    <textarea
      class="userInput"
      name="input"
      v-model="message"
      @keyup="newSize($event)"
      id="userInput"
      :rows="rows"
      min-rows="1"
      max-rows="3"
    ></textarea>
    <button class="send" @click="sendMessage">Send</button>
  </div>
</template>
<script>
export default {
  name: "COMPOSECOMPONENT",
  components: {},
  props: [],
  data() {
    return {
      message: "",
      rows: 1,
      textAreaChar: null,
    };
  },
  methods: {
    sendMessage() {
      this.$emit("sendMessage", this.message);
      this.message = "";
      this.rows = 1;
    },
    newSize(eve) {
      if (!eve.shiftKey && eve.keyCode === 13) {
        this.sendMessage();
        eve.preventDefault();
        return;
      }
      const elem = eve.target;
      const maxRows = parseInt(elem.attributes["max-rows"].value, 10);
      const minRows = parseInt(elem.attributes["min-rows"].value, 10) || 2;
      const actualRows = parseInt(elem.rows, 10) || 2;
      let cols = parseInt(elem.cols, 10);

      if (isNaN(cols)) {
        cols = this.getCols(elem);
      }

      let text = elem.value;
      let lines = text.split("\n");

      let internalRows = 0;
      if (typeof lines === "object") {
        for (let i = 0; i < lines.length; i++) {
          internalRows += this.returnRows(lines[i], cols);
        }
      } else {
        internalRows = this.returnRows(lines, cols);
      }

      let newRows = 0;
      if (internalRows > maxRows) {
        newRows = maxRows;
      } else if (internalRows < minRows) {
        newRows = minRows;
      } else {
        newRows = internalRows;
      }

      if (actualRows != newRows) {
        this.rows = newRows;
      }
    },
    getCols(elem) {
      let cols = 10;
      if (elem) {
        const charWidth = this.getCharWidth(elem) || 8;
        const taWidth = this.getTextAreaWidth(elem);
        cols = parseFloat(taWidth) / parseFloat(charWidth);
      }
      return Math.floor(cols, 10);
    },
    getCharWidth(elem) {
      if (
        this.textAreaChar == undefined ||
        this.textAreaChar.charWidth == undefined
      ) {
        this.recalcTextAreaWidth(elem);
      }
      return parseFloat(this.textAreaChar.charWidth);
    },
    getTextAreaWidth(elem) {
      if (
        this.textAreaChar == undefined ||
        this.textAreaChar.scrollWidth == undefined
      ) {
        this.recalcTextAreaWidth(elem);
      }

      let taw = elem.offsetWidth;
      if (this.hasScrollBar(elem)) {
        taw = taw - this.textAreaChar.scrollWidth;
      }
      return taw;
    },
    returnRows(text, cols) {
      return Math.ceil((text.length + 1) / cols);
    },
    hasScrollBar(elem) {
      return elem.scrollHeight > elem.offsetHeight;
    },
    recalcTextAreaWidth(elem) {
      let fontSize = parseFloat(
        window.getComputedStyle(elem, null).getPropertyValue("font-size")
      );
      let fontFam = window
        .getComputedStyle(elem, null)
        .getPropertyValue("font-family");

      // Creating invisible container
      const outer = document.createElement("div");
      outer.style.visibility = "hidden";
      outer.style.overflow = "scroll"; // forcing scrollbar to appear
      outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
      document.body.appendChild(outer);

      // Creating inner element and placing it in the container
      const inner = document.createElement("div");
      const span = document.createElement("span");
      span.innerText = "w";
      span.style.fontSize = `${fontSize}px`;
      span.style.fontFamily = `${fontFam}`;
      outer.appendChild(inner);

      // Calculating difference between container's full width and the child width
      const scrollBarWidth = outer.offsetWidth - inner.offsetWidth;

      // Removing temporary elements from the DOM
      outer.parentNode.removeChild(outer);

      let charWidth = span.offsetWidth;

      this.textAreaChar = {
        charWidth: parseFloat(charWidth),
        scrollWidth: scrollBarWidth,
      };
      return this.textAreaChar;
    },
  },
};
</script>
<style scoped>
#compose {
  z-index: 1;
  display: flex;
  align-items: flex-end;
  margin-top: 10px;
}
.userInput {
  flex-grow: 1;
}
.send {
  height: max-content;
  margin-left: 5px;
}
</style>