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
        invisibleFileInput: $('.fileInput'),
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
                app.openFile()
                console.log('function completed: openFile')
            })
        
            app.aboutBtn.on('click', () => {
                app.notePad.val('about')
            })

            app.downloadBtn.on('click', () => {
                app.downloadLink()
            })

            app.invisibleFileInput.on('change', (e) => {
                if(app.isFileAPISupported()){
                    let file = e.target.files[0]
                    if(file){
                        let fr = new FileReader()
                        fr.onload = (e) => {
                            let content = e.target.result
                            app.notePad.val(content)
                        }
                        fr.readAsText(file)
                    }
                }
            })
        },

        isFileAPISupported: () => {
            if(window.File && window.FileReader && window.FileList){
                return true
            }else{
                window.alert('File uploads are not supported by your browser.' + 
                                'Please update your browser to allow file uploads.')
                return false
            }
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
        },

        openFile: () => {
            app.invisibleFileInput.trigger('click')
        }   
        
    }

    app.init()

    //global to be removed for final application
    window.App = app

})