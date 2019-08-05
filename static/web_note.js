$(document).ready(() => {

    const app = {
        menu: $('.itemWrapper'),
        saveBtn: $('.save'),
        openBtn: $('.open'),
        aboutBtn: $('.about'),
        downloadBtn: $('.download'),
        notePad: $('.note'),
        jlink: '',
        downloadAvailable: false,
        textData: '',

        init: () => {
            app.textData = app.notePad.val()

            app.saveBtn.on('click', () => {
                if(app.hasUpdates(app.notePad.val()) && !app.downloadAvailable){
                    app.downloadLink()
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

        downloadLink: () => {
            app.textData = app.notePad.val()
            app.downloadBtn.attr('href', `data:text/plain;charset=utf-8,${encodeURIComponent(app.textData)}`)
            app.downloadBtn.attr('download', 'test.txt')
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