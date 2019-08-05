$(document).ready(() => {

    const app = {
        menu: $('.itemWrapper'),
        saveBtn: $('.save'),
        openBtn: $('.open'),
        aboutBtn: $('.about'),
        downloadBtn: $('.download'),
        notePad: $('.note'),
        fileNamePopup: $('.fileNameInput'),
        fileNameBox: $('.fileNameBox'),
        fileNameButton: $('.fileNameButton'),
        fileNameCancelButton: $('.fileNameCancelButton'),
        jlink: '',
        downloadAvailable: false,
        textData: '',

        init: () => {
            app.textData = app.notePad.val()

            let x = window.innerWidth / 5
            let y = window.innerHeight / 3

            app.fileNamePopup.offset({
                left: x,
                top: y
            })

            app.fileNameButton.on('click', () => {
                app.fileNamePopup.addClass('hidden')
                app.downloadLink(app.fileNameBox.val())
                app.fileNameBox.val('')
            })

            app.fileNameCancelButton.on('click', () => {
                app.fileNameBox.val('')
                app.fileNamePopup.addClass('hidden')
            })

            app.saveBtn.on('click', () => {
                if(app.hasUpdates(app.notePad.val()) && !app.downloadAvailable){
                    app.fileNamePopup.removeClass('hidden')
                }
            })
        
            app.openBtn.on('click', () => {
                app.notePad.val('open')
            })
        
            app.aboutBtn.on('click', () => {
                app.notePad.val('about')
            })

            app.downloadBtn.on('click', (e) => {
                app.downloadLink()
            })
        },

        downloadLink: (fileName) => {
            app.textData = app.notePad.val()
            app.downloadBtn.attr('href', `data:text/plain;charset=utf-8,${encodeURIComponent(app.textData)}`)
            app.downloadBtn.attr('download', fileName)
            app.toggleMenuGrid()
        },

        hasUpdates: (currentText) => {
            if(currentText===app.textData){
                console.log('no updates')
                return false
            }else{
                console.log('text has been updated')
                return true
            }
        },

        toggleMenuGrid: () => {
            app.downloadBtn.toggleClass('hidden')
            if(!app.downloadAvailable){
                app.menu.removeClass('menuItemWrapper')
                app.menu.addClass('menuItemWrapperWithDownload')
                app.downloadAvailable = true
            }else{
                app.menu.removeClass('menuItemWrapperWithDownload')
                app.menu.addClass('menuItemWrapper')
                app.downloadAvailable = false
            }
        }
        
    }

    app.init()

    window.App = app

})//end $('document').ready()