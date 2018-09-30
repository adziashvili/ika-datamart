    import {
      TestManager,
      TestSet,
      ExcelReader
    } from 'ika-helpers'

    import { Table } from '..'

    const assert = require('assert')

    console.clear()

    function aeq(a, b) {
      return () => assert.equal(a, b)
    }

    function tableTestFactory() {
      const ts = new TestSet('Table')

      ExcelReader
        .load('./source/test/test.xlsx')
        .then((data) => {
          const ws = data.getWorksheet(data.worksheets[0].id)
          return new Table(ws)
        })
        .then(table => console.log('Load file success.'.green, table.records.length, 'loaded'))
        .catch(e => console.log('Load file failed'.green, e))

      ts.add('Parse simple excel', aeq('true', 'true'))
      return ts
    }

    const isSuccss = TestManager.runTestSets(
      [
        tableTestFactory
      ]
    )
    const msg = `\n Test completed ${isSuccss ? 'successfully' : 'with failure'}\n`
    console.log(msg)
