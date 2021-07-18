import { encode, decode } from 'encoderr'
import { TranspositionCipher } from './transCol'

const vlada = new TranspositionCipher()

export const encoding = {
    caesar: ([alpha, text, moves]) => {
        moves = Number.parseInt(moves)
        if (!moves || moves < 1) return 'Number Required'
        return encode.caesarEncode(alpha, text, moves)
    },

    vigenere: ([alpha, text, key]) => {
        if (key.length < 1) return 'Alpha String Required'
        return encode.vigenereEncode(alpha, text, key)
    },

    zigzag: ([_, text, cols]) => {
        cols = Number.parseInt(cols)
        if (!cols || cols < 1) return 'Number Required'
        return encode.zigzagEncode(text, cols)
    },

    mono: ([alpha, text, alphaCrypt]) => {
        if (alpha.length !== alphaCrypt.length) return "Alpha(s) don't Match"
        return encode.monoEncode(alpha, text.toLowerCase(), alphaCrypt)
    },

    series: ([_, text]) => {
        let { arrayIndex, code } = encode.seriesEncode(text)
        sessionStorage.setItem('series', JSON.stringify(arrayIndex))
        return code
    },

    col: ([_, text, key]) => {
        if (key.length < 1) return 'Alpha String Required'
        return encode.columnEncode(text, key)
    },

    row: ([_, text, key]) => {
        if (key.length < 1) return 'Alpha String Required'
        return encode.rowEncode(text.toLowerCase(), key)
    },

    colNum: ([_, text, key]) => {
        key = Number.parseInt(key)
        if (!key || key < 1) return 'Number Required'
        return vlada.cipherText(text, key)
    }
}

export const decoding = {
    caesar: ([alpha, text, moves]) => {
        moves = Number.parseInt(moves)
        if (!moves && moves !== 0) return 'Number Required'
        return decode.caesarDecode(alpha, text, moves)
    },
    vigenere: ([alpha, text, key]) => {
        if (key.length < 1) return 'Alpha String Required'
        return decode.vigenereDecode(alpha, text, key)
    },
    zigzag: ([_, text, cols]) => {
        cols = Number.parseInt(cols)
        if (!cols || cols < 1) return 'Number Required'
        return decode.zigzagDecode(text, cols)
    },
    mono: ([alpha, text, alphaCrypt = alpha2]) => {
        if (alpha.length !== alphaCrypt.length) return "Alpha(s) don't Match"
        return decode.monoDecode(alpha, text.toLowerCase(), alphaCrypt)
    },
    series: ([_, text]) => {
        let arrayIndex = sessionStorage.getItem('series')
        if (!arrayIndex) return 'Needing encode First For Matching'
        return decode.seriesDecode(text, JSON.parse(arrayIndex))
    },
    col: ([alpha, text, key]) => {
        if (key.length < 1 || alpha.length < 1) return 'Alpha String Required'
        return decode.columnDecode(text, key)
    },

    row: ([alpha, text, key]) => {
        if (key.length < 1 || alpha.length < 1) return 'Alpha String Required'
        return decode.rowDecode(text.toLowerCase(), key)
    },

    colNum: ([_, text, key]) => {
        key = Number.parseInt(key)
        if (!key || key < 1) return 'Number Required'
        return vlada.decrypyText(text, key)
    }
}

export const labelCoding = {
    mono: '🔐 alpha',
    series: '🚫‼️',

    zigzag: '🧱 cols',
    caesar: '📐 moves',
    vigenere: '🔑 key',
    col: '🔑 key',
    row: '🔑  key',
    colNum: '🔑 keyNum',
}