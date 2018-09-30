    import {
      ExcelReader
    } from 'ika-helpers'

    import { Table } from '..'

    test('load with no error', () => {
      return ExcelReader
        .load('./source/test/test.xlsx')
        .then((data) => {
          const ws = data.getWorksheet(data.worksheets[0].id)
          return new Table(ws)
        })
        .then(table => table.records.length)
        .then(recordsCount => expect(recordsCount).toBe(4))
        .catch(e => console.log('Load file failed'.green, e))
    })
