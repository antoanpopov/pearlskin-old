module.exports = function(grunt) {

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        jshint: {
            gruntfile: {
                src: 'Gruntfile.js'
            },
            all: [
                'Gruntfile.js',
                'app/core/*.js'
            ],
            options: {
                reporter: require('jshint-stylish'),
                'bitwise': true,
                'camelcase': true,
                'curly': true,
                'eqeqeq': true,
                'es3': false,
                'forin': true,
                'freeze': true,
                'immed': true,
                'indent': 4,
                'latedef': 'nofunc',
                'newcap': true,
                'noarg': true,
                'noempty': true,
                'nonbsp': true,
                'nonew': true,
                'plusplus': false,
                'quotmark': 'single',
                'undef': true,
                'unused': false,
                'strict': false,
                'maxparams': 10,
                'maxdepth': 5,
                'maxstatements': 40,
                'maxcomplexity': 8,

                'asi': false,
                'boss': false,
                'debug': false,
                'eqnull': true,
                'esnext': false,
                'evil': false,
                'expr': false,
                'funcscope': false,
                'globalstrict': false,
                'iterator': false,
                'lastsemic': false,
                'laxbreak': false,
                'laxcomma': false,
                'loopfunc': true,
                'maxerr': false,
                'moz': false,
                'multistr': false,
                'notypeof': false,
                'proto': false,
                'scripturl': false,
                'shadow': false,
                'sub': true,
                'supernew': false,
                'validthis': false,
                'noyield': false,

                'browser': true,
                'node': true,

                'globals': {
                    'angular': false,
                    '$': false
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        uglify: {
            options: {
                mangle: true
            },
            angular: {
                files: {
                    'dist/angular.min.js': ['app/angular/angular.js']
                }
            }

        },
        ngAnnotate: {
            options: {
                singleQuotes: true,
                add: true,
                remove: true
            },
            clients: {
                files: {
                    'clients.list.ctrl.annotated.js': ['app/core/clients/clients.list.ctrl.js']
                }
            }
        },
        concat: {
            options: {
                separator: '\n'
            },
            angular:{
                src:[
                    'administration/libs/jquery/jquery.min.js',

                    'bower_components/moment/min/moment-with-locales.min.js',

                    'administration/libs/angular/angular.min.js',
                    'administration/libs/angular/angular-animate.min.js',
                    'administration/libs/angular/angular-cookies.min.js',
                    'administration/libs/angular/angular-resource.min.js',
                    'administration/libs/angular/angular-sanitize.min.js',
                    'administration/libs/angular/angular-touch.min.js',
                    'administration/libs/angular/angular-ui-router.min.js',
                    'administration/libs/angular/ngStorage.min.js',
                    'administration/libs/angular/ui-utils.js',
                    'administration/libs/angular/ui-bootstrap-tpls.min.js',

                    'administration/libs/angular/angular-translate-a.min.js',
                    'administration/libs/angular/angular-translate-loader-static-files.min.js',
                    'administration/libs/angular/angular-translate-storage-cookie.min.js',
                    'administration/libs/angular/angular-translate-storage-local.min.js',

                    'administration/libs/angular/angular-file-upload.min.js',

                    'administration/app/widgets/oclazyload/ocLazyLoad.js',

                    'node_modules/satellizer/satellizer.js',

                ],
                dest:'dist/app.src.js'
            },
            directives:{
                src: [
                    'app/common/directives/*.js'
                ],
                dest: 'dist/directives.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-ng-annotate');

    grunt.registerTask('default', ['concat:angular']);

};