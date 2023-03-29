/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let obj = {}
    let arr = this.words
    for (let i = 0; i < arr.length; i++) {
      if (!obj[arr[i]]) {
        i === arr.length - 1 ? obj[arr[i]] = [null] : obj[arr[i]] = [arr[i + 1]]
      } else {
        arr[i + 1] === undefined ? obj[arr[i]].push(null) : obj[arr[i]].push(arr[i + 1])
      }
    }
    this.chains = obj
  }

  /**Pick a random word  from array */
  static choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let keys = Array.from(this.chains.keys())
    let key = MarkovMachine.choice(keys)
    let out = []

    while (out.length < numWords && key !== null) {
      out.push(key)
      key = MarkovMachine.choice(keys)
    }
    return out.join(" ")
  }
}

module.exports = MarkovMachine;
