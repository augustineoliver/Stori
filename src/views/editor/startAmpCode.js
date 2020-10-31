(function (j, a, b, c, d, e, i, k, loader, inspector, notify, buildTPL, recordActivity) {
    a = ((window.top == window.self || window.opener == null || (window.opener == window.top)) == false);
    if (a) return;
    c = {
        'Request': {},
        'width': 0,
        'height': 0,
        'slides': [],
        'libs': {
            'bg_colors': false,
            'bg_gradients': false,
            'fonts': false,
            'texts': false,
            'shapes': false,
            'buttons': false,
            'help': false,
            'emoji': false,
        },
        'pub_providers': [],
        'bg_gradients_string': {},
        'bg_textures_string': {},
        'bg_gradients_native': {},
        'shapeBlob': {},
        'zoomLevel': 50,
        'sceneReadyInit': false,
        'activeDrawHelperColor': '#000',
        'drawingShapes': {
            'circle': '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60.34" preserveAspectRatio="none" viewBox="0 0 60 60.34" style="width:100%;height:100%"><circle cx="30" cy="30" r="30"></circle></svg>',
            'line': '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="width:100%"><line x1="0" y1="0" y2="0" x2="100%" style="stroke:#000;stroke-width:2" /></svg>',
            'square': '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" width="25" height="25" viewBox="0 0 25 25" style="width:100%;height:100%"><rect y="0" x="0" width="100%" height="100%"></rect></svg>'
        },
        'defaultConfig': {'maxTextLimit': 0, 'maxSlideLimit': 0, 'maxObjectLimit': 25, 'maxDimensionLimit': 0}
    }
    c.ColorPalette = [];
    c.idCache = {};
    c.layerString = '<div class="view_slide_item"><div class="card-header p-0"><span class="fa fa-ellipsis-v pl-2 p-3"></span><span class="title h6">Slide 0</span><span class="fa fa-caret-down pl-2 p-3 float-right"></span></div><div class="card-block p-0"><div class="row"><div locked class="card col-12 d-block"><span class="fa-sort fa fa-stack"></span><span class="fa fa-adjust fa-stack"></span><span class="title">Background</span><span class="fa fa-caret-down float-right fa-stack"></span><div class="d-none"></div></div></div></div></div>'
    c.sessionKey = $.now();
    c.LastSaveStamp = c.sessionKey;
    c.currentScreen = 0;
    c.size_preset_groups = [{
        'title': 'editor_ui_strtsocial',
        'items': ['1024x512', '1080x1080', '1080x608', '1200x444', '1200x630', '1200x900', '1280x628', '1280x760', '1400x425', '1500x500', '1920x1080', '2560x1440', '600x1200', '851x315',]
    }, {
        'title': 'editor_ui_strtprnt',
        'items': ['120x600', '160x600', '200x200', '250x250', '300x1050', '300x250', '300x600', '320x50', '336x280', '468x60', '728x90', '970x250', '970x90',]
    }]
    c.domWindow = $(window);
    c.domDocBody = $(document.body);
    c.domEditorBase = $('#editor_base');
    c.domEditorHeader = $('#editor_subheader').addClass('fancyscroll over');
    c.domEditorConfigToggle = c.domEditorHeader.find('#editor_config_toggle')
    c.domEditorFooter = $('#wrapper_slide_viewport > div.card-footer');
    c.domStage = $('#wrapper_slide_viewport > div.card:first');
    c.domSidebarToggle = $('#object_toggler').addClass('fancyscroll over');
    c.domSidebarToggleLinks = c.domSidebarToggle.find('ul.ae-main-menu > li')
    c.domSidebarWrapper = $('.ae-list-w:first').addClass('fancyscroll');
    c.domSidebarHeader = c.domSidebarWrapper.find(' > .card-header:first > span.h6:first')
    c.domStageViewport = c.domStage.parent('#wrapper_slide_viewport');
    c.domLibraryContainers = c.domSidebarWrapper.find('#objectpack  div[id^=objectpack_]').addClass('d-none');
    c.domCanvas = c.domStageViewport.find('#viewport_stage_wrapper').removeClass('center');
    c.domStatus = $('#workstation_status');
    c.domStatusCountWrapper = $('#workstation_counts');
    c.domStatusSize = c.domStatusCountWrapper.find('span.size');
    c.domZoom = c.domDocBody.find('#zoom_size_wrapper > div');
    c.domZoomFit = $(c.domZoom[3]).find('span:first');
    c.domZoomActual = $(c.domZoom[4]).find('span:first');
    c.domZoomOut = $(c.domZoom[0]).find('span:first');
    c.domZoomIn = $(c.domZoom[2]).find('span:first');
    c.domStatusSlides = c.domStatusCountWrapper.find('span.slides');
    c.domStatusActiveSlide = c.domStatusCountWrapper.find('span.active_slide');
    c.domStatusLayers = c.domStatusCountWrapper.find('span.layers');
    c.domStatusSelected = c.domStatusCountWrapper.find('span.selected');
    c.domStatusActiveLayer = c.domStatusCountWrapper.find('span.layer_active');
    c.domStatusNetwork = $('#network_status');
    c.domStatusNetworkState = c.domStatusNetwork.find('span.connection_status');
    c.domStatusNetworkOthers = c.domStatusNetworkState.parent().next('div').find('span:first')
    c.domEditorSubHeader = $('#sub-toolbar');
    c.domSizePresets = c.domEditorSubHeader.find('select#stage_general_config_sp');
    c.domSidebar = $('#wrapper_slide_groups');
    c.domScreenAdd = c.domSidebar.find('.card-header:first #wrapper_slide_add');
    c.domDrawingShapes = $('#drawing_tools');
    c.domSlidesWrapper = c.domSidebar.find('#view_slide_items');
    c.domSlidesGroupToggler = $('#slide_groups_toggler');
    c.domSlideTools = c.domStageViewport.find('#slide_toolbar_wrapper > button');
    c.domTitler = c.domDocBody.append('<div id="title_popover" class="fade"></div>').children(':last')
    c.domFooterTools = $('#footer_tools')
    c.domTimeline = $('#animation_timeline');
    c.domHelpWrapper = c.domStageViewport.nextAll('#wrapper_rightbar');
    c.domPropToggler = c.domHelpWrapper.find('ul > li a[href="#inspect_layer"]');
    c.domPropContent = c.domHelpWrapper.find('.tab-content:first')
    c.domPrivateDocBtn = c.domEditorSubHeader.find('div[data-tab=home] button#doc_toggle_private');
    c.domDroboxBtn = c.domEditorHeader.find('#editor_dropbox_toggle');
    c.domAssetsView = c.domLibraryContainers.filter('#objectpack_folders').find('> div:eq(2)');
    c.domMenuView = c.domLibraryContainers.filter('#objectpack_menu');
    c.maxSidebarWidth = 300;
    c.rightBarSeen = false;
    c.currentSelection = {};
    c.domGrid = $('<div class="d-none"><svg height="100%" width="100%" preserveAspectRatio="none"><defs><pattern id="grid" width="2%" height="5%"><rect width="20" height="20" stroke="grey" stroke-width="1" fill="none"></rect></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"></rect></svg></div>');
    c.domGrid.appendTo(c.domStage);
    c.guideLines = {};
    c.guideLines.wx = $('body > .guideBoxinfo.wx').get(0);
    c.guideLines.hx = $('body > .guideBoxinfo.hx').get(0);
    loader = '<figure class="pt-2 center"><img width="35" height="35" src="assets/img/oval.svg" /></figure>';
    c.svgEffects = {};
    c.svgEffects.saturate = []
    ns = 'http://www.w3.org/2000/svg';
    c.e = document.createElementNS(ns, 'feColorMatrix');
    c.e.setAttribute('type', 'saturate');
    c.e.setAttribute('values', '0');
    c.svgEffects.saturate.push(c.e);
    c.svgEffects.hue = [];
    c.e = $(c.e).clone().get(0);
    c.e.setAttribute('type', 'hueRotate');
    c.svgEffects.hue.push(c.e);
    c.svgEffects.brightness = [];
    c.e = $(c.e).clone().get(0);
    c.e.setAttribute('type', 'matrix');
    c.svgEffects.brightness.push(c.e);
    c.svgEffects.blur = [];
    c.e = document.createElementNS(ns, 'feGaussianBlur')
    c.e.setAttribute('stdDeviation', 0);
    c.svgEffects.blur.push(c.e);
    c.svgEffects.tear = [];
    c.e = document.createElementNS(ns, 'feTurbulence');
    c.e.setAttribute('type', 'fractalNoise');
    c.e.setAttribute('baseFrequency', '0.0');
    c.e.setAttribute('numOctaves', '1');
    c.svgEffects.tear.push(c.e);
    c.e = document.createElementNS(ns, 'feDisplacementMap');
    c.e.setAttribute('xChannelSelector', 'R');
    c.e.setAttribute('yChannelSelector', 'G');
    c.e.setAttribute('in', 'SourceGraphic');
    c.e.setAttribute('scale', '0');
    c.svgEffects.tear.push(c.e);
    c.svgEffects.shadow = [];
    c.e = document.createElementNS(ns, 'feOffset');
    c.e.setAttribute('dx', '0');
    c.e.setAttribute('dy', '0');
    c.svgEffects.shadow.push(c.e);
    c.e = $(c.svgEffects.blur[0]).clone().get(0);
    c.svgEffects.shadow.push(c.e);
    c.e = $(c.svgEffects.saturate[0]).clone().attr({'type': 'matrix'});
    c.svgEffects.shadow.push(c.e);
    c.e = document.createElementNS(ns, 'feComponentTransfer');
    c.a = c.e.appendChild(document.createElementNS(ns, 'feFuncR'));
    c.a.setAttribute('type', 'linear');
    c.a.setAttribute('Ue', '0');
    c.a.setAttribute('intercept', '0');
    c.a = c.e.appendChild(document.createElementNS(ns, 'feFuncG'));
    c.a.setAttribute('type', 'linear');
    c.a.setAttribute('Ue', '0');
    c.a.setAttribute('intercept', '0');
    c.a = c.e.appendChild(document.createElementNS(ns, 'feFuncB'));
    c.a.setAttribute('type', 'linear');
    c.a.setAttribute('Ue', '0');
    c.a.setAttribute('intercept', '0');
    c.a = c.e.appendChild(document.createElementNS(ns, 'feFuncA'));
    c.a.setAttribute('type', 'linear');
    c.a.setAttribute('xh', '0');
    c.a.setAttribute('slope', '0.6');
    c.svgEffects.shadow.push(c.e);
    c.e = document.createElementNS(ns, 'feComposite');
    c.e.setAttribute('operator', 'over');
    c.e.setAttribute('in2', 'fxshadow');
    c.e.setAttribute('in', 'SourceGraphic');
    c.svgEffects.shadow.push(c.e);
    c.svgEffects.Lgradient = [];
    c.e = document.createElementNS(ns, 'linearGradient');
    c.e.setAttribute('y1', '0');
    c.e.setAttribute('y2', '0');
    c.e.setAttribute('x1', '0');
    c.e.setAttribute('x2', '0');
    c.a = c.e.appendChild(document.createElementNS(ns, 'stop'));
    c.a.setAttribute('offset', '0');
    c.a.style.stopColor = '#000';
    c.svgEffects.Lgradient.push(c.e);
    c.svgEffects.Rgradient = [];
    c.e = document.createElementNS(ns, 'radialGradient');
    c.e.setAttribute('r', 0.75);
    c.e.setAttribute('cy', 0.5);
    c.e.setAttribute('cx', 0.5);
    c.e.setAttribute('fy', 0.5);
    c.e.setAttribute('fx', 0.5);
    c.e.appendChild($(c.a).clone().get(0));
    c.svgEffects.Rgradient.push(c.e);
    c.svgEffects.texture = [];
    c.e = document.createElementNS(ns, 'pattern');
    c.e.setAttribute('patternUnits', 'objectBoundingBox');
    c.e.setAttribute('x', '0');
    c.e.setAttribute('y', '0');
    c.e.setAttribute('width', '100%');
    c.e.setAttribute('height', '100%');
    c.svgEffects.texture.push(c.e);
    c.svgEffects.overlay = [];
    c.e = $(c.svgEffects.shadow[0]).clone().attr('in', 'SourceAlpha').get(0);
    c.svgEffects.overlay.push(c.e);
    c.e = $(c.svgEffects.shadow[3]).clone().attr('in', 'fxoverlay').get(0);
    c.svgEffects.overlay.push(c.e);
    c.e = $(c.svgEffects.shadow[4]).clone().attr({'in': 'fxoverlay', 'in2': 'SourceGraphic'});
    c.svgEffects.overlay.push(c.e);
    c.svgEffects.clip = [];
    c.e = $(c.svgEffects.shadow[4]).clone().attr({'in': 'SourceGraphic', 'in2': 'SourceGraphic'});
    c.svgEffects.clip.push(c.e);
    c.e = document.createElementNS(ns, 'feImage');
    c.e.setAttribute('x', 0);
    c.e.setAttribute('y', 0);
    c.e.setAttribute('href', '');
    c.svgEffects.clip.push(c.e);
    c.e = $(c.svgEffects.shadow[4]).clone().attr({'in': 'fxclip', 'in2': 'fxclipr', 'operator': 'out'});
    c.svgEffects.clip.push(c.e);
    c.svgEffects.mask = [];
    c.e = document.createElementNS(ns, 'mask');
    c.e.setAttribute('transform', 'matrix(1 0 0 1 0 0)')
    c.svgEffects.mask.push(c.e);
    c.svgEffects.noise = [];
    c.e = $(c.svgEffects.tear[0]).clone().get(0);
    c.e.setAttribute('seed', '2');
    c.e.setAttribute('stitchTiles', 'noStitch');
    c.svgEffects.noise.push(c.e);
    c.e = $(c.svgEffects.saturate[0]).clone().attr({
        'values': '-22 0 0 0 7  -22 0 0 0 7 -22 0 0 0 7 0 0 0 0 1',
        'type': 'matrix'
    }).get(0);
    c.svgEffects.noise.push(c.e);
    c.e = $(c.svgEffects.saturate[0]).clone().attr({
        'type': 'luminanceToAlpha',
        'in': 'fxnoise'
    }).removeAttr('values').get(0);
    c.svgEffects.noise.push(c.e);
    c.e = $(c.svgEffects.shadow[4]).clone().attr({'in': 'fxnoise', 'in2': 'SourceGraphic', 'operator': 'in'}).get(0);
    c.svgEffects.noise.push(c.e);
    c.domSvgNs = ns;
    c.svgEffectsList = {'shadow': {'x': 0, 'y': 0, 'color': '#000', 'spread': 0}}
    c.svgEffectsList.border = {'size': 0, 'color': '#000', 'offset': 0}
    c.svgEffectsList.opacity = 10;
    c.svgEffectsList.hue = 1;
    c.svgEffectsList.brightness = 1;
    c.svgEffectsList.saturation = 1;
    c.svgEffectsList.tear = {'smooth': 2, 'strength': 10};
    c.svgEffectsList.noise = {'strength': 0, 'color': '#000'};
    c.svgEffectsList.blur = 0;
    c.svgEffectsList.background = {'color': '#0000'};
    c.svgEffectsList.overlay = {'color': '#0000', 'opacity': 1};
    c.svgEffectsList.glow = {'color': '#FF4400', 'strength': 1, 'mode': 1};
    c.svgEffectsList.mask = {'mode': null, 'layer': '', 'x': 0, 'y': 0, 'width': 0, 'height': 0};
    c.svgEffectsList.customFx = {};
    c.svgButtonNs = 'M0 0 L 100 0 L100 50 L 0 50 Z';
    c.config_settings = {
        'privacy mode': [{'name': 'private', 'title': 'editor_ui_cf_toggle', 'type': 'checkbox'}],
        'transform': [{'name': 'lock_aspect', 'title': 'editor_ui_cf_lock', 'type': 'checkbox'}, {
            'name': 'snap_grid',
            'title': 'editor_ui_cf_snap',
            'type': 'checkbox'
        }],
        'animation': [{'name': 'delay', 'title': 'editor_ui_cf_delay', 'type': 'number'}, {
            'name': 'loop',
            'title': 'editor_ui_cf_loop',
            'type': 'text'
        }]
    }
    c.contextBuild = {};
    c.contextBuild.app = {
        'resize': {
            'name': 'editor_ui_rsz',
            'icon': 'fa-crop',
            'items': {'rz_auto': {'name': 'Screen size'}, 'rz_new': {'name': 'editor_ui_strtcs'}}
        },
        'start_tpl': {'name': 'editor_ui_ltmennwt', 'icon': 'fa-star text-info'},
        'start': {'name': 'editor_ui_ltmennwb', 'icon': 'fa-file-o'},
        'open': {'name': 'editor_ui_strtbrws', 'icon': 'fa-folder-open-o',},
        'Import': {
            'name': 'editor_ui_impgraph',
            'icon': 'fa-file-picture-o',
            'items': {
                'imp.image': {'name': 'Image', 'icon': 'fa-picture-o'},
                'imp.svg': {'name': 'Custom SVG', 'icon': 'fa-file-image-o'}
            }
        },
        'estore': {'name': 'Find in store', 'icon': 'fa-shopping-cart', 'disabled': true},
        'batch_d': {'name': 'Batch designer', 'icon': 'fa-puzzle-piece', 'visible': false,},
        'none': {'name': 'editor_ui_saveit', 'icon': 'fa-save'},
        'new': {'name': 'editor_ui_savenew', 'icon': 'fa-file-o'},
        'export': {
            'name': 'editor_ui_export',
            'icon': 'fa-cloud-download',
            'items': {
                'png': {'name': 'Image(png)', 'icon': 'fa-picture-o'},
                'mp4': {'name': 'MP4 video', 'icon': 'fa-film'},
                'gif': {'name': 'GIF animation', 'icon': 'fa-file-video-o'},
                'fra': {'name': 'Frames', 'icon': 'fa-file-video-o'},
                'pdf': {'name': 'PDF document', 'icon': 'fa-file-pdf-o'},
                'html': {'name': 'HTML5', 'icon': 'fa-html5'},
                'svg': {'name': 'SVG', 'icon': 'fa-html5'},
                'zip': {'name': 'Compressed', 'icon': 'fa-zip'}
            }
        },
        'colb': {
            'name': 'editor_ui_collab',
            'icon': 'fa-suitcase',
            'items': {
                'cb.shre': {'name': 'editor_ui_strtmenshr', 'icon': 'fa-send-o', 'disabled': false},
                'cb.invite': {'name': 'editor_ui_collabcli', 'icon': 'fa-user-plus'},
                'cb.outsource': {'name': 'editor_ui_collabouts', 'icon': 'fa-user-plus'}
            }
        },
        'embed': {'name': 'editor_ui_getlinks', 'icon': 'fa-file-code-o', 'visible': true,},
        'dwnl': {'name': 'editor_ui_dwnman', 'icon': 'fa-download'},
        'ext': {'name': 'editor_ui_ext', 'icon': 'fa-plug', 'items': {}},
        'zip': {'name': 'Export assets', 'icon': 'fa-file-zip-o', 'visible': false},
        'doc_meta': {'name': 'editor_ui_docprop', 'icon': 'fa-sticky-note-o'},
        'api_get': {'name': 'editor_ui_gapi', 'icon': 'fa-puzzle-piece'},
        'logout': {'name': 'editor_ui_logout', 'icon': 'fa-sign-out', 'visible': false,},
        'exit': {'name': 'editor_ui_exit', 'icon': 'fa-power-off', 'visible': true}
    }
    c.UserProfile = {
        "id": 94,
        "email": "webictbyleo@gmail.com",
        "membership": {
            "permit": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "59", "", "12", "13", "14", "15", "16", "18", "19", "36", "20", "21", "22", "23", "24", "25", "58", "63", "27", "28", "30", "31", "33", "34", "37", "38", "39", "40", "41", "64", "65", "43", "44", "60", "45", "47", "48", "50", "51", "52", "61", "54", "55", "56"],
            "name": "sudo",
            "value": 777
        },
        "name": "Leo Anthony"
    };
    c.languageConf = {
        "editor_ui_loading": "Loading",
        "editor_ui_csg": "Custom Graphics",
        "editor_ui_w": "Width",
        "editor_ui_h": "Height",
        "editor_ui_crbtn": "Create",
        "editor_ui_strtsocial": "Social media",
        "editor_ui_strtprnt": "Printables",
        "editor_ui_strttab1": "Choose templates",
        "editor_ui_strtcs": "Customize",
        "editor_ui_strtbrws": "Browse projects",
        "editor_ui_strtmenedit": "Edit",
        "editor_ui_strtmenshr": "Share",
        "editor_ui_del": "Delete",
        "editor_ui_open": "Open",
        "editor_ui_dwn": "Download",
        "editor_ui_cp": "Copy",
        "editor_ui_rsz": "Resize",
        "editor_ui_rn": "Rename",
        "editor_ui_cats": "Categories",
        "editor_ui_apply": "Apply",
        "editor_ui_ltmennwt": "New from template",
        "editor_ui_ltmennwb": "New project",
        "editor_ui_brwsp": "Browse projects",
        "editor_ui_impgraph": "Import Graphics",
        "editor_ui_saveit": "Save",
        "editor_ui_savenew": "Save new",
        "editor_ui_export": "Export",
        "editor_ui_collab": "Collaborate",
        "editor_ui_collabcli": "Add client",
        "editor_ui_collabouts": "Add outsourcer",
        "editor_ui_getlinks": "Get public links",
        "editor_ui_lazyload": "Load more",
        "editor_ui_lbmenfx": "Effects",
        "editor_ui_lbmenla": "Layers",
        "editor_ui_lbmenemo": "Emoji",
        "editor_ui_lbmenbg": "Background",
        "editor_ui_lbmentxt": "Texts",
        "editor_ui_lbmenbtn": "Buttons",
        "editor_ui_lbmenimg": "Images",
        "editor_ui_lbmenshp": "Shapes",
        "editor_ui_lbmenfold": "Folders",
        "editor_ui_lkwin_tx_edit": "Direct edit",
        "editor_ui_lkwin_tx_edit_tip": "Note: Access to private projects are not allowed",
        "editor_ui_lkwin_tx_prv": "Thumbnail preview",
        "editor_ui_lkwin_tx_grab": "Grab URL",
        "editor_ui_lkwin_tx_grab_tip": "Generate jpg format image on the fly",
        "editor_ui_gen": "Generate",
        "editor_ui_pdp": "Public download page",
        "editor_ui_pdp_tip": "Replace {format} with one of the supported formats",
        "editor_ui_lkwin_permtip": "Note: Access to private projects are denied",
        "editor_ui_dwnman": "Downloads manager",
        "editor_ui_ext": "Extensions",
        "editor_ui_docprop": "Document properties",
        "editor_ui_gapi": "Get API key",
        "editor_ui_logout": "Logout",
        "editor_ui_exit": "Exit",
        "editor_ui_palette": "Palette",
        "editor_ui_tx_stat": "Static",
        "editor_ui_tx_ani": "Animated",
        "editor_ui_bg_color": "Color",
        "editor_ui_bg_grad": "Gradient",
        "editor_ui_bg_pat": "Pattern",
        "editor_ui_search": "Search",
        "editor_ui_txt_allfd": "All folders",
        "editor_ui_txt_newfd": "New folder",
        "editor_ui_txt_animate": "Animate",
        "editor_ui_txt_fdshrhead": "Folder sharing options",
        "editor_ui_ac_connect": "Connect Account",
        "editor_ui_ac_disconnect": "Disconnect Account",
        "editor_ui_sync": "Sync",
        "editor_ui_drb_tip1": "Activate on export ?",
        "editor_ui_drb_tip2": "Note: When activated, local download is intercepted",
        "editor_ui_cf_head1": "Privacy mode",
        "editor_ui_cf_toggle": "Toggle on\/off",
        "editor_ui_cf_head2": "Transoform",
        "editor_ui_cf_lock": "Lock aspect",
        "editor_ui_cf_snap": "Snap to grid",
        "editor_ui_cf_head3": "Animation",
        "editor_ui_cf_delay": "Delay",
        "editor_ui_cf_loop": "Loop",
        "editor_ui_proptab_info": "Select a layer first",
        "editor_ui_proptab_1": "Properties",
        "editor_ui_proptab_2": "Appearance",
        "editor_ui_prop_lock": "Toggle Lock",
        "editor_ui_prop_imgupd": "Update Image",
        "editor_ui_prop_dimension": "Dimension",
        "editor_ui_prop_loopan": "Loop animation",
        "editor_ui_prop_pos": "Position",
        "editor_ui_prop_rotate": "Rotate",
        "editor_ui_prop_flip": "Flip",
        "editor_ui_prop_arrange": "Arrange",
        "editor_ui_prop_arrang_front": "Bring to front",
        "editor_ui_prop_arrang_forw": "Bring forward",
        "editor_ui_prop_arrang_back": "Send to back",
        "editor_ui_prop_arrang_backw": "Send backward",
        "editor_ui_prop_opacity": "Opacity",
        "editor_ui_selfont": "Select font",
        "editor_ui_selfonttype": "Select font variation",
        "editor_ui_lineh": "Line height",
        "editor_ui_wdspace": "Word spacing",
        "editor_ui_proptab1_info": "Click an effect below to modifiy",
        "editor_ui_cntxt_paste": "Paste",
        "editor_ui_cntxt_txtcon": "Convert to text",
        "editor_ui_cntxt_group": "Group",
        "editor_ui_cntxt_ungroup": "Ungroup",
        "editor_ui_cntxt_trim": "Trim",
        "editor_ui_cntxt_cpform": "Copy format",
        "editor_ui_cntxt_pform": "Paste format",
        "editor_ui_cntxt_clone": "Clone",
        "editor_ui_cntxt_fdsave": "Save to folder",
        "editor_ui_cntxt_fliph": "Flip horizontally",
        "editor_ui_cntxt_flipv": "Flip vertically",
        "editor_ui_cntxt_mask": "Apply mask",
        "editor_ui_cntxt_sizem": "Match size",
        "editor_ui_cntxt_sizem_h": "Same height",
        "editor_ui_cntxt_sizem_w": "Same width",
        "editor_ui_cntxt_sizem_all": "Same size",
        "editor_ui_cntxt_select": "Select all",
        "editor_ui_info_cpkey": "Copy your key to a safe place",
        "editor_ui_info_title": "Title",
        "editor_ui_info_author": "Author",
        "editor_ui_info_org": "Organisation",
        "editor_ui_info_tags": "Tags",
        "editor_ui_info_doch": "Document properties",
        "editor_ui_shrwin_head": "Project sharing options",
        "editor_ui_shrwin_noinfo": "You are currently not sharing with any user",
        "editor_ui_shrwin_selbtn": "Select users",
        "editor_ui_shrwin_selhead": "Select recipients",
        "editor_ui_shrwin_save": "Save and proceed",
        "editor_ui_dwmwin_head": "Your download list",
        "editor_ui_dwmwin_noinfo": "No download available",
        "editor_ui_nodata": "No data available or access denied",
        "editor_ui_noproject": "No project available",
        "editor_ui_status_con": "Connected",
        "editor_ui_status_slide": "Slides",
        "editor_ui_status_acslide": "Active slide",
        "editor_ui_status_sel": "Selected",
        "editor_ui_status_aclayer": "Active layer",
        "editor_ui_status_locked": "Locked",
        "editor_ui_tip_note0": "Click to exit or drag to continue drawing",
        "editor_ui_tip_note1": "Release mouse to complete drawing",
        "editor_ui_tip_note2": "Press the [esc] key to complete drawing",
        "editor_ui_tip_drawline": "straight line",
        "editor_ui_tip_drawline2": "Line",
        "editor_ui_tip_draw": "Draw",
        "editor_ui_tip_drawpath": "Path",
        "editor_ui_tip_drawpencil": "Pencil",
        "editor_ui_tip_drawshp": "Interactive shape tool",
        "editor_ui_tip_drawcircle": "circle",
        "editor_ui_tip_drawrect": "square",
        "editor_ui_tip_draginfo": "Drag ontop of an object to apply",
        "editor_ui_tip_anime_backw": "Play animation in reverse mode",
        "editor_ui_tip_anime_play": "Play animation forward",
        "editor_ui_tip_anime_stop": "Stop\/pause animation",
        "editor_ui_tip_anime_toolsel": "Selection tool",
        "editor_ui_tip_anime_toolcp": "Copy selected frames",
        "editor_ui_tip_anime_toolpas": "Paste copied frames",
        "editor_ui_tip_anime_toolmv": "Move selected frames",
        "editor_ui_tip_anime_toolres": "Clear all animation frames",
        "editor_ui_tip_anime_toolmark": "Insert marker",
        "editor_ui_tip_anime_toolins": "Animate selected elements at once",
        "editor_ui_tip_anime_toolrec": "Record and capture state",
        "editor_ui_tip_anime_toolscre": "Take snapshot of current animation state",
        "editor_ui_tip_drp_toggle": "Toggle Dropbox sync",
        "editor_ui_tip_fullscr_toggle": "Toggle fullscreen",
        "editor_ui_tip_undo": "Undo last action",
        "editor_ui_tip_redo": "Redo last action",
        "editor_ui_tip_zoomout": "Zoom out",
        "editor_ui_tip_zoomin": "Zoom in",
        "editor_ui_tip_zoomfit": "Fit to artboard",
        "editor_ui_tip_zoomres": "Actual size",
        "editor_ui_tip_cf": "Configurations",
        "editor_ui_tip_toggle_anime": "Toggle animation timeline",
        "editor_ui_tip_safecut": "Toggle safearea",
        "editor_ui_tip_save": "Save your work",
        "editor_ui_tip_exit": "Close and exit editor",
        "editor_ui_tip_vison": "Toggle visibility",
        "editor_ui_tip_cp": "Copy layer",
        "editor_ui_tip_mv_left": "Move layer to the left",
        "editor_ui_tip_mv_top": "Move layer to the top",
        "editor_ui_tip_mv_center": "Center layer",
        "editor_ui_tip_mv_bottom": "Move layer to bottom",
        "editor_ui_tip_mv_right": "Move layer to the right",
        "editor_ui_tip_rotate": "Drag and rotate handle",
        "editor_ui_tip_libsave": "Save to your library",
        "editor_ui_tip_libobjlock": "Lock object",
        "editor_ui_tip_libobjnolock": "Unlock object",
        "editor_ui_tip_fxadd": "Select and add new effect from the list",
        "editor_ui_tip_fxdel": "Remove effect from stack",
        "editor_ui_msg_aniloop": "Enter the number of times the animation should loop. \\n Use -1 to disable loop. Or 0 to enable infinite loop",
        "editor_ui_msg_anidelay": "Enter animation delay (Seconds)",
        "editor_ui_msg_brnosuport": "It seems you are using an old or unsupported browser. Please update to a recent version of one of the following browsers",
        "editor_ui_msg_brnosuporthead": "Please update your browser",
        "editor_ui_msg_brnoconn": "Make sure you're connected online and try again!",
        "editor_ui_msg_fdnoname": "Folder name must not be empty",
        "editor_ui_msg_fdpname": "Enter folder name",
        "editor_ui_msg_failedop": "Could not complete last operation. Try again",
        "editor_ui_msg_failedupl": "Could not complete upload",
        "editor_ui_msg_failedok": "New folder saved successfully",
        "editor_ui_msg_dataloaderr": "Error while loading data",
        "editor_ui_msg_dataloadempty": "Empty data",
        "editor_ui_msg_drpconnerr": "Could not connect to dropbox. Try again",
        "editor_ui_msg_drpsyncop": "Syncing to Dropbox",
        "editor_ui_msg_drpsyncyes": "You are currently exporting to Dropbox",
        "editor_ui_msg_drpsyncno": "Dropbox auto-sync deactivated",
        "editor_ui_msg_drpsyncprg": "Syncing in progress",
        "editor_ui_msg_drpsyncok": "Successfully synced to Dropbox",
        "editor_ui_msg_drpsyncfail": "Could not complete sync.Try again",
        "editor_ui_msg_drpconfail": "You are not connected to Dropbox",
        "editor_ui_msg_cpkey": "Copy your key to a safe place",
        "editor_ui_msg_permlock": "This feature is not available. Please upgrade your membership",
        "editor_ui_msg_saveall": "Save your work to proceed",
        "editor_ui_msg_savenw": "Save recent changes to proceed",
        "editor_ui_msg_saveunload": "Last changes may not be saved",
        "editor_ui_msg_savepaused": "Saving has stalled. Please check your connection and try again",
        "editor_ui_msg_drawexit": "Draw mode exited",
        "editor_ui_msg_effectnolayer": "Select a layer to proceed",
        "editor_ui_msg_prjloaderr": "Could not load project. Please try again",
        "editor_ui_msg_tplloaderr": "Could not load template. Please try again",
        "editor_ui_msg_dimerr": "Invalid dimension",
        "editor_ui_msg_dimlimiterr": "Cannot exceed maximum dimension",
        "editor_ui_msg_confirm": "Are you sure?",
        "editor_ui_msg_conok": "Connected successfully",
        "editor_ui_msg_conno": "Connection failed. Try again",
        "editor_ui_msg_emailconf": "Enter email",
        "editor_ui_msg_ivok": "Invitation successfully sent",
        "editor_ui_msg_fdsel": "Select folder",
        "editor_ui_msg_selconfirm": "Please select",
        "editor_ui_msg_fdsaveok": "Successfully saved to assets folder"
    };
    c.policySetup = {
        "APP_NAME": "Cloudlysuites Software",
        "ENABLE_UPLOADS": "1",
        "MAX_MOTION_TIME": "900000",
        "MAX_WIDTH": "5000",
        "MAX_HEIGHT": "5000",
        "MAX_LAYER_HEAP": "20",
        "MAX_SLIDE_HEAP": "5",
        "PUBLIC_FONT_REPO": "",
        "PUBLIC_SHAPE_REPO": "",
        "PUBLIC_IMAGE_REPO": ""
    };
    c.anime_types = [{"title": "Default", "items": [{"key": "", "title": "Custom Tween"}]}, {
        "title": "Transitions",
        "items": [{"key": "slide", "title": "Slide left"}, {
            "key": "slide_right",
            "title": "Slide right"
        }, {"key": "slide_top", "title": "Slide top"}, {"key": "slide_bottom", "title": "Slide bottom"}, {
            "key": "zoom",
            "title": "Zoom"
        }, {"key": "fade", "title": "Fade"}, {"key": "newsflash", "title": "Newsflash"}, {
            "key": "rise",
            "title": "Rise"
        }, {"key": "roll", "title": "Roll"}, {"key": "swoop", "title": "Swoop"}, {
            "key": "entrance",
            "title": "Entrance"
        }]
    }, {
        "title": "Effects",
        "items": [{"key": "stagger", "title": "Stagger"}, {"key": "wheel", "title": "Wheel"}, {
            "key": "pulse",
            "title": "Pulse"
        }, {"key": "bounce", "title": "Bounce"}, {"key": "push", "title": "Push"}, {
            "key": "buzz",
            "title": "Buzz"
        }, {"key": "flash", "title": "Flash"}, {"key": "glow", "title": "Glow"}]
    }, {
        "title": "Path",
        "items": [{"key": "path.drawing", "title": "Drawing"}, {"key": "path.eraser", "title": "Eraser"}]
    }, {"title": "Lettering", "items": [{"key": "typo.typing", "title": "Typewriter"}]}];
    (function () {
        svgObList = {};
        var n, e, a, b, f;
        var setupSvg = function (svg) {
            n = svg.querySelector('defs');
            if (!n) {
                n = svg.appendChild(document.createElementNS(c.domSvgNs, 'defs'));
                e = n.appendChild(document.createElementNS(c.domSvgNs, 'filter'));
                e.setAttribute('class', 'svgFxOb');
                e.setAttribute('filterUnits', 'userSpaceOnUse');
                e.setAttribute('width', window.innerWidth);
                e.setAttribute('height', window.innerHeight);
                e.setAttribute('preserveAspectRatio', 'none');
                return e;
            }
            e = n.querySelector('filter.svgFxOb');
            if (!e) {
                e = n.appendChild(document.createElementNS(c.domSvgNs, 'filter'));
                e.setAttribute('filterUnits', 'userSpaceOnUse');
                e.setAttribute('width', window.innerWidth);
                e.setAttribute('height', window.innerHeight);
                e.setAttribute('preserveAspectRatio', 'none');
                e.setAttribute('class', 'svgFxOb');
                return e;
            }
            return e;
        }
        c.svgFxOb = function (svg) {
            this.fx = {};
            var self = this, filter = null, uid, Nodes, cb = {}, isFilter = false;
            uid = this.uid = 'filter_' + $.now() + '_' + Math.random().toString().replace('.', '');
            this.filter;
            this.priority = [];
            this.mute = false;
            this.init = function (svg) {
                a = $(svg);
                if (a.is('svg') == false) throw'Not a valid Vector Node';
                svg = a.get(0);
                filter = setupSvg(svg);
                this.dom = svg;
                e = svg.getAttribute('id');
                this.def = filter.parentNode;
                if (e && (a = document.body.querySelectorAll('.objectBox > .object svg#' + e)) && a.length > 1) {
                    e = uid.replace('filter_', 'layer_');
                    svg.setAttribute('id', e);
                } else if (!e) {
                    e = uid.replace('filter_', 'layer_');
                    svg.setAttribute('id', e);
                }
                this.domID = e;
                Nodes = filter.querySelector('feMerge.svgFxOb');
                if (!Nodes) {
                    Nodes = filter.appendChild(document.createElementNS(c.domSvgNs, 'feMerge'));
                    Nodes.setAttribute('class', 'svgFxOb');
                }
                this.filter = filter;
                filter.setAttribute('id', uid);
                return this;
            }
            this.hasFilter = function () {
                return (isFilter || false);
            }
            this.resizeFilter = function (e) {
                if (!filter) return;
                filter.setAttribute('width', (c.stageWidth * 100));
                filter.setAttribute('height', c.stageHeight * 100);
            }
            this.loadAll = function (obj, list) {
                if (typeof obj !== 'object') return;
                if (obj.fxPriority !== undefined && obj.fxPriority.length > 0) {
                    list = $.extend([], obj.fxPriority);
                    list = $.unique(list)
                } else {
                    list = Object.keys(obj);
                }
                $.each(list, function (i, n, fx, f) {
                    if (svgObList[n] === undefined) return this;
                    if (obj[n] === undefined) return this;
                    f = obj[n];
                    if (typeof f === 'object') {
                        f = $.extend(true, {}, obj[n]);
                    }
                    if (self.fx[n]) {
                        self.fx[n].update(f);
                        return this;
                    }
                    fx = new svgObList[n](n, f, self);
                    fx.constructor.name = n;
                    fx.s_options = obj[n];
                    self.fx[n] = fx;
                    if (fx.filter) {
                        self.priority.push(n);
                    }
                })
                return this;
            }
            this.load = function (obj, fx, f) {
                if (typeof obj !== 'object') return this;
                a = Object.keys(obj);
                if (a.length == 0) return this;
                b = a[0];
                if (this.fx[b]) {
                    this.fx[b].update(obj[b]);
                    return this;
                }
                if (!svgObList[b]) return this;
                f = obj[b];
                if (typeof f == 'object') {
                    f = $.extend(true, {}, obj[b]);
                }
                if (svgObList[b] !== svgP) {
                    a = new svgP(b, f, this);
                    f = $.proxy(svgObList[b], a, b, f, this);
                    fx = new f;
                } else {
                    fx = new svgObList[b](b, f, this);
                }
                fx.constructor.name = b;
                fx.s_options = obj[b];
                if (fx.filter) {
                    this.priority.push(b);
                }
                this.fx[b] = fx;
                return this;
            }
            this.onUpdate = function (n, opt) {
                if (this.child) {
                    this.child.fx[n].update(this.fx[n].options);
                }
                if (cb.update) {
                    this.event = cb.update;
                    this.event(n, opt);
                    delete this.event;
                }
            };
            this.onStart = function (n, opt) {
                if (cb.start) {
                    this.event = cb.start;
                    this.event(n);
                    delete this.event
                }
            }
            this.onInit = function (n, opt) {
                if (cb.init) {
                    this.event = cb.init;
                    this.event(n, opt);
                    delete this.event;
                }
            }
            this.onRender = function (n) {
                if (this.child) {
                    this.child.fx[n].apply(true)
                }
                filter.setAttribute('filterUnits', 'userSpaceOnUse');
                if (cb.render) {
                    this.event = cb.render;
                    this.event(n);
                    delete this.event;
                }
            }
            this.onDelete = function (n, i) {
                if (this.fx[n]) delete this.fx[n];
                e = Nodes.querySelector('feMergeNode[in=fx' + n + ']');
                if (e) {
                    Nodes.removeChild(e);
                }
                if (Object.keys(this.fx).length == 0 || !Nodes.firstChild) {
                    this.dom.removeAttribute('filter');
                    isFilter = false;
                }
                i = this.priority.indexOf(n);
                if (i !== -1) {
                    this.priority.splice(i, 1)
                }
                if (this.child && this.child.fx[n]) {
                    this.child.fx[n].destroy();
                }
                if (cb.delete) {
                    this.event = cb.delete;
                    this.event(n);
                    delete this.event;
                }
            }
            this.on = function (n, func) {
                if (typeof func == 'function' && typeof n == 'string') {
                    cb[n] = func;
                }
                return this;
            }
            this.applyAll = function (ns, force, e) {
                a = this.fx;
                if (ns && typeof ns == 'string' && a[ns]) {
                    a = {};
                    a[ns] = this.fx[ns];
                }
                $.each(a, function (n, fx) {
                    if (force === true) {
                        fx.update(fx.options);
                    }
                    if (self.mute) {
                        fx.apply(false);
                    } else {
                        fx.apply();
                    }
                    if (ns === true) {
                        fx.s_options = fx.options;
                    }
                    if (fx.filter && fx.filter.length > 0 && (e = filter.querySelectorAll('.sfx_' + n)) && e.length == 0) {
                        isFilter = true;
                        for (a = 0; fx.filter.length > a; a++) {
                            if (n.indexOf('fx2') !== 0) {
                                fx.filter[a].setAttribute('result', 'fx' + n);
                            } else if (a == (fx.filter.length - 1)) {
                                fx.filter[a].setAttribute('result', 'fx' + n);
                            }
                            Nodes.before(fx.filter[a])
                        }
                    } else if (fx.filter && e.length > 0) {
                        fx.filter = e;
                        isFilter = true;
                    }
                    if (isFilter && !Nodes.firstChild) {
                        e = Nodes.appendChild(document.createElementNS(c.domSvgNs, 'feMergeNode'));
                        e.setAttribute('in', 'SourceGraphic');
                        e.setAttribute('class', 'def');
                    }
                    if (fx.filter && !(e = Nodes.querySelector('feMergeNode[in=fx' + n + ']'))) {
                        e = document.createElementNS(c.domSvgNs, 'feMergeNode');
                        e.setAttribute('in', 'fx' + n);
                        Nodes.firstChild.after(e);
                    }
                })
                if (Object.keys(this.fx).length > 0 && Nodes.firstChild) {
                    this.reorganise(this.priority);
                    this.dom.setAttribute('filter', 'url(#' + uid + ')')
                } else {
                    this.dom.removeAttribute('filter');
                    isFilter = false;
                }
                return this;
            }
            this.toggle = function (n, a) {
                a = this.fx;
                if (n && typeof ns == 'string' && a[n]) {
                    a = {};
                    a[n] = this.fx[n];
                }
                $.each(a, function (e, fx) {
                    if (fx.state === undefined) {
                        fx.state = false;
                    } else {
                        delete fx.state;
                    }
                    if (fx.filter && fx.state === false) {
                        fx.svg.removeAttribute('filter');
                        $(fx.svg).clone()
                    } else if (fx.filter) {
                        fx.svg.setAttribute('filter', 'url(#' + filter.id + ')');
                        $(fx.svg).clone()
                    }
                })
            }
            this.destroy = function () {
                $.each(this.fx, function (n, fx) {
                    fx.destroy();
                })
                if (filter && filter.parentNode) {
                    $(filter.parentNode).remove();
                }
            }
            this.toArray = function (r, e) {
                r = $.extend([], this.priority);
                if (r.length === undefined) r = [];
                e = Object.keys(this.fx);
                $.each(e, function (i, n) {
                    if (r.indexOf(n) === -1) {
                        r.push(n);
                    }
                })
                r = $.unique(r);
                return r;
            }
            this.divert = function (newsvgNode, a, b) {
                a = this.dom;
                b = this.filter;
                this.mute = true;
                this.dom = $(newsvgNode).filter('svg').get(0)
                this.applyAll(null, true);
                this.mute = false;
                this.dom = a;
                this.filter = b;
                filter = b;
            }
            this.reorganise = function (list, e, fx) {
                if (list === undefined) return;
                this.priority = list;
                if (!this.hasFilter()) return;
                for (i = 0; list.length > i; i++) {
                    e = list[i];
                    if (this.fx[e] === undefined) {
                        continue;
                    }
                    if (!this.fx[e].filter) {
                        continue;
                    }
                    fx = this.fx[e];
                    e = Nodes.querySelector('feMergeNode[in=fx' + e + ']');
                    Nodes.appendChild(e);
                    fx.svg.setAttribute('filter', 'url(#' + filter.id + ')');
                    $(fx.svg).clone()
                }
            }
            this.link = function (fx) {
                if (this.child) {
                    this.child.link(fx);
                    return this;
                }
                this.child = fx;
                this.child.parent = this;
                $.each(this.fx, function (k, e) {
                    if (!self.child.fx[k]) {
                        e = {};
                        e[k] = this.options;
                        ;self.child.load(e)
                    }
                    self.child.fx[k].update(this.options);
                    self.child.fx[k].apply();
                })
            }
            this.applyTo = function (newsvgElement) {
            }
            this.extend = function (name, default_config, init_cb) {
                name = $.trim(name);
                if (typeof name == 'number' || name === undefined || name == "") return false;
                e = Object.keys(svgObList);
                e = $.map(e, function (i) {
                    if (i === name) return i;
                });
                if (e.length > 0) {
                    name = name + '_' + (e.length + 1);
                }
                svgObList[name] = init_cb;
                c.svgEffectsList[name] = default_config;
                return svgObList[name];
            }
            if (svg) {
                this.dom = svg;
                this.init(svg);
            }
            return this;
        }
        var svgP = function (n, opt, s) {
            this.options = null;
            this.guiDom = {};
            var name = n, ab = s, updated = true;
            this.name = n;
            this.options = opt;
            this.filter = [];
            var svg = this.svg = ab.dom;
            this.s_options = '';
            this.priority = 0;
            if (name == 'tear') {
                this.priority = 1;
            }
            if (name == 'noise') this.priority = -1;
            this.uid = 'fx_' + n + '_' + $.now() + '_' + Math.random().toString().replace('.', '');
            ab.onInit(name, this.options);
            var add = function (opt) {
                switch (name) {
                    case'background':
                        break;
                    case'shadow':
                        return $.map(c.svgEffects.shadow, function (e, i) {
                            e = $(e).clone().addClass('sfx_' + name).get(0);
                            if (i == 0) {
                                e.setAttribute('in', opt.resolveToPreviousEffect())
                            } else if (i == 2) {
                                e.setAttribute('in', 'fxshadow')
                            } else if (i == 4) {
                                e.setAttribute('in', opt.resolveToPreviousEffect())
                            }
                            if (i == 3) {
                                i = e.children;
                                opt.shadowComp = {'r': i[0], 'g': i[1], 'b': i[2]};
                            }
                            return e;
                        });
                        break;
                    case'overlay':
                        return $.map(c.svgEffects.overlay, function (e, i) {
                            e = $(e).clone().addClass('sfx_' + name).get(0);
                            if (i == 1) {
                                i = e.children;
                                i[3].setAttribute('slope', '1')
                                opt.overlayComp = {'r': i[0], 'g': i[1], 'b': i[2], 'a': i[3]};
                            }
                            return e;
                        })
                        break;
                    case'blur':
                        a = $(c.svgEffects.blur[0]).clone().attr('in', 'SourceGraphic').addClass('sfx_' + name).get(0);
                        return [a];
                        break;
                    case'opacity':
                        break;
                    case'border':
                        break;
                    case'hue':
                    case'saturation':
                    case'brightness':
                        e = name;
                        if (name == 'saturation') e = 'saturate';
                        a = $(c.svgEffects[e][0]).clone().addClass('sfx_' + name).get(0);
                        return [a];
                        break;
                    case'tear':
                    case'clip':
                    case'noise':
                        return $.map(c.svgEffects[name], function (e, i) {
                            e = $(e).clone().addClass('sfx_' + name).get(0);
                            return e;
                        })
                        break;
                    case'mask':
                        a = ab.def.querySelector('clipPath.svgFxOb');
                        if (!a) {
                            a = ab.def.appendChild($(c.svgEffects.mask[0]).clone().addClass('svgFxOb').get(0));
                        }
                        a.setAttribute('id', 'mask_' + opt.uid);
                        opt.mask = a;
                        opt.InputLayer = null;
                        break;
                    case'glow':
                        e = [];
                        e.push($(c.svgEffects.overlay[1]).clone().get(0))
                        e.push($(c.svgEffects.blur[0]).clone().get(0))
                        e.push($(c.svgEffects.shadow[4]).clone().get(0));
                        i = e[0].children;
                        i[3].setAttribute('slope', '1')
                        opt.glowComp = {'r': i[0], 'g': i[1], 'b': i[2], 'a': i[3]};
                        e[0].setAttribute('in', 'SourceAlpha');
                        e[1].setAttribute('in', 'fx' + name);
                        e[2].setAttribute('in', 'SourceGraphic');
                        e[2].setAttribute('in2', 'fx' + name + 'r');
                        e[2].setAttribute('operator', 'over');
                        return e;
                        break;
                    default:
                        break;
                }
                return false;
            }
            this.resolveToPreviousEffect = function (a, e) {
                a = ab.priority;
                e = a.length - 1;
                if (a[e]) {
                    return 'fx' + a[e];
                } else if (a.length == 0) {
                    return 'SourceGraphic';
                } else if (a.length == 1) {
                    return 'fx' + a[0];
                } else {
                    return 'fx' + name;
                }
            }
            this.update = function (o, cast, r, a) {
                if (arguments.length == 0) return;
                switch (name) {
                    case'blur':
                    case'opacity':
                    case'hue':
                    case'saturation':
                    case'brightness':
                        a = parseFloat(arguments[0]);
                        if (isNaN(a) || typeof a !== 'number') return;
                        this.options = a;
                        break;
                    case'border':
                    case'shadow':
                    case'tear':
                    case'overlay':
                    case'clip':
                    case'mask':
                    case'glow':
                    case'noise':
                        a = arguments[0];
                        if (typeof a !== 'object')
                            return;
                        r = Object.keys(a);
                        if (r.length == 1) {
                            this.options[r[0]] = a[r[0]]
                        } else {
                            this.options = $.extend(true, this.options, a);
                        }
                        break;
                    case'background':
                        if (typeof arguments[0] !== 'object') return;
                        this.options = arguments[0];
                        break;
                    default:
                        break;
                }
                updated = true;
                if (cast !== false) {
                    ab.onUpdate(name, this.options);
                }
            }
            var bind = function () {
                $(ab.dom).clone();
                if (ab.fx[name] && ab.fx[name].filter !== false) {
                    a = 'url(#' + ab.filter.id + ')'
                    ab.dom.setAttribute('filter', a);
                }
                updated = false;
            }
            this.apply = function (cast, e) {
                if (updated === false) return false;
                if (!svg) return false;
                if (this.options === undefined) return false;
                switch (name) {
                    case'blur':
                        this.filter[0].setAttribute('stdDeviation', this.options)
                        break;
                    case'opacity':
                        ab.dom.style.fillOpacity = (1 / 10) * this.options;
                        ab.dom.setAttribute('opacity', ab.dom.style.fillOpacity);
                        updated = false;
                        break;
                    case'border':
                        ab.dom.style.strokeWidth = this.options.size;
                        ab.dom.style.strokeDasharray = this.options.offset | 0;
                        ab.dom.style.strokeLinecap = 'butt';
                        ab.dom.style.strokeLinejoin = 'round';
                        ab.dom.style.stroke = this.options.color;
                        updated = false;
                        break;
                    case'shadow':
                    case'overlay':
                    case'glow':
                        if (name == 'shadow') {
                            this.filter[0].setAttribute('dy', this.options.y);
                            this.filter[0].setAttribute('dx', this.options.x);
                            this.filter[1].setAttribute('stdDeviation', this.options.spread);
                        }
                        e = $('<input value="' + this.options.color + '" />').spectrum();
                        b = e.spectrum('get').toRgb();
                        e.spectrum('destroy');
                        if (name == 'shadow') {
                            this.filter[2].setAttribute('values', colorToMatrix(b));
                        }
                        this[name + 'Comp'].r.setAttribute('intercept', b.r / 255);
                        this[name + 'Comp'].g.setAttribute('intercept', b.g / 255);
                        this[name + 'Comp'].b.setAttribute('intercept', b.b / 255);
                        if (name == 'overlay') {
                            this.overlayComp.a.setAttribute('slope', (1 / 100) * this.options.opacity);
                        } else if (name == 'glow') {
                            this.filter[1].setAttribute('result', 'fx' + name + 'r');
                            this.filter[1].setAttribute('stdDeviation', this.options.strength);
                        }
                        if (name == 'glow' && this.options.mode == false) {
                            this.filter[2].setAttribute('operator', 'out')
                        } else {
                            this.filter[2].setAttribute('operator', 'over')
                        }
                        break;
                    case'mask':
                        if (!this.options.layer) {
                            ab.dom.querySelector('image').removeAttribute('clip-path');
                            ab.dom.querySelector('image').removeAttribute('mask');
                            delete this.InputLayer;
                            return this;
                        }
                        if (!this.options.mode) {
                            this.InputLayer = c.domCanvas.find('.objectBox#g_' + this.options.layer);
                            e = this.InputLayer.attr('scope');
                            e = c.slides[0].elements[e];
                            this.s = e;
                            this.be = real_offset($(ab.dom).parents('.objectBox'));
                            this.options.x = 0;
                            this.options.y = 0;
                            if (e.prop.sym == 'square') {
                                this.bd = real_offset(this.InputLayer);
                                this.options.mode = e.prop.sym
                            } else if (e.prop.sym == 'circle') {
                                this.bd = this.InputLayer.find('.object ellipse').get(0).getBoundingClientRect();
                                this.options.mode = e.prop.sym;
                            } else if (e.prop.sym == 'path') {
                                this.bd = real_offset(this.InputLayer);
                                this.options.mode = e.prop.cmd;
                                this.options.mode = {'path': this.options.mode.split(' '), 'off': e.prop.off};
                                delete this.path;
                                this.options.x = 0;
                                this.options.y = 0;
                            } else if (e.prop.sym == 'text') {
                                this.bd = real_offset(this.InputLayer);
                                this.options.mode = {'text': e.prop.source, 'off': e.prop.off};
                                this.options.mode.size = e.prop.size;
                                this.options.mode.font = c.libs.fonts[e.prop.font][e.prop.type];
                                this.options.x = 0;
                                this.options.y = 0;
                            }
                            this.bd.y = this.bd.top - this.be.top;
                            this.bd.x = this.bd.left - this.be.left;
                            this.options.width = number_format(this.bd.width);
                            this.options.height = number_format(this.bd.height);
                            delete this.InputLayer;
                            delete this.e;
                            delete this.bd;
                        }
                        ab.dom.querySelector('image').setAttribute('mask', 'url(#mask_' + this.uid + ')');
                        mk = $(this.mask).empty()
                        if (this.options.mode == 'square') {
                            this.e = document.createElementNS(c.domSvgNs, 'rect');
                            this.e = $(this.e);
                            mk.append(this.e);
                        } else if (this.options.mode == 'circle') {
                            this.e = document.createElementNS(c.domSvgNs, 'ellipse');
                            this.e = $(this.e);
                            e = {'cx': this.options.width / 2, 'cy': this.options.height / 2};
                            e.rx = (e.cx)
                            e.ry = (e.cy)
                            this.e.attr(e);
                            mk.append(this.e);
                        } else if (this.options.mode.text) {
                            o = {};
                            o.text = document.createElementNS(c.domSvgNs, 'text');
                            o.text.style.fontSize = this.options.mode.size + 'px';
                            o.text.style.fontFamily = this.options.mode.font;
                            $.map(this.options.mode.text, function (i, e) {
                                o.ts = document.createElementNS(c.domSvgNs, 'tspan');
                                o.ts.setAttribute('x', i.x);
                                o.ts.setAttribute('y', i.y);
                                o.ts.append(i.s);
                                o.text.appendChild(o.ts);
                            })
                            o.g = document.createElementNS(c.domSvgNs, 'g');
                            o.g.appendChild(o.text)
                            this.e = document.createElementNS(c.domSvgNs, 'svg');
                            this.e.setAttribute('viewBox', this.options.mode.off.x + ' ' + this.options.mode.off.y + ' ' + this.options.mode.off.w + ' ' + this.options.mode.off.h);
                            this.e.appendChild(o.g);
                            mk.append(this.e);
                            this.e = $(o.g);
                        } else {
                            e = document.createElementNS(c.domSvgNs, 'path');
                            e.setAttribute('d', 'M' + this.options.mode.path.join('L') + 'z');
                            this.e = document.createElementNS(c.domSvgNs, 'svg');
                            this.e.setAttribute('viewBox', this.options.mode.off.x + ' ' + this.options.mode.off.y + ' ' + this.options.mode.off.w + ' ' + this.options.mode.off.h);
                            this.e.setAttribute('preserveAspectRatio', 'none')
                            this.e.appendChild(e);
                            this.e = $(this.e);
                            mk.append(this.e);
                            this.e = $(e);
                        }
                        delete this.s;
                        this.e.css({
                            'width': this.options.width,
                            'height': this.options.height
                        }).attr({
                            'transform': 'matrix(1 0 0 1 ' + this.options.x + ' ' + this.options.y + ')',
                            'fill': '#fff'
                        })
                        updated = false;
                        break;
                    case'clip':
                        this.filter[1].setAttribute('result', 'fx' + name + 'r');
                        this.filter[1].setAttribute('href', '#' + this.options.layer);
                        this.filter[2].setAttribute('in', 'fx' + name + 'r');
                        break;
                    case'background':
                        if (this.options.gradient && !this.options.gradient[0]) this.options.gradient = [this.options.gradient]
                        if (this.options.gradient && this.options.gradient.length == 1 && !this.options.gradient[0].stops) {
                            this.options.gradient[0].stops = [];
                            this.options.gradient[0].stops.push({
                                'color': this.options.gradient[0].start,
                                'offset': this.options.gradient[0].y.toString().replace('%', '')
                            });
                            this.options.gradient[0].stops.push({
                                'color': this.options.gradient[0].stop,
                                'offset': this.options.gradient[0].x.toString().replace('%', '')
                            });
                        }
                        if (this.options.gradient && !this.options.gradient[0].mode) {
                            this.options.gradient[0].mode = 'linear';
                        }
                        if (this.options.gradient) {
                            this.mode = this.options.gradient[0].mode.substr(0, 1);
                        }
                        if (this.options.gradient && this.mode !== 'r' && this.mode !== 'l') {
                            this.mode = 'l';
                        }
                        this.modeMaps = {'l': ['Lgradient', 'linearGradient'], 'r': ['Rgradient', 'radialGradient']}
                        if (this.options.gradient) {
                            this.e = this.modeMaps[this.mode][0];
                            this.e = $(c.svgEffects[this.e]).clone().addClass('svgFxObGrad').get(0)
                        }
                        if (this.options.gradient && !(a = ab.def.querySelector('.svgFxObGrad'))) {
                            this.gradDom = ab.def.appendChild(this.e);
                        } else if (this.options.gradient) {
                            a.parentNode.replaceChild(this.e, a);
                            this.gradDom = this.e;
                        }
                        if (this.options.gradient) {
                            this.options.gradient[0].deg = this.options.gradient[0].deg.toString().replace(/[^\d.]/g, '');
                            if (this.options.gradient[0].deg == '') this.options.gradient[0].deg = 50;
                            this.gradDom.setAttribute('id', this.uid);
                            if (this.mode == 'l') {
                                b = this.options.gradient[0].deg * (Math.PI / -180)
                                this.gradDom.setAttribute('x1', Math.round(50 + Math.sin(b) * 50) + '%');
                                this.gradDom.setAttribute('y1', Math.round(50 + Math.cos(b) * 50) + '%');
                                this.gradDom.setAttribute('x2', Math.round(50 + Math.sin(b + Math.PI) * 50) + '%');
                                this.gradDom.setAttribute('y2', Math.round(50 + Math.cos(b + Math.PI) * 50) + '%');
                            } else {
                                this.gradDom.setAttribute('fx', this.options.gradient[0].deg + '%')
                            }
                            b = this;
                            $(this.gradDom).empty();
                            $.each(this.options.gradient[0].stops, function () {
                                this.offset = this.offset.toString().replace('%', '');
                                e = b.gradDom.appendChild(document.createElementNS(c.domSvgNs, 'stop'));
                                e.setAttribute('offset', this.offset + '%');
                                e.style.stopColor = this.color;
                            });
                            ab.dom.setAttribute('fill', 'url(#' + this.uid + ')');
                        } else if (this.options.color) {
                            if (this.options.color[0] !== '#') {
                                this.options.color = tinycolor(this.options.color).toHexString();
                            }
                            ab.dom.setAttribute('fill', this.options.color);
                        }
                        updated = false;
                        break;
                    case'hue':
                    case'saturation':
                    case'brightness':
                        if (name !== 'brightness') {
                            this.filter[0].setAttribute('values', this.options);
                        } else {
                            e = '0 0 0 0 0|';
                            e = e.repeat(4).split("|");
                            e.splice(4, 1)
                            a = this;
                            e = $.map(e, function (v, i) {
                                v = v.split(' ');
                                v[i] = a.options;
                                return v.join(' ');
                            })
                            e = e.join("\n");
                            this.filter[0].setAttribute('values', e);
                            this.filter[0].setAttribute('type', 'matrix');
                        }
                        break;
                    case'tear':
                        a = (1 / 100) * this.options.smooth;
                        this.filter[0].setAttribute('baseFrequency', a + ' ' + a);
                        this.filter[1].setAttribute('scale', this.options.strength);
                        break;
                    case'noise':
                        a = (1 / 100) * this.options.strength;
                        this.filter[0].setAttribute('baseFrequency', a + ' ' + a);
                        this.filter[0].setAttribute('scale', this.options.strength);
                        break;
                    default:
                        break;
                }
                if (updated) {
                    bind();
                }
                if (ab.child || cast !== false) {
                    ab.onRender(name);
                }
            }
            this.destroy = function (cast) {
                if (this.filter && this.filter.length > 0) {
                    for (a = 0; this.filter.length > a; a++) {
                        this.filter[a].parentNode.removeChild(this.filter[a]);
                    }
                }
                switch (name) {
                    case'opacity':
                        ab.dom.style.fillOpacity = '';
                        ab.dom.removeAttribute('opacity');
                        break;
                    case'border':
                        ab.dom.style.stroke = '';
                        ab.dom.style.strokeWidth = '';
                        break;
                    case'background':
                        if (this.options.gradient && this.gradDom) {
                            this.gradDom.parentNode.removeChild(this.gradDom);
                        }
                        ab.dom.setAttribute('fill', '#000')
                        break;
                    case'mask':
                        ab.dom.removeAttribute('mask');
                        ab.dom.removeAttribute('clip-path');
                        this.mask.parentNode.removeChild(this.mask);
                        break;
                    default:
                        break;
                }
                delete ab.fx[name];
                if (cast !== false) {
                    ab.onDelete(name);
                }
                bind();
            }
            this.gui = function (wrapper) {
                if (!wrapper && this.guiDom.domParent) {
                    wrapper = this.guiDom.domParent.empty();
                }
                this.guiDom.domParent = wrapper;
                switch (name) {
                    case'tear':
                    case'noise':
                        if (!(this.guiDom.strength && $(this.guiDom.strength.input).is(':visible'))) {
                            if (name == 'tear') {
                                e = $('<div class="w mt-3"><p>Smoothness</p><input /></div>');
                                e.appendTo(wrapper);
                                this.guiDom.smooth = e.find('input');
                            }
                            e = $('<div class="w"><p>Strength</p><input /></div>');
                            e.appendTo(wrapper);
                            this.guiDom.strength = e.find('input');
                            this.ar = [this.guiDom.strength.get(0)];
                            if (name == 'tear') this.ar.push(this.guiDom.smooth.get(0));
                            $(this.ar).ionRangeSlider({
                                'min': 0, 'max': 100, 'caller': this, 'onChange': function (e) {
                                    if (this.caller.guiDom.smooth && $(this.caller.guiDom.smooth.input).is(e.input)) {
                                        this.caller.update({'smooth': e.from});
                                    } else {
                                        this.caller.update({'strength': e.from});
                                    }
                                }, 'onFinish': function (e) {
                                    ab.onStart(name);
                                    if (this.caller.guiDom.smooth && $(this.caller.guiDom.smooth.input).is(e.input)) {
                                        a = (1 / 100) * this.caller.options.smooth;
                                        this.caller.filter[0].setAttribute('baseFrequency', a + ' ' + a);
                                        ab.onRender(name);
                                        bind();
                                    } else if (name == 'tear') {
                                        this.caller.filter[1].setAttribute('scale', this.caller.options.strength);
                                        bind();
                                    } else {
                                        this.caller.filter[0].setAttribute('scale', this.caller.options.strength);
                                        a = (1 / 100) * this.caller.options.strength;
                                        this.caller.filter[0].setAttribute('baseFrequency', a + ' ' + a);
                                        ab.onRender(name);
                                        bind();
                                    }
                                }
                            })
                            this.guiDom.strength = this.guiDom.strength.data('ionRangeSlider');
                            if (name == 'tear') {
                                this.guiDom.smooth = this.guiDom.smooth.data('ionRangeSlider');
                            }
                        }
                        this.guiDom.strength.update({'from': this.options.strength})
                        if (name == 'tear') {
                            this.guiDom.smooth.update({'from': this.options.smooth})
                        }
                        break;
                    case'clip':
                    case'mask':
                        if ((this.guiDom.layer && this.guiDom.layer.is(':visible')) !== true) {
                            e = $('<div class="col-12 mt-1" id="picker"><button class="btn btn-block btn-primary">Clip layer</button></div>');
                            this.guiDom.layer = e.find('button').on('click', {'caller': this}, function (ev, e, i, f) {
                                e = Object.keys(c.currentSelection);
                                if (e.length <= 1) {
                                    toastr['info']('Please select a masking layer');
                                    return;
                                }
                                f = false;
                                for (i = 0; e.length > i; i++) {
                                    k = e[i];
                                    p = c.slides[0].elements[k];
                                    if (!p) continue;
                                    if (p.prop.sym && ['circle', 'square', 'path', 'text'].indexOf(p.prop.sym) !== -1) {
                                        f = true;
                                        ev.data.caller.update({'layer': p.prop.uid});
                                        ev.data.caller.options.mode = null;
                                        ev.data.caller.apply();
                                        ev.data.caller.guiDom.x.val(ev.data.caller.options.x);
                                        ev.data.caller.guiDom.y.val(ev.data.caller.options.y);
                                        ab.onRender(name);
                                        break;
                                    }
                                }
                                if (!f) toastr['info']('Mask layer must be circle,square,path,text type');
                                c.transformHandler.disable();
                                return;
                            })
                            e.appendTo(wrapper);
                            e = $('<div class="row m-0 mt-3">' + ('<div class="w-50"><p class="text-center">X</p><input type="number" step="0.5" class="form-control" /></div>'.repeat(2)) + '</div>');
                            e.appendTo(wrapper);
                            e = e.find('input');
                            this.guiDom.x = e.first().val(this.options.x).attr('id', 'x');
                            this.guiDom.y = e.last().val(this.options.y).attr('id', 'y');
                            this.guiDom.y.prev().text('Y')
                            e.on('input', {'caller': this}, function (ev, o) {
                                o = {};
                                o[this.id] = this.value;
                                ev.data.caller.update(o);
                                ev.data.caller.e.attr('transform', 'matrix(1 0 0 1 ' + ev.data.caller.options.x + ' ' + ev.data.caller.options.y + ')');
                                ab.onRender(name);
                            })
                        }
                        break;
                    case'blur':
                    case'opacity':
                    case'hue':
                    case'saturation':
                    case'brightness':
                        if ((this.guiDom.range && $(this.guiDom.range.input).is(':visible')) !== true) {
                            this.guiDom.wrapper = $('<div><input /></div>');
                            this.guiDom.wrapper.appendTo(wrapper);
                            e = {
                                'min': 0, 'max': 10, 'step': 0.2, 'caller': this, 'onChange': function (e) {
                                    this.caller.update(e.from);
                                }, 'onFinish': function () {
                                    ab.onStart(name);
                                    this.caller.apply();
                                }
                            }
                            if (name == 'hue') {
                                e.min = 0, e.max = 100;
                            } else if (name == 'brightness') {
                                e.min = -10;
                                e.max = 10;
                                e.step = 0.1;
                            }
                            this.guiDom.range = this.guiDom.wrapper.find('input').ionRangeSlider(e);
                            this.guiDom.range = this.guiDom.range.data('ionRangeSlider');
                        }
                        this.guiDom.range.update({'from': this.options})
                        break;
                    case'shadow':
                    case'overlay':
                    case'glow':
                        n = false;
                        if (this.guiDom.color && this.guiDom.color.is(':visible')) {
                            n = true;
                        }
                        if (n == false) {
                            e = $('<div class="col-12 mt-1" id="picker"><p>Color</p><div class="colorplate" style="width:35px;cursor:pointer"></div></div>');
                            this.guiDom.color = e.find('div.colorplate');
                            e.appendTo(wrapper);
                            e = $('<div class="col-12 mt-1"><p>Distance</p><input id="shadowxy" /></div>');
                            this.guiDom.distance = e.find('input[id]');
                            e.appendTo(wrapper);
                        }
                        if (n == false && name == 'shadow') {
                            e = $('<div class="col-12 mt-1"><p>Spread</p><input id="spread" /></div>');
                            this.guiDom.spread = e.find('input');
                            e.appendTo(wrapper);
                        } else if (n == false && name == 'overlay') {
                            this.guiDom.distance.prev('p').text('Opacity');
                        } else if (n == false) {
                            this.guiDom.distance.prev('p').text('Strength');
                            e = e.clone();
                            e.find('p').text('Knockout');
                            this.guiDom.knock = e.find('input').attr('id', 'knock');
                            e.appendTo(wrapper);
                        }
                        if (n == false) {
                            this.guiDom.color.colorGold().on('colorupdate', function (e, cl) {
                                this.style.backgroundColor = cl.color;
                                cl.caller.update({'color': cl.color});
                                ab.onStart(name);
                                if (name == 'shadow') {
                                    cl.caller.filter[2].setAttribute('values', colorToMatrix(cl.rgb));
                                }
                                cl.caller[name + 'Comp'].r.setAttribute('intercept', cl.rgb.r / 255);
                                cl.caller[name + 'Comp'].g.setAttribute('intercept', cl.rgb.g / 255);
                                cl.caller[name + 'Comp'].b.setAttribute('intercept', cl.rgb.b / 255);
                                bind();
                                ab.onRender(name);
                            });
                            this.guiDom.color.data('colorGold').color = this.options.color;
                        }
                        a = this.guiDom.color.data('colorGold')
                        a.caller = this;
                        if (n == false) {
                            b = {
                                'min': -100, 'max': 100, 'caller': this, 'onChange': function (e) {
                                    if (name == 'shadow') {
                                        this.caller.update({'y': e.from, 'x': e.from});
                                    } else if (name == 'overlay') {
                                        this.caller.update({'opacity': e.from});
                                    } else {
                                        this.caller.update({'strength': e.from});
                                    }
                                }, 'onFinish': function () {
                                    ab.onStart(name);
                                    if (name == 'shadow') {
                                        this.caller.filter[0].setAttribute('dy', this.caller.options.y);
                                        this.caller.filter[0].setAttribute('dx', this.caller.options.x);
                                    } else if (name == 'overlay') {
                                        this.caller[name + 'Comp'].a.setAttribute('slope', (1 / 100) * this.caller.options.opacity);
                                    } else {
                                        this.caller.filter[1].setAttribute('stdDeviation', this.caller.options.strength);
                                    }
                                    bind();
                                    ab.onRender(name);
                                }
                            };
                        }
                        if (n == false && name == 'glow') {
                            b.max = 5;
                            b.min = 1;
                            b.step = 0.2;
                        }
                        if (n == false && name == 'glow') {
                            this.guiDom.knock.on('update', {'caller': this}, function (e, v, i) {
                                i = 1;
                                if (v.value) {
                                    i = 0;
                                }
                                e.data.caller.update({'mode': i});
                                ab.onStart(name);
                                if (i == false) {
                                    e.data.caller.filter[2].setAttribute('operator', 'out')
                                } else {
                                    e.data.caller.filter[2].setAttribute('operator', 'over')
                                }
                                bind();
                                ab.onRender(name);
                            }).switch();
                        }
                        if (n == false) {
                            this.guiDom.distance.ionRangeSlider(b);
                            this.guiDom.distance = this.guiDom.distance.data('ionRangeSlider');
                        }
                        if (n == false && name == 'shadow') {
                            this.guiDom.spread.ionRangeSlider({
                                'caller': this,
                                'min': 0,
                                'max': 10,
                                'step': .2,
                                'onChange': function (e) {
                                    this.caller.update({'spread': e.from});
                                },
                                'onFinish': function () {
                                    ab.onStart(name);
                                    this.caller.filter[1].setAttribute('stdDeviation', this.caller.options.spread);
                                    bind();
                                    ab.onRender(name);
                                }
                            })
                            this.guiDom.spread = this.guiDom.spread.data('ionRangeSlider')
                        }
                        if (name == 'overlay') {
                            this.guiDom.distance.update({'from': this.options.opacity})
                        } else if (name == 'glow') {
                            this.guiDom.distance.update({'from': this.options.strength})
                        } else {
                            this.guiDom.distance.update({'from': this.options.x})
                        }
                        if (name == 'shadow') {
                            this.guiDom.spread.update({'from': this.options.spread})
                        }
                        if (name == 'glow' && this.options.mode == false) {
                            this.guiDom.knock.prop('checked', true).trigger('change');
                        }
                        this.guiDom.color.css('backgroundColor', this.options.color);
                        break;
                    case'border':
                        if ((this.guiDom.range && $(this.guiDom.range.input).is(':visible')) !== true) {
                            this.guiDom.wrapper = $('<div class="row"><div class="col-4"><span>Color</span><div class="colorplate" style="width:35px;cursor:pointer"></div></div><div class="col-12 mt-3"><p>Size</p><input id="size" /></div><div class="col-12 mt-3"><p>Offset</p><input id="offset" /></div></div>');
                            this.guiDom.wrapper.appendTo(wrapper);
                            e = this.guiDom.wrapper.find('input');
                            this.guiDom.size = e.first();
                            this.guiDom.offset = e.last();
                            e.ionRangeSlider({
                                'min': 0,
                                'max': 100,
                                'step': 0.5,
                                'caller': this,
                                'onChange': function (e) {
                                    if (this.caller.guiDom.size.is(e.input)) {
                                        this.caller.update({'size': e.from});
                                    } else {
                                        this.caller.update({'offset': e.from});
                                    }
                                },
                                'onFinish': function () {
                                    ab.onStart(name);
                                    this.caller.apply();
                                    ab.onRender(name);
                                }
                            })
                            this.guiDom.color = this.guiDom.wrapper.find('.colorplate:first');
                            this.guiDom.color.colorGold().on('colorupdate', function (e, cl) {
                                this.style.backgroundColor = cl.color;
                                cl.caller.update({'color': cl.color});
                                ab.onStart(name);
                                cl.caller.apply();
                                ab.onRender(name);
                            })
                        }
                        this.guiDom.color.css('backgroundColor', this.options.color);
                        a = this.guiDom.color.data('colorGold');
                        a.color = this.options.color;
                        this.guiDom.size.data('ionRangeSlider').update({'from': this.options.size})
                        this.guiDom.offset.data('ionRangeSlider').update({'from': this.options.offset})
                        a.caller = this;
                        break;
                    case'background':
                        n = true;
                        if (!(this.guiDom.bg_g && this.guiDom.bg_g.is(':visible'))) {
                            n = false;
                            this.guiDom.bg_g = $('<div class="g"></div>');
                            this.guiDom.bg_g.appendTo(wrapper);
                            this.guiApi = {
                                'apply': function (u, e) {
                                    e = {'gradient': []};
                                    e.gradient.push({'stops': u.bItems, 'deg': u.angle, 'mode': u.bType})
                                    u.caller.update(e);
                                    ab.onStart(name);
                                    u.caller.apply();
                                    ab.onRender(name);
                                }, 'type': 'linear', 'angle': 0, 'caller': this
                            }
                        }
                        if (this.options.gradient) {
                            this.guiApi.items = this.options.gradient[0].stops, this.guiApi.angle = this.options.gradient[0].deg
                        }
                        if (n == false) {
                            this.guiDom.bg_c = $('<div class="c mt-3"><div class="colorplate" style="cursor:pointer;width:35px"></div></div>');
                            this.guiDom.bg_c.appendTo(wrapper);
                            this.guiDom.bg_color = this.guiDom.bg_c.find('.colorplate').colorGold().on('colorupdate', function (e, cl) {
                                this.style.backgroundColor = cl.color;
                                cl.caller.update({'color': cl.color});
                                ab.onStart(name);
                                cl.caller.apply();
                                ab.onRender(name);
                            });
                        }
                        this.guiDom.bg_g.empty().gradientGold(this.guiApi);
                        this.guiDom.bg_gType = this.guiDom.bg_g.find('.gradient_markup_wrapper:first > div:first').addClass('d-none');
                        this.guiDom.bg_gArray = this.guiDom.bg_gType.next();
                        this.guiDom.bg_gAngle = this.guiDom.bg_gArray.next('.gradient_markup_deg');
                        if (this.options.color) {
                            this.guiDom.bg_color.css('backgroundColor', this.options.color);
                        }
                        a = this.guiDom.bg_color.data('colorGold');
                        if (a) {
                            a.caller = this;
                            a.color = this.options.color;
                        }
                        if (n == false) {
                            e = $('<div class="w-100"><ul class="nav nav-tabs">' + ('<li class="nav-item"><a class="nav-link" href="#" data-value="color"><span>Solid</span></a></li>').repeat(2) + '</ul></div>');
                            e.prependTo(wrapper);
                            this.guiDom.bgTypes = e.find('ul > li a');
                            this.guiDom.bgTypes.last().attr('data-value', 'gradient').find('span').text('Gradient');
                            this.guiDom.bgTypes.on('click', {'caller': this}, function (e, p, a) {
                                e.preventDefault();
                                a = $(this);
                                a.addClass('active');
                                p = a.parents('div.w-100');
                                p.find('ul > li > a').not(this).removeClass('active');
                                a = a.attr('data-value');
                                a = a[0];
                                p.siblings('.c,.g').addClass('d-none').filter('.' + a).removeClass('d-none');
                            })
                        }
                        this.guiDom.bg_c.addClass('d-none');
                        this.guiDom.bg_g.addClass('d-none');
                        a = Object.keys(this.options)[0];
                        this.guiDom.bgTypes.filter('[data-value="' + a + '"]').trigger('click')
                        break;
                    default:
                        break;
                }
            }
            this.className = function () {
                return name;
            }
            f = add(this);
            this.filter = f;
        }
        svgObList.background = svgP;
        svgObList.opacity = svgP;
        svgObList.blur = svgP;
        svgObList.tear = svgP;
        svgObList.noise = svgP;
        svgObList.shadow = svgP;
        svgObList.mask = svgP;
        svgObList.clip = svgP;
        svgObList.overlay = svgP;
        svgObList.border = svgP;
        svgObList.hue = svgP;
        svgObList.brightness = svgP;
        svgObList.saturation = svgP;
        svgObList.glow = svgP;
        svgObList.customFx = function (name, opt, ab) {
            this.options = {};
            opt = name.substr(3);
            if (!c.filterMap[opt]) throw'Custom filter not available';
            this.lot = c.filters[c.filterMap[opt].g].items[c.filterMap[opt].i];
            if (!this.lot) throw'Custom filter could not be loaded';
            this.filter = $.map(this.lot.filters, function (e) {
                return $(e).clone().get(0)
            })
            this.svg = ab.dom;
            this.name = name;
            bind = function () {
                $(ab.dom).clone();
                ab.dom.setAttribute('filter', 'url(#' + ab.filter.id + ')');
            }
            this.update = function () {
            }
            this.destroy = function (a) {
                for (a = 0; this.filter.length > a; a++) {
                    this.filter[a].parentNode.removeChild(this.filter[a]);
                }
                delete ab.fx[name];
                bind();
                ab.onDelete(name);
            }
            this.apply = function () {
                ab.onRender(name);
            }
            this.gui = function (wrapper, w) {
                return;
                w = [];
                $.each(this.filter, function (i, e, n, f, o) {
                    n = e.nodeName.substr(2).toLowerCase();
                    o = {};
                    switch (n) {
                        case'gaussianblur':
                        case'dropshadow':
                        case'offset':
                        case'morphology':
                        case'turbulence':
                            f = '';
                            if (n == 'gaussianblur' || n == 'dropshadow' || n == 'morphology' || n == 'turbulence') {
                                f = '<input step="1" value="0" type="number" class="form-control" />'.repeat(2);
                                f = $('<div><div class="col-auto input-group">' + f + '</div></div>');
                                o.n = 'stdDeviation';
                                if (n == 'morphology') {
                                    o.n = 'radius';
                                } else if (n == 'turbulence') {
                                    o.n = 'baseFrequency';
                                }
                                o.p = e.getAttribute(o.n).split(' ');
                                if (o.p.length == 1) {
                                    o.p.push(o.p[0])
                                }
                                o.et = f.find('input').each(function (i) {
                                    $(this).attr('value', o.p[i]);
                                });
                                if (n == 'turbulence') {
                                    o.et.attr({'min': 0, 'step': '0.001'})
                                }
                                f = f.html();
                                f = '<p>' + o.n + '</p>' + f;
                            }
                            if (n == 'offset' || n == 'dropshadow') {
                                f = '<div class="col-4"><p>dx</p><input value="0" type="number" class="form-control" /></div>'.repeat(2);
                                f = $('<div>' + f + '</div>');
                                o.p = [e.getAttribute('dx'), e.getAttribute('dy')];
                                if (o.p[0] === null) o.p[0] = 0;
                                if (o.p[1] === null) o.p[1] = 0;
                                f.find('input').each(function (i) {
                                    $(this).attr('value', o.p[i])
                                }).last().prev().text('dy');
                                f = f.html();
                            }
                            w.push(f);
                            break;
                        case'blend':
                            f = ['normal', 'multiple', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
                            f = $.map(f, function (e) {
                                return '<option value="' + e + '">' + e + '</option>';
                            });
                            f = f.join();
                            w.push('<p>mode</p><div class="col-6"><select class="form-control">' + f + '</select></div>')
                            break;
                        case'displacementmap':
                            o = e.getAttribute('scale');
                            w.push('<p>scale</p><div class="col-6"><input value="' + o + '" type="number" class="form-control"></div>')
                            break;
                        case'specularlighting':
                            o.p1 = e.getAttribute('specularConstant');
                            o.p2 = e.getAttribute('lighting-color');
                            if (!o.p2) o.p2 = '';
                            f = '<div class="col-6"><p>specularConstant</p><input min="1" value="' + o.p1 + '" type="number" class="form-control"></div><div class="col-6"><p>lighting-color</p><input class="form-control" value="' + o.p2 + '" /></div>';
                            w.push(f);
                            break;
                        case'flood':
                            o.p = e.getAttribute('flood-color');
                            f = '<p>flood-color</p><div class="col-6"><input class="form-control" value="' + o.p + '" /></div>';
                            break;
                        case'composite':
                            f = ['in', 'out', 'atop', 'over', 'xor'];
                            f = $.map(f, function (e) {
                                return '<option value="' + e + '">' + e + '</option>';
                            });
                            f = f.join();
                            w.push('<p>operator</p><div class="col-6"><select class="form-control">' + f + '</select></div>')
                            break;
                    }
                })
                w = $.map(w, function (e) {
                    return '<div class="row m-0">' + e + '</div>';
                })
                w = w.join('<hr class="w-100">');
                w = '<div class="py-2">' + w + '</div>';
                wrapper.append(w);
            }
            return this;
        };
        c.svgFxOb().extend('textEdit', {
            'font': 'abeezee',
            'color': '#fff',
            'type': 'normal',
            'align': 'center',
            'size': 12,
            'line': 1,
            'text': null,
            'sym': 'text'
        }, function (name, opt, ab) {
            this.options = opt;
            var type = this.options.sym;
            if (this.options.line) {
                this.options.line = parseFloat(this.options.line);
            } else {
                this.options.line = 1;
            }
            if (this.options.spacing) {
                this.options.spacing = parseFloat(this.options.spacing);
            }
            if (isNaN(this.options.line)) this.options.line = 0;
            this.guiDom.Editor = new c.wordEditor(this.options);
            this.guiDom.Editor.caller = this;
            if (this.options.text && this.guiDom.Editor.textRange) {
                this.text = this.guiDom.Editor.textRange.join("\n");
                this.options.textString = this.text;
            }
            this.guiDom.text = this.svg.querySelector('g');
            if (type == 'button') {
                this.guiDom.btn = this.svg.querySelector('path');
            }
            this.offset = {};
            this.textChanged = true;
            this.toString = function (i) {
                o = {};
                o.string = '';
                o.range = {};
                o.current = false;
                o.yIndex = 0;
                o.g = document.createElementNS(c.domSvgNs, 'g');
                if (c.libs.fonts[this.options.font]) {
                    o.g.style.fontFamily = c.libs.fonts[this.options.font][this.options.type];
                }
                o.g.style.fontSize = this.options.size + 'px';
                o.current = document.createElementNS(c.domSvgNs, 'text');
                o.g.appendChild(o.current);
                for (i = 0; this.options.text.length > i; i++) {
                    o.ns = this.options.text[i].y;
                    o.l = o.ns;
                    if (!o.range[o.ns]) {
                        o.range[o.ns] = true;
                        o.l = parseFloat(o.ns);
                    }
                    o.string = document.createElementNS(c.domSvgNs, 'tspan');
                    o.string.append(this.options.text[i].s);
                    o.x = parseFloat(this.options.text[i].x)
                    o.string.setAttribute('x', o.x);
                    o.string.setAttribute('y', o.l);
                    o.current.appendChild(o.string);
                }
                return o.g;
            }
            this.toArray = function (e, cb, n) {
                n = smartDrawing_stringToText(e, this.options).done(function (r, u) {
                    u.caller.options.text = r;
                    if (typeof u.cb == 'function') {
                        u.caller.event = u.cb;
                        u.caller.event();
                        delete u.caller.event;
                    }
                });
                n.cb = cb;
                n.caller = this;
            }
            this.getOffset = function () {
                return this.offset;
            }
            this.getBoundary = function () {
                return this.guiDom.text.getBoundingClientRect();
            }
            this.writeText = function (textElement, e) {
                $(this.guiDom.text).replaceWith(textElement);
                this.guiDom.text = textElement;
                e = this.guiDom.text.getBBox();
                if (type == 'text') {
                    this.offset.x = e.x;
                    this.offset.y = e.y;
                    this.offset.w = e.width;
                    this.offset.h = e.height;
                    this.svg.setAttribute('viewBox', e.x + ' ' + e.y + ' ' + e.width + ' ' + e.height);
                } else {
                    this.bb = this.guiDom.btn.getBBox();
                    this.left = (this.bb.width - e.width) / 2;
                    this.top = (this.bb.height - e.height) / 2;
                    if (e.y < 0) {
                        this.i = parseFloat(e.y.toString().substr(1));
                        this.top += this.i;
                    }
                    this.xy = [this.left, this.top]
                    this.svg.setAttribute('viewBox', '0 0 ' + this.bb.width + ' ' + this.bb.height + '');
                    this.guiDom.text.setAttribute('transform', 'translate(' + this.left + ',' + this.top + ')');
                    this.guiDom.text.setAttribute('stroke', 'none');
                    this.applyFill();
                    delete this.i;
                    delete this.top;
                    delete this.left;
                    delete this.bb;
                }
            }
            this.applyText = function () {
                r = this.toString();
                this.writeText(r);
            }
            this.applyFill = function () {
                if (type == 'button') {
                    this.guiDom.text.setAttribute('fill', this.options.color);
                } else if (type == 'text') {
                    this.svg.setAttribute('fill', this.options.color);
                }
            }
            this.gui = function (w, e) {
                this.guiDom.wrapper = $('<div class="w-100"></div>');
                this.guiDom.wrapper.appendTo(w);
                e = {'container': this.guiDom.wrapper};
                if (!c.isRoller) e.hideText = true;
                if (type == 'button') {
                } else {
                    e.hideSize = true;
                    e.hideColor = true;
                }
                this.guiDom.Editor.gui(e);
                this.guiDom.Editor.on('color', function (cl) {
                    this.caller.update('color', cl.color);
                    this.caller.applyFill();
                    this.caller.textChanged = false;
                    ab.onRender(name);
                }).on('line', function (opt, e) {
                    this.caller.update('line', opt.line);
                    this.caller.textChanged = false;
                    this.caller.toArray(this.caller.text, function () {
                        this.applyText();
                        ab.onRender(name);
                    });
                }).on('text', function (e) {
                    e = this.guiDom.textInput.val();
                    this.caller.text = e;
                    this.caller.options.textString = e;
                    this.caller.textChanged = true;
                    this.caller.toArray(e, function () {
                        this.update('text', this.options.text);
                        this.applyText();
                        ab.onRender(name);
                    });
                }).on('font', function (opt) {
                    this.caller.update('font', opt.font);
                    this.caller.update('type', 'normal');
                    this.caller.textChanged = true;
                    this.caller.toArray(this.caller.text, function () {
                        this.applyText();
                        ab.onRender(name);
                    });
                }).on('type', function (opt) {
                    this.caller.update('type', opt.type);
                    this.caller.textChanged = true;
                    this.caller.toArray(this.caller.text, function () {
                        this.applyText();
                        ab.onRender(name);
                    });
                }).on('size', function (opt) {
                    this.caller.update('size', opt.size);
                    this.caller.textChanged = true;
                    this.caller.toArray(this.caller.text, function () {
                        this.applyText();
                        ab.onRender(name);
                    });
                }).on('align', function (opt) {
                    this.caller.update('align', opt.align);
                    this.caller.textChanged = false;
                    this.caller.toArray(this.caller.text, function () {
                        this.applyText();
                        ab.onRender(name);
                    });
                }).on('spacing', function (opt) {
                    this.caller.textChanged = true;
                    this.caller.update('spacing', opt.spacing);
                    this.caller.toArray(this.caller.text, function () {
                        this.applyText();
                        ab.onRender(name);
                    });
                })
            }
            this.update = function (key, value, k) {
                if (typeof key == 'object') {
                    this.options = $.extend(false, this.options, key);
                    this.textChanged = true;
                    this.guiDom.Editor.config = this.options;
                    this.guiDom.Editor.init();
                    if (key.textString) {
                        this.text = key.textString;
                    } else {
                        this.text = this.guiDom.Editor.textRange.join("\n");
                    }
                    this.options.textString = this.text;
                } else {
                    this.options[key] = value;
                }
                ab.onUpdate(name, this.options);
            }
            this.apply = function (k) {
                if (this.options.font && this.options.text && this.textChanged) {
                    this.toArray(this.text, function () {
                        this.applyText();
                        this.guiDom.Editor.config.text = this.options.text;
                        this.applyFill();
                    })
                } else if (this.guiDom.Editor.config.line !== this.options.line) {
                    this.guiDom.Editor.config.line = this.options.line;
                    this.applyText();
                }
                if (this.options.color) {
                    this.applyFill();
                }
                if (ab.child) {
                    ab.onRender(name);
                }
            }
            return this;
        });
    })(window)

    function roundPathCorners(pathString, radius, useFractionalRadius) {
        function moveTowardsLength(movingPoint, targetPoint, amount) {
            var width = (targetPoint.x - movingPoint.x);
            var height = (targetPoint.y - movingPoint.y);
            var distance = Math.sqrt(width * width + height * height);
            return moveTowardsFractional(movingPoint, targetPoint, Math.min(1, amount / distance));
        }

        function moveTowardsFractional(movingPoint, targetPoint, fraction) {
            return {
                x: movingPoint.x + (targetPoint.x - movingPoint.x) * fraction,
                y: movingPoint.y + (targetPoint.y - movingPoint.y) * fraction
            };
        }

        function adjustCommand(cmd, newPoint) {
            if (cmd.length > 2) {
                cmd[cmd.length - 2] = newPoint.x;
                cmd[cmd.length - 1] = newPoint.y;
            }
        }

        function pointForCommand(cmd) {
            return {x: parseFloat(cmd[cmd.length - 2]), y: parseFloat(cmd[cmd.length - 1]),};
        }

        var pathParts = pathString.split(/[,\s]/).reduce(function (parts, part) {
            var match = part.match("([a-zA-Z])(.+)");
            if (match) {
                parts.push(match[1]);
                parts.push(match[2]);
            } else {
                parts.push(part);
            }
            return parts;
        }, []);
        var commands = pathParts.reduce(function (commands, part) {
            if (parseFloat(part) == part && commands.length) {
                commands[commands.length - 1].push(part);
            } else {
                commands.push([part]);
            }
            return commands;
        }, []);
        var resultCommands = [];
        if (commands.length > 1) {
            var startPoint = pointForCommand(commands[0]);
            var virtualCloseLine = null;
            if (commands[commands.length - 1][0] == "Z" && commands[0].length > 2) {
                virtualCloseLine = ["L", startPoint.x, startPoint.y];
                commands[commands.length - 1] = virtualCloseLine;
            }
            resultCommands.push(commands[0]);
            for (var cmdIndex = 1; cmdIndex < commands.length; cmdIndex++) {
                var prevCmd = resultCommands[resultCommands.length - 1];
                var curCmd = commands[cmdIndex];
                var nextCmd = (curCmd == virtualCloseLine) ? commands[1] : commands[cmdIndex + 1];
                if (nextCmd && prevCmd && (prevCmd.length > 2) && curCmd[0] == "L" && nextCmd.length > 2 && nextCmd[0] == "L") {
                    var prevPoint = pointForCommand(prevCmd);
                    var curPoint = pointForCommand(curCmd);
                    var nextPoint = pointForCommand(nextCmd);
                    var curveStart, curveEnd;
                    if (useFractionalRadius) {
                        curveStart = moveTowardsFractional(curPoint, prevCmd.origPoint || prevPoint, radius);
                        curveEnd = moveTowardsFractional(curPoint, nextCmd.origPoint || nextPoint, radius);
                    } else {
                        curveStart = moveTowardsLength(curPoint, prevPoint, radius);
                        curveEnd = moveTowardsLength(curPoint, nextPoint, radius);
                    }
                    adjustCommand(curCmd, curveStart);
                    curCmd.origPoint = curPoint;
                    resultCommands.push(curCmd);
                    var startControl = moveTowardsFractional(curveStart, curPoint, .5);
                    var endControl = moveTowardsFractional(curPoint, curveEnd, .5);
                    var curveCmd = ["C", startControl.x, startControl.y, endControl.x, endControl.y, curveEnd.x, curveEnd.y];
                    curveCmd.origPoint = curPoint;
                    resultCommands.push(curveCmd);
                } else {
                    resultCommands.push(curCmd);
                }
            }
            if (virtualCloseLine) {
                var newStartPoint = pointForCommand(resultCommands[resultCommands.length - 1]);
                resultCommands.push(["Z"]);
                adjustCommand(resultCommands[0], newStartPoint);
            }
        } else {
            resultCommands = commands;
        }
        return resultCommands.reduce(function (str, c) {
            return str + c.join(" ") + " ";
        }, "");
    }

    c.setEditorDefaultSetting = function () {
        c.domSidebarToggleLinks.find('a[href="#bg"]').trigger('click');
    }
    updateGrid = function (s, e, x, r) {
        s = c.domGrid.removeClass('d-none').find('svg').get(0);
        x = s.getBBox();
        r = $(s).find('rect');
        if (c.grid_color) {
            r.attr('stroke', c.grid_color)
        }
        if (c.grid_size) {
            r.attr('stroke-width', c.grid_size)
        }
        s.setAttribute('viewBox', x.x + ' ' + x.y + ' ' + x.width + ' ' + x.height);
        e = new XMLSerializer().serializeToString(s);
        e = 'data:image/svg+xml;base64,' + btoa('<?xml version="1.0" encoding="UTF-8" standalone="no"?>' + e);
        x = $(document.head).find('style[id=gridLock]');
        if (x.length == 0) {
            x = $('<style id="gridLock"></style>');
            x.appendTo(document.head)
        }
        x.text('#viewport_stage_wrapper.showGrid > div:after{background:url(' + e + ');content:" ";position:absolute;width:100%;height:100%;top:0}')
        c.domGrid.addClass('d-none');
        $(s).removeAttr('viewBox')
    }
    updateEffects = function (i, a) {
        for (i = 0; c.slides.length > i; i++) {
            a = c.slides[i].elements;
            a = Object.values(a);
            if (a.length == 0) continue;
            $.each(a, function (i, e) {
                i = c.idCache[this.prop.uid];
                if (i) {
                    try {
                        e = c.domCanvas.find('.objectBox[scope="' + this.id + '"] > .object svg:first');
                        i.fx.init(e);
                        i.fx.applyAll();
                    } catch (e) {
                    }
                }
            })
        }
    }
    c.wordEditor = function (opt) {
        var selfEditor = this;
        this.guiDom = {};
        this.callbacks = {};
        this.config = {
            'font': 'abeezee',
            'size': 12,
            'line': 0,
            'spacing': 1,
            'type': 'normal',
            'color': '#000',
            'align': 'center',
            'text': [],
        }
        this.svg = false;
        if (opt.font !== undefined && c.libs.fonts[opt.font]) this.config.font = opt.font;
        if (opt.size !== undefined) this.config.size = opt.size;
        if (opt.line !== undefined) this.config.line = opt.line;
        if (opt.type !== undefined && c.libs.fonts[opt.font] && c.libs.fonts[opt.font][opt.type]) this.config.type = opt.type;
        if (opt.color !== undefined) this.config.color = opt.color;
        if (opt.align !== undefined) this.config.align = opt.align;
        if (opt.spacing !== undefined) this.config.spacing = opt.spacing;
        if (opt.text !== undefined) this.config.text = opt.text;
        this.init = function () {
            this.ns_w = {};
            this.textRange = [];
            for (e = 0; this.config.text.length > e; e++) {
                this.ns = this.config.text[e].y.toString();
                if (!this.ns_w[this.ns]) {
                    this.ns_w[this.ns] = true;
                    this.textRange.push('');
                }
                this.textRange[this.textRange.length - 1] += this.config.text[e].s;
            }
            this.textRange = Object.values(this.textRange);
            delete this.ns_w;
            delete this.ns;
        }
        this.gui = function (opt, e, p) {
            p = $('<div class="row m-0"></div>');
            p.appendTo(opt.container);
            this.guiDom.wrapper = p;
            if (opt.hideColor !== true) {
                e = $('<div class="col-12" id="textEdit_color_w"><div class="col-2 float-left p-4"><span>Color</span></div><div class="col-8 float-right p-4"><div class="colorplate" style="cursor:pointer;width:35px"></div></div></div><hr class="w-100">');
                this.guiDom.color = e.find('.colorplate');
                e.appendTo(p);
            }
            if (opt.hideFont !== true) {
                e = $('<div id="textEdit_font_w" class="col-12 pb-0 pt-0"><p>Select Font</p><div class="input-group"><div class="input-group-addon"><span class="fa fa-caret-down"></span></div><input readonly class="form-control" /></div><div class="input-group"><select class="form-control" size></select></div></div><hr class="w-100">');
                this.guiDom.fontTrigger = e.find('.input-group-addon');
                this.guiDom.type = e.find('select');
                this.guiDom.fontFeed = e.find('input');
                e.appendTo(p);
            }
            if (opt.hideText !== true) {
                e = $('<div id="textEdit_text_w" class="col-12 pb-0 pt-2"><div class="form-group"><textarea class="form-control" style="border-radius: 0;"></textarea><button class="btn btn-sm btn-primary btn-block">Apply text</button></div></div>');
                this.guiDom.textInput = e.find('textarea');
                this.guiDom.textSave = this.guiDom.textInput.next('button');
                e.appendTo(p)
            }
            if (opt.hideAlign !== true) {
                e = $('<div class="col-12 pb-0 pt-2" id="textEdit_align_w"><div class="btn-group"><button id="text_left" class="btn btn-link"><span class="fa fa-align-left"></span></button><button id="text_center" class="btn btn-link"><span class="fa fa-align-center"></span></button><button id="text_right" class="btn btn-link"><span class="fa fa-align-right"></span></button></div></div>');
                this.guiDom.align = e.find('.btn-group > button');
                e.appendTo(p);
            }
            if (opt.hideLine !== true) {
                e = $('<div class="col-12" id="textEdit_line_w"><p>' + c.language('editor_ui_lineh') + '</p><input type="hidden" /></div><hr class="w-100">');
                this.guiDom.lineHeight = e.find('input');
                e.appendTo(p);
            }
            if (opt.hideSpacing !== true) {
                e = $('<div class="col-12" id="textEdit_spacing_w"><p>' + c.language('editor_ui_wdspace') + '</p><input type="hidden" /></div><hr class="w-100">');
                this.guiDom.wordSpacing = e.find('input');
                e.appendTo(p);
            }
            if (opt.hideSize !== true) {
                e = $('<div class="col-12 pb-2" id="textEdit_size_w"><p>Font size</p><div class="row"><div class="col-4 d-flex align-items-center"><input value="0" id="size" type="number" class="form-control"/></div><div class="col"><input id="size_scale" class="form-control"></div></div></div><hr>');
                this.guiDom.size = e.find('input[id=size_scale]');
                this.guiDom.sizeFeed = e.find('input[id=size]');
                e.appendTo(p);
            }
            if (this.guiDom.color) {
                this.guiDom.color.data({'color': this.config.color}).colorGold().on('colorupdate', {'caller': this}, function (e, cl) {
                    e.data.caller.update({'color': cl.color});
                    this.style.backgroundColor = cl.color;
                    e.data.caller.apply('color');
                }).data('colorGold').color = this.config.color;
            }
            if (this.guiDom.align) {
                this.guiDom.align.on('click', function () {
                    selfEditor.guiDom.align.not(this).removeAttr('disabled');
                    e = this.id.substr(5).toLowerCase();
                    selfEditor.update({'align': e});
                    selfEditor.apply('align');
                })
            }
            if (this.guiDom.type) {
                this.guiDom.type.on('change', {'caller': this}, function (e, v) {
                    v = $(this).val();
                    if (!v || v == "") return;
                    if (c.libs.fonts[e.data.caller.guiDom.fontMenu.activeFont][v]) {
                        e.data.caller.update({'type': v});
                        e.data.caller.apply('type');
                    }
                })
            }
            if (this.guiDom.textInput) {
                this.guiDom.textSave.on('click', {'caller': this}, function (e) {
                    $(this).attr('disabled', true);
                    e.data.caller.apply('text');
                })
            }
            if (this.guiDom.sizeFeed) {
                this.guiDom.sizeFeed.on('input', {'caller': this}, function (e) {
                    v = this.value.trim();
                    v = parseFloat(v);
                    if (isNaN(v)) return;
                    e.data.caller.guiDom.sizeSlide.update({'from': v});
                    e.data.caller.update({'size': v});
                    window.setTimeout(function () {
                        selfEditor.apply('size');
                    }, 500)
                    e.data.caller.update({'size': v});
                })
            }
            if (this.guiDom.textInput) {
                this.guiDom.textInput.on('input', {'caller': this}, function (e, i) {
                    if (['insertText', 'inserttext'].indexOf(e.originalEvent.inputType) !== -1 && e.originalEvent.data !== null) {
                        i = getInputPointer(this);
                        notify('workspace.afterTextTyping', i);
                    }
                    e.data.caller.guiDom.textSave.removeAttr('disabled');
                }).on('focusin', function () {
                    c.editingActive = true;
                    window.clearInterval(c.keyboardEventKeepTimer);
                }).on('focusout', function () {
                    c.editingActive = false;
                })
            }
            if (this.guiDom.lineHeight) {
                this.guiDom.lineHeight.ionRangeSlider({
                    'step': 0.25,
                    'max': 20,
                    'min': 1,
                    'caller': this,
                    'onChange': function (e) {
                        this.caller.update({'line': e.from});
                    },
                    'onFinish': function () {
                        this.caller.apply('line');
                    }
                });
                this.guiDom.lineSlide = this.guiDom.lineHeight.data('ionRangeSlider');
            }
            if (this.guiDom.wordSpacing) {
                this.guiDom.wordSpacing.ionRangeSlider({
                    'max': 10, 'min': 0, 'caller': this, 'onChange': function (e) {
                        this.caller.update({'spacing': e.from});
                    }, 'onFinish': function () {
                        this.caller.apply('spacing');
                    }
                });
                this.guiDom.wordSpacingSlide = this.guiDom.wordSpacing.data('ionRangeSlider')
            }
            if (this.guiDom.size) {
                this.guiDom.size.ionRangeSlider({
                    'max': 100, 'min': 12, 'caller': this, 'onChange': function (e) {
                        this.caller.update({'size': e.from});
                        this.caller.guiDom.sizeFeed.val(e.from);
                    }, 'onFinish': function () {
                        this.caller.apply('size');
                    }
                });
                this.guiDom.sizeSlide = this.guiDom.size.data('ionRangeSlider');
            }
            if (this.guiDom.fontTrigger) {
                this.guiDom.fontTrigger.menu({
                    'items': $.map(c.libs.fonts, function (e, i) {
                        return '<a href="#" class="d-flex align-items-center" data-value="' + i + '" data-text="' + i[0].toUpperCase() + i.substr(1) + '"><span class="d-block"><img class="img-fluid" src="' + c.policySetup.PUBLIC_IMAGE_REPO + '/library/font_image/' + i + '.png" /></span></a>';
                    }), 'caller': this, 'show': function (e, ui) {
                        if (!ui.activeFont) return;
                        t = ui.menu.find('.menu:first ul > li a[data-value="' + ui.activeFont + '"]');
                        ui.menu.find('.menu:first').scrollTop(t.parent().get(0).offsetTop - t.outerHeight());
                    }, 'hide': function (e, ui) {
                        ui.clearSearch();
                    }, 'init': function (e, ui) {
                        ui.activeFont = null;
                        ui.menu.appendTo(ui.config.caller.guiDom.wrapper);
                        ui.menu.css('position', 'fixed');
                        ui.searchInput = ui.menu.find('.menu').scrollTop(0).addClass('fancyscroll').css({
                            'height': 350,
                            'overflow-y': 'auto'
                        }).before('<div class="p-2"><input class="mac w-100" placeholder="Search here"></div>').prev().find('input');
                        ui.searchInput.on('input', {'caller': ui}, function (ev, e) {
                            e = $(this).val();
                            e = $.trim(e);
                            clearTimeout(ev.data.caller.searchingT);
                            if (e.length == 0) {
                                ev.data.caller.clearSearch();
                                return;
                            }
                            ev.data.caller.searchingT = window.setTimeout(function () {
                                selfEditor.guiDom.fontMenu.search();
                            }, 200)
                        })
                        ui.menu.find('.menu ul > li > a[data-value]').on('click', {'caller': ui.config.caller}, function (ev, e, i) {
                            e = $(this);
                            ev.data.caller.guiDom.fontMenu.hide();
                            i = ev.data.caller.guiDom.fontMenu.activeFont;
                            ev.data.caller.guiDom.fontMenu.select(e.data('value'));
                            if (i != ev.data.caller.guiDom.fontMenu.activeFont) {
                                ev.data.caller.update({'font': ev.data.caller.guiDom.fontMenu.activeFont});
                                ev.data.caller.update({'type': 'normal'});
                                ev.data.caller.apply('font');
                            }
                        })
                        ui.menu.css('width', ui.element.parent().width());
                        ui.select = function (v, v2, t) {
                            if (!this.menu) {
                                this.init();
                            }
                            t = this.menu.find('.menu ul > li > a[data-value="' + v + '"]');
                            if (t.length == 0) return;
                            if (c.libs.fonts[v] == undefined) return;
                            this.config.caller.guiDom.fontFeed.val(t.data('text'));
                            if (this.activeFont) {
                                this.menu.find('.menu ul > li a[data-value="' + this.activeFont + '"] i.fa').remove();
                            }
                            t.find('i.fa').remove();
                            t.prepend('<i class="fa fa-caret-right"></i>')
                            this.activeFont = v;
                            this.updateVary();
                            if (v2 && c.libs.fonts[v][v2]) {
                                this.config.caller.guiDom.type.val(v2)
                            }
                        }
                        ui.updateVary = function (e, a, va) {
                            if (!this.activeFont) return;
                            e = this.activeFont;
                            a = Object.keys(c.libs.fonts[e]);
                            va = this.config.caller.guiDom.type.empty().append('<option value="">Please select font variation</option>');
                            $.each(a, function (i, f) {
                                if (['normal', 'bold', 'italic'].indexOf(f) !== -1) return;
                                va.append('<option style="font-family:' + c.libs.fonts[e][f] + '" value="' + f + '">' + f + '</option>');
                            })
                        }
                        ui.search = function (i, v, l) {
                            l = this.menu.find('.menu ul > li');
                            l.filter('.active').removeClass('active')
                            this.menu.addClass('searching');
                            v = this.searchInput.val();
                            v = $.trim(v);
                            i = new RegExp(v, 'i');
                            l.each(function (e, v) {
                                e = $(this);
                                v = e.children('a[data-value]:first');
                                if (v.length == 0) return;
                                v = v.data('value').toString();
                                v = v.match(i);
                                if (v) {
                                    e.addClass('active')
                                }
                            })
                        }
                        ui.clearSearch = function () {
                            this.searchInput.val('');
                            this.menu.removeClass('searching');
                            this.menu.find('.menu ul > li.active').removeClass('active')
                        }
                    }
                })
                this.guiDom.fontMenu = this.guiDom.fontTrigger.menu('widget');
                this.guiDom.fontFeed.on('click', {'caller': this}, function (e) {
                    e.data.caller.guiDom.fontMenu.show();
                });
                this.guiDom.fontMenu.init();
                this.guiDom.fontMenu.select(this.config.font, this.config.type);
            }
            if (this.guiDom.color) {
                this.guiDom.color.css('backgroundColor', this.config.color);
                this.guiDom.color.data('colorGold').color = this.config.color;
            }
            if (this.guiDom.type) {
                this.guiDom.type.val(this.config.type);
            }
            if (this.guiDom.lineSlide) {
                this.guiDom.lineSlide.update({'from': this.config.line});
            }
            if (this.guiDom.wordSpacingSlide) {
                this.guiDom.wordSpacingSlide.update({'from': this.config.spacing});
            }
            if (this.guiDom.sizeSlide) {
                this.guiDom.sizeSlide.update({'from': this.config.size});
            }
            if (this.guiDom.sizeFeed) {
                this.guiDom.sizeFeed.val(this.config.size);
            }
            if (this.guiDom.align) {
            }
            if (this.guiDom.textSave) {
                this.guiDom.textSave.attr('disabled', true);
            }
            if (this.config.text && this.guiDom.textInput) {
                this.guiDom.textInput.val(this.textRange.join("\n"));
            }
        }
        this.on = function (ev, cb) {
            if (this.config[ev] !== undefined && typeof cb == 'function') {
                this.callbacks[ev] = cb;
            }
            return this;
        }
        this.apply = function (opt, e) {
            if (this.callbacks[opt]) {
                this.event = this.callbacks[opt];
                this.event(this.config);
                delete this.event;
            }
        }
        this.update = function (opt, k) {
            if (!opt) return;
            k = Object.keys(opt)[0];
            this.config[k] = opt[k];
        }
        this.destroy = function () {
            this.guiDom.fontMenu.destroy();
            this.guiDom.wrapper.remove();
        }
        if (this.config.text) {
            this.init();
        }
    }
    htmlbgd2SvgObject = function (bg, o) {
        o = {};
        if (typeof bg !== 'object') return;
        o.t = Object.keys(bg)[0];
        switch (o.t) {
            case'color':
                if (bg.color == '00000000' || bg.color == '#00000000') {
                    return {'color': '#0000'};
                }
                return {'color': '#' + bg.color.replace('#', '')};
                break;
            case'gradient':
                o.bg = {'gradient': []};
                o.mode = 'linear';
                if (typeof bg.gradient !== 'object') {
                    bg.gradient = c.bg_gradients_native[bg.gradient];
                }
                o.deg = bg.gradient.deg.replace(/[^\d.]/g, '');
                if (o.deg == '') o.deg = 50;
                if (bg.gradient.mode.indexOf('r') === 0) o.mode = 'radial';
                o.bg.gradient.push({'stops': bg.gradient.stops, 'deg': o.deg, 'mode': o.mode});
                return o.bg;
                break;
            case'texture':
            case'image':
                if (o.t == 'texture') {
                    o.url = c.bg_textures_string[bg.texture];
                } else {
                    o.url = bg.image;
                }
                return {'url': o.url, 'y': bg.y, 'x': bg.x, 'size': bg.zoom};
                break;
        }
        return false;
    }
    colorToMatrix = function (ag, cl, f) {
        cl = {'r': 0, 'g': 0, 'b': 0, 'a': 1};
        if (ag && ag.r) cl.r = ag.r;
        if (ag && ag.g) cl.g = ag.g;
        if (ag && ag.b) cl.b = ag.b;
        if (ag && ag.a) cl.a = ag.a;
        f = '' + ((cl.r / 255)) + ' 0 0 0 0' + "\n";
        f += '0 ' + ((cl.g / 255)) + ' 0 0 0' + "\n";
        f += '0 0 ' + ((cl.b / 255)) + ' 0 0' + "\n";
        f += '0 0 0 ' + cl.a + ' 0';
        return f;
    }
    c.clearPropClean = function () {
        Events.off('obj.*.inspector');
        if (c.menuFx && c.menuFx.destroy) {
            c.menuFx.clear();
        }
        if (c.menuFxList && c.menuFxList.destroy) {
            c.menuFxList.clear();
        }
        if (c.domPropFontMenu) {
            c.domPropFontMenu.onSelect = null;
        }
    }
    getInputPointer = function (e, o, s) {
        s = {};
        try {
            if (!e) {
                o = window.getSelection();
                s.value = o.anchorNode.parentNode.textContent;
                s.node = o.anchorNode;
            } else {
                o = {};
                s.value = e.value || e.textContent;
                o.anchorOffset = e.selectionStart;
                s.node = e;
            }
            s.Tabs = s.value.split("\n");
            s.value = s.value.replace("\n", '')
            if (e) {
                o.anchorNode = {'wholeText': s.value}
            }
            s.now = o.anchorNode.wholeText.substr(o.anchorOffset - 1, 1);
            s.after = o.anchorNode.wholeText.substr(o.anchorOffset);
            s.before = o.anchorNode.wholeText.substr(0, o.anchorOffset - 1);
            s.cursor = o.anchorOffset;
        } catch (e) {
        }
        return s;
    }
    drawPencil = function (cf, default_config, self, pencils) {
        pencils = ['line', 'square', 'polygon', 'polyline', 'pencil', 'circle']
        default_config = {
            'helper': $.noop,
            'item': $.noop,
            'start': $.noop,
            'stop': $.noop,
            'init': $.noop,
            'draw': $.noop,
            'mouse': true,
            'loop': true,
            'drawboard': c.domStage,
            'container': c.domCanvas.children('div:visible:first'),
            'interactive': false,
            'type': 'line'
        }
        this.config = default_config;
        if (typeof cf == 'object') {
            this.config = $.extend(true, default_config, cf);
        }
        this.snapshot = [];
        mapEvents = function () {
            self.helper.off('.draw').on('click.draw', function (e, u) {
                if (self.config.interactive !== true) {
                    self.stop();
                } else {
                    self.event = e;
                }
            }).on('mousedown.draw', function (e) {
                e.preventDefault();
                self.event = e;
                if (!self.config.interactive) {
                    self.start();
                } else if (self.config.interactive && !self.active) {
                    self.start();
                } else {
                    self.calcMath();
                    self.draw();
                }
            }).on('mousemove.draw', function (e) {
                if (self.active !== true) return;
                self.event = e;
                if (self.config.interactive !== true) {
                    self.draw();
                }
            }).one('mouseup.draw', function (e) {
                self.event = e;
                if (self.config.interactive !== true) {
                    self.stop();
                }
            })
            self.drawboard.off('.draw').on({
                'mousedown.draw': function (e, u) {
                    e.preventDefault();
                    if (self.config.interactive == true && self.active) {
                        self.event = e;
                        self.calcMath();
                        self.draw();
                        return;
                    }
                    self.event = e;
                    self.start();
                }, 'mousemove.draw': function (e, u) {
                    u = c.activeDrawHelper;
                    if (u.config.interactive == true || u.active !== true && u.config.mouse == true) {
                        u.helper.css({'left': e.pageX, 'top': e.pageY, 'zIndex': 998})
                    }
                    if (u.active !== true) return;
                    u.event = e;
                    if (u.config.interactive !== true) {
                        u.draw();
                    }
                }, 'mouseup.draw': function (e) {
                    c.activeDrawHelper.event = e;
                    if (!c.activeDrawHelper.config.interactive) {
                        c.activeDrawHelper.stop();
                        return;
                    }
                    c.activeDrawHelper.event = e;
                    if (!c.activeDrawHelper.active) {
                        c.activeDrawHelper.start();
                    } else {
                    }
                }
            })
        }

        function getMarker() {
            if (['circle', 'line', 'square'].indexOf(self.config.type) != -1) {
                o.i = $(c.drawingShapes[self.config.type]);
                if (self.config.type == 'line' && c.activeDrawHelperBrushThickness) {
                    o.i.find('line:first').css({
                        'stroke-width': c.activeDrawHelperBrushThickness,
                        'stroke': c.activeDrawHelperColor
                    })
                } else {
                    o.i.attr('fill', c.activeDrawHelperColor)
                }
                return o.i;
            } else if (self.config.type !== 'pencil') {
                return $('<span id="draw-shape-point" class="btn btn-rounded btn-sm p-0"><i class="fa fa-circle fa-1x"></i></span>');
            } else {
                return '';
            }
        }

        this.draw = function (e) {
            this.item = getMarker();
            if (typeof this.item == 'object') {
                e = $(this.item);
            } else if (this.item !== false) {
                e = this.helper;
            } else {
                e = 0;
            }
            if (e) {
                e.wrap('<div/>');
            }
            if (this.loop === true || (this.loop != false && this.snapshot.length < this.loop)) {
                if (e) {
                    this.snapshot.unshift(e.parent());
                    this.snapshot[0].css({
                        'left': this.math.left,
                        'top': this.math.top,
                        'position': 'absolute',
                        'zIndex': 99999998
                    }).appendTo(this.container);
                } else {
                    this.snapshot.unshift(e);
                }
                prepareDraw();
                this.config.draw(this.el, this.snapshot[0], this.math);
            } else {
                prepareDraw();
                this.config.draw(this.el, this.snapshot[0], this.math);
            }
            this.calcMath();
        }
        this.stop = function () {
            this.drawboard.off('mouseup.draw').off('mousedown.draw').off('mousemove.draw');
            if (this.helper && this.helper.length > 0) {
                this.helper.remove();
            }
            if (this.active && this.snapshot.length > 0) {
                prepareStop();
            }
            this.active = false;
            this.snapshot = [];
            this.container.removeClass('draw-active');
        }

        function prepareStart() {
            window.clearTimeout(c.activeDrawHelper.timers_ev);
            c.domDocBody.find('.drawtool_o').addClass('d-none').empty();
            c.activeDrawHelper.drawType = self.config.type
            w = c.activeDrawHelper.container.width();
            h = c.activeDrawHelper.container.height();
            c.activeDrawHelper.cofst = {'w': w, 'h': h}
            c.activeDrawHelper.container.find('.svg-w').remove();
            if (c.activeDrawHelper.config.interactive == true || c.activeDrawHelper.drawType == 'pencil') {
                c.activeDrawHelper.cofst.obj = c.activeDrawHelper.container.append('<div class="svg-w" style="position:absolute;z-index:998;left:0px;top:0px;background:#0c0c0c29;"><svg width="' + w + '" height="' + h + '"><polyline fill="none" ></polyline></svg></div>').children(':last').css('position', 'absolute');
                c.activeDrawHelper.cofst.obj_i = c.activeDrawHelper.cofst.obj.find('polyline').css({
                    'stroke-width': c.activeDrawHelperBrushThickness,
                    'stroke': c.activeDrawHelperColor
                })
            }
        }

        function prepareStop(e, s, m) {
            c.domDocBody.find('.drawtool_o').remove();
            self.drawboard.css('cursor', '')
            if (self.snapshot.length == 0) return;
            o = {};
            o.type = c.activeDrawHelper.drawType;
            if (o.type == 'brush') {
            } else if (['circle', 'line', 'square'].indexOf(o.type) != -1) {
                o.i = $(self.snapshot[0]);
                o.w2 = o.i.width();
                o.h2 = o.i.height();
                o.build = {'sym': o.type, 'background': {'color': '#0000'}}
                o.bx = o.i.children('svg:first').get(0).getBBox();
                o.build.off = {'x': o.bx.x, 'y': o.bx.y, 'w': o.bx.width, 'h': o.bx.height,}
                o.build.w = o.w2
                o.build.h = o.h2
                o.w1 = o.i.get(0).style.width;
                o.h1 = o.i.get(0).style.height;
                if (o.type == 'line' && c.activeDrawHelperBrushThickness) {
                    o.build.border = {'size': c.activeDrawHelperBrushThickness, 'color': c.activeDrawHelperColor};
                }
                if (['circle', 'square'].indexOf(o.type) !== -1) {
                    o.build.background = {'color': c.activeDrawHelperColor}
                }
                self.drawing = {
                    'data': o.i,
                    'build': o.build,
                    'cord': {'left': self.math.x, 'top': self.math.y, 'width': o.w1, 'width': o.h1}
                }
            } else if (o.type == 'polygon' || o.type == 'polyline' || o.type == 'pencil') {
                $.each(c.activeDrawHelper.points, function (i, e) {
                    e[0].remove();
                })
                if (c.activeDrawHelper.cofst.points.length < 2) {
                    o.svg.remove();
                    return;
                }
                o.s = c.activeDrawHelper.container;
                o.svg = c.activeDrawHelper.cofst.obj;
                if (!notify('obj.beforeCreate')) {
                    o.svg.remove();
                    return;
                }
                o.p = c.activeDrawHelper.cofst.points;
                o.b = c.activeDrawHelper.cofst.obj_i.get(0).getBBox();
                o.build = {'sym': 'path', 'variant': o.type, 'background': {'color': '#0000'}}
                o.h = o.b.height;
                o.w = o.b.width;
                o.build.off = {'w': o.b.width, 'h': o.b.height, 'x': o.b.x, 'y': o.b.y}
                o.build.cmd = o.p.join(' ')
                o.build.border = {'size': c.activeDrawHelperBrushThickness, 'color': '#000'};
                if (o.type == 'polygon') {
                    o.build.background = {'color': c.activeDrawHelperColor}
                } else {
                    o.build.border.color = c.activeDrawHelperColor
                }
                o.svg.css({'width': o.w, 'height': o.h});
                self.drawing = {
                    'build': o.build,
                    'data': o.svg,
                    'cord': {
                        'left': o.b.x,
                        'top': o.b.y,
                        'width': (o.w / c.activeDrawHelper.container.width()) * 100 + '%',
                        'height': (o.h / c.activeDrawHelper.container.height()) * 100 + '%'
                    }
                }
            }
            self.config.stop(self.drawing, self.snapshot, self.math);
            o = '';
            delete c.activeDrawHelper.cofst;
        }

        function prepareDraw() {
            o = {};
            if (c.activeDrawHelper.drawType == 'circle') {
                o.stl = {'width': (self.math.width / c.activeDrawHelper.cofst.w) * 100 + '%', 'height': 'auto'};
            } else if (c.activeDrawHelper.drawType == 'line') {
                o.stl = {
                    'height': (20 / c.activeDrawHelper.cofst.h) * 100 + '%',
                    'width': (self.math.width / c.activeDrawHelper.cofst.w) * 100 + '%'
                };
            } else if (c.activeDrawHelper.drawType == 'square') {
                o.stl = {'width': (self.math.width / c.activeDrawHelper.cofst.w) * 100 + '%', 'height': 'auto'};
            } else if (c.activeDrawHelper.drawType == 'polygon' || c.activeDrawHelper.drawType == 'polyline' || c.activeDrawHelper.drawType == 'pencil') {
                if (c.activeDrawHelper.drawType !== 'pencil') {
                    c.activeDrawHelper.points.push([self.snapshot[0], self.math]);
                }
                if (!c.activeDrawHelper.cofst.points) {
                    c.activeDrawHelper.cofst.points = [];
                }
                c.activeDrawHelper.cofst.points.push(self.math.left + ',' + self.math.top);
                c.activeDrawHelper.cofst.obj_i.attr('points', c.activeDrawHelper.cofst.points.join(' '))
            }
            if (o.stl) {
                $(self.snapshot[0]).css(o.stl);
            }
        }

        this.calcMath = function (s) {
            if (!this.event) return;
            this.math.left = ((this.event.pageX) - this.box.x) + c.domWindow.scrollLeft();
            this.math.top = ((this.event.pageY) - this.box.y) + c.domWindow.scrollTop();
            this.math.height = ((this.event.pageY) - (this.startEvent.pageY));
            this.math.width = ((this.event.pageX) - (this.startEvent.pageX));
        }
        this.start = function (s) {
            if (this.active !== true) {
                this.active = true;
                this.startMath = {};
                this.box = this.container.get(0).getBoundingClientRect();
                this.startMath.left = ((this.event.pageX) - this.box.x) + c.domWindow.scrollLeft();
                this.startMath.top = ((this.event.pageY) - this.box.y) + c.domWindow.scrollTop();
                this.startEvent = this.event;
                this.math = this.startMath;
                this.height = 0;
                this.width = 0;
                this.originalWidth = this.width;
                this.originalHeight = this.height;
                this.math.x = this.startMath.left;
                this.math.y = (this.startMath.top);
                prepareStart();
                this.config.start(this.el, this.math);
                this.item = this.config.item(this.el, {'items': this.snapshot});
                Events.one('shortcutevents.27', 'after', function (u) {
                    u = c.activeDrawHelper;
                    if (u) {
                        u.drawboard.css('cursor', '')
                        u.stop();
                    }
                })
            }
            if (!this.config.interactive) {
                this.helper.hide(0);
            }
        }
        this.abort = function () {
            toastr.info(c.language('editor_ui_msg_drawexit'));
            this.drawboard.css('cursor', '')
            this.stop();
        }
        this.init = function () {
            c.activeDrawHelper = self = this;
            if (pencils.indexOf(this.config.type) === -1) {
                return this;
            }
            if (this.config.type == 'polygon' || this.config.type == 'polyline') {
                this.config.interactive = true;
            }
            this.container = $(this.config.container);
            this.drawboard = $(this.config.drawboard);
            if (this.container.is('.draw-active')) {
                this.stop();
                return;
            }
            c.transformHandler.disable();
            this.helper = $(this.config.helper(this)).clone(false).addClass('uidrawing-helper');
            c.domDocBody.find('.uidrawing-helper').remove();
            if (this.helper.length == 0) {
                this.config.mouse = false;
            }
            this.helper.appendTo(document.body);
            this.helper.css({
                'position': 'fixed',
                'margin': '0',
                'padding': '0'
            }).removeAttr('id title').removeClass('ml-3');
            if (this.config.interactive == true) {
                this.helper.attr('title', c.language('editor_ui_tip_note2'));
            } else {
                this.helper.attr('title', c.language('editor_ui_tip_note0'));
            }
            this.o = this.container.offset();
            mapEvents();
            if (!notify('workspace.beforeStartDrawTool')) {
                c.activeDrawHelper.stop();
                return;
            }
            self.drawboard.css('cursor', 'crosshair')
            o = {};
            o.b = c.domDocBody.find('.drawtool_o').hide(0).empty();
            if (self.config.type == 'polygon' || self.config.type == 'polyline' || self.config.type == 'pencil') {
                c.activeDrawHelper.loop = true;
                c.activeDrawHelper.points = [];
            } else {
                c.activeDrawHelper.loop = 1;
            }
            window.clearTimeout(c.activeDrawHelper.timers_ev);
            c.activeDrawHelper.timers_ev = window.setTimeout(function () {
                c.activeDrawHelper.abort();
            }, 5000);
            if (typeof this.config.init == 'function') this.config.init();
            if (['line', 'brush', 'erase'].indexOf(self.config.type) !== -1) {
            } else {
                return;
            }
        }
        return this;
    }
    Custom_Original_Events = function () {
        events = {};
        this.on = function (e, n, cb, data, i, f, ns) {
            i = e.split('.');
            if (i.length < 2) return;
            f = i[0];
            if (typeof n == 'function') {
                cb = n;
                n = null;
            }
            if (events[f] == undefined) events[f] = [];
            if (typeof cb !== 'function') cb = $.noop;
            if (i[2]) {
                ns = i[2];
            }
            events[f].push({'evnt': e, 'sub': n, 'call': cb, 'ent': f, 'evs': i[1], 'alias': ns, 'data': data});
            return this;
        }
        this.one = function (e, n, cb, data, i) {
            this.on(e, n, cb, data);
            e = e.split('.')[0];
            i = events[e].length - 1;
            events[e][i].once = true;
            return this;
        }
        this.off = function (e, n, i, ns, ev) {
            i = e.split('.');
            if (i.length >= 4) {
                n = i.splice(2, 1);
                n = n[0];
            }
            if (i.length > 1) {
                ev = i[1];
            }
            e = i[0];
            if (i[2]) {
                ns = i[2]
            }
            if (!n && !ns && events[e]) {
                delete events[e];
                return this;
            }
            i = e;
            e = events[i];
            $.each(e, function (k) {
                if (ev !== undefined && ev !== null && ev !== this.evs && ev !== '*') return;
                if ((n !== undefined && n !== null && n !== this.sub) && (this.alias === null || this.alias == undefined)) return;
                if (ns !== undefined && ns !== null && this.alias !== ns) {
                    return;
                }
                delete e[k];
            })
            events[i] = Object.values(e);
            return this;
        }
        this.call = function (e, n, data, i, f, g, sp) {
            i = e.split('.');
            f = i[0];
            g = i[1];
            e = events[f];
            sp = false;
            if (typeof e !== 'object') return;
            if (!e.length || e.length < 1) return;
            $.each(e, function (i, k) {
                if (this.evs == null || this.evs == undefined || this.evs == "") return;
                if (this.evs !== g && this.evs != "*") return;
                if (sp == true) {
                    return;
                }
                k = {};
                k.type = n;
                k.event = f + '.' + g;
                k.data = this.data;
                k.arguement = data;
                k.entity = this.ent;
                k = $.proxy(this.call, k, data);
                try {
                    if (this.sub == n) {
                        k.call(data);
                        this.success = true;
                    } else if (this.sub == null || this.sub == undefined) {
                        k.call(data);
                        this.success = true;
                    }
                } catch (e) {
                    sp = true;
                    console.log(e);
                    if (events[f][i].once === true) {
                        delete events[f][i]
                    }
                    throw(e);
                }
                if (events[f][i].once === true && this.success === true) {
                    delete events[f][i]
                }
            });
            events[f] = Object.values(events[f]);
        }
    }
    Events = new Custom_Original_Events;
    smartDrawing_enforceColorProfile = function (shapeObject, profile, map) {
        shapeObject = $(shapeObject);
        profile = $.extend(true, {}, profile)
        map = {};
        map.elements = shapeObject.find('path,text,symbol,rect,circle,polygon,polyline,g,use').not('circle[id=draw-shape-point]');
        if (map.elements.length == 0) return shapeObject;
        map.replace = {};
        $.each(profile, function (i, e, fill) {
            e = map.elements[i];
            fill = e.getAttribute('fill');
            if (e.style.fill !== null) {
                fill = e.style.fill
            }
            if (!fill) return;
            if (fill[0] == '#' || fill.indexOf('rgb') === 0) {
                fill = fill.toString().trim();
                map.replace[fill] = this.ref;
            }
        })
        for (map.i = 0; map.elements.length > map.i; map.i++) {
            map.fill = map.elements[map.i].getAttribute('fill');
            if (map.fill == null) {
                map.fill = map.elements[map.i].style.fill;
            }
            if (map.fill == null) continue;
            if (map.replace[map.fill] !== undefined) {
                map.elements[map.i].style.fill = '';
                map.elements[map.i].setAttribute('fill', map.replace[map.fill]);
            }
        }
        return shapeObject;
    }
    smartDrawing_button = function (prop, tid) {
        tid = $.now() + Math.random().toString().replace('.', '');
        return '<svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 208 104" fill="#000"><path d="' + c.svgButtonNs + '"></path><g stroke="none" style="font-family:' + c.libs.fonts[prop.font][prop.type] + ';font-size:' + prop.size + 'px" transform="translate(0,52)" fill="' + prop.color + '"></g><defs></defs></svg>';
    }
    renderTextType = function (text, opt, svg, success, ns) {
        ns = smartDrawing_stringToText(text, opt).done(function (v, u, o) {
            o = {};
            o.g = {};
            if (!u.svg) {
                o.svg = document.createElementNS(c.domSvgNs, 'svg');
                o.svg.setAttribute('clas', 'fade');
                o.text = o.svg.appendChild(document.createElementNS(c.domSvgNs, 'g'));
                if (u.prop.sym == 'button') {
                    o.g2 = $(o.text).clone().empty().get(0);
                    o.btn = o.g2.appendChild(document.createElementNS(c.domSvgNs, 'path'));
                    o.btn.setAttribute('d', c.svgButtonNs);
                }
            } else {
                o.svg = $(u.svg).filter('svg').get(0);
                o.text = o.svg.querySelector('g');
                $(o.text).empty();
                o.btn = o.svg.querySelector('path[d]')
            }
            if (c.libs.fonts[u.opt.font]) {
                o.text.style.fontFamily = c.libs.fonts[u.opt.font][u.opt.type];
            }
            o.text.style.fontSize = u.opt.size + 'px';
            o.s = document.createElementNS(c.domSvgNs, 'text');
            o.text.appendChild(o.s);
            $.map(v, function (i, e) {
                o.ts = document.createElementNS(c.domSvgNs, 'tspan');
                o.ts.setAttribute('x', i.x);
                o.ts.setAttribute('y', i.y);
                o.ts.append(i.s);
                o.s.appendChild(o.ts);
            })
            o.fs = o.text.getBBox();
            o.fs.width = number_format(o.fs.width);
            o.fs.height = number_format(o.fs.height);
            if (u.prop.sym == 'text') {
                o.vb = o.fs;
                o.svg.setAttribute('viewBox', o.fs.x + ' ' + o.fs.y + ' ' + o.fs.width + ' ' + o.fs.height);
            } else if (u.prop.sym == 'button') {
                o.cmd = c.svgButtonNs;
                o.vb = o.btn.getBBox();
                o.center = (o.vb.width - o.fs.width) / 2;
                o.yc = (o.vb.height - o.fs.height) / 2;
                if (o.fs.y < 0) {
                    o.i = parseFloat(o.fs.y.toString().substr(1));
                    o.yc += o.i;
                }
                o.svg.setAttribute('viewBox', '0 0 ' + o.vb.width + ' ' + o.vb.height + '');
                o.text.setAttribute('transform', 'translate(' + o.center + ',' + (o.yc) + ')');
            }
            o.w = (o.fs.width / c.domCanvas.width()) * 100;
            o.h = (o.fs.height / c.domCanvas.height()) * 100;
            o.inf = {
                'svg': o.svg,
                'size': {'width': o.w, 'height': o.h},
                'off': {'x': o.vb.x, 'y': o.vb.y, 'w': o.vb.width, 'h': o.vb.height},
                'options': u.prop,
                'opt': u.opt
            }
            if (u.prop.sym == 'button') {
                o.inf.xy = [o.center, o.yc];
                o.inf.cmd = o.cmd;
            }
            if (typeof u.doneCb == 'function') {
                u.doneCb(v, o.inf)
            }
            o = undefined;
        })
        ns.doneCb = success;
        ns.prop = opt;
        ns.svg = svg;
        return ns;
    }
    smartDrawing_text = function (prop) {
        return i = '<svg fill="' + prop.color + '" viewBox="-1 -23 110.140625 30" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g style="font-family:' + c.libs.fonts[prop.font][prop.type] + ';font-size:' + prop.size + 'px"></g></svg>';
    }
    smartDrawing_sticker = function (arg) {
        if (!c.libs.emoji[arg]) return;
        return '<svg width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><image width="100%" height="100%" preserveAspectRatio="none" xlink:href="' + location.origin + '/library/emoji/frames/' + arg + '/frame_' + c.libs.emoji[arg].end + '.svg"   /><rect class="layer" y="0" x="0" width="100%" height="100%" fill="none" /></svg>';
    }
    c.renderSpritesAnimation = function (o) {
        o = {};
        o.els = Object.values(c.slides[0].elements);
        c.spriteTL.stop();
        c.spriteTL.clear(true);
        for (o.i = 0; o.els.length > o.i; o.i++) {
            if (o.els[o.i].alias !== 'sprite') continue;
            o.p = o.els[o.i];
            if (!c.idCache[o.p.prop.uid].sprites) continue;
            if (!c.idCache[o.p.prop.uid].spritesLoaded) continue;
            o.ref = o.p.prop.src;
            o.dom = c.domCanvas.find('.objectBox[scope="' + o.p.id + '"] > .object:first svg:first > image');
            o.dom.attr('xlink:href', location.origin + '/library/emoji/frames/' + o.ref + '/frame_' + c.libs.emoji[o.ref].start + '.svg');
            o.o = {'i': 0, 'pos': 0, 'x': 0};
            o.o.el = o.dom;
            o.repeat = true;
            if (o.p.prop.loop !== undefined) o.repeat = o.p.prop.loop;
            o.tt = TweenMax.fromTo(o.o, c.idCache[o.p.prop.uid].sprites.length, {'i': 0}, {
                'i': c.idCache[o.p.prop.uid].sprites.length,
                'delay': 0,
                'data': o.p.id,
                'lazy': true,
                'ease': 'Linear.eaeNone',
                'onUpdateParams': ['{self}', o.o],
                'onStartParams': [o.o],
                'onStart': function (data) {
                    data.pos = 0;
                },
                'onUpdate': function (tween, data, p, sr) {
                    p = c.slides[0].elements[this.data];
                    if (p.prop.loop == false && data.x > 1) return;
                    data.pos += 1;
                    if (data.pos > c.libs.emoji[p.prop.src].end) data.pos = c.libs.emoji[p.prop.src].end;
                    sr = c.idCache[p.prop.uid].sprites[data.pos];
                    data.el.attr('xlink:href', sr);
                    if (data.pos == c.libs.emoji[p.prop.src].end) {
                        data.x++;
                    }
                }
            })
            c.spriteTL.add(o.tt, 0)
        }
    }
    smartDrawing_sprite = function (arg, t, id, tt, lt) {
        if (!c.libs.emoji[arg]) return;
        id = $.now();
        tt = parseInt(c.libs.emoji[arg].frames);
        lt = 0;
        for (i = 0; tt > i; i++) {
            t = new Image;
            t.id = id;
            t.ref = arg;
            t.lt = lt;
            t.i = i;
            t.onload = function (e, p, o) {
                lt++;
                e = c.domCanvas.find('svg image[ref="sprite_' + this.id + '"]').parents('.objectBox');
                p = e.attr('scope');
                p = c.slides[0].elements[p];
                if (c.idCache[p.prop.uid].sprites == undefined) c.idCache[p.prop.uid].sprites = [];
                c.idCache[p.prop.uid].sprites.push(this.src);
                if (lt == tt) {
                    c.idCache[p.prop.uid].sprites = c.idCache[p.prop.uid].sprites.sort(function (a, b) {
                        a = a.substr(a.lastIndexOf('/') + 7).split('.')[0];
                        b = b.substr(b.lastIndexOf('/') + 7).split('.')[0];
                        a = parseInt(a);
                        b = parseInt(b);
                        return a - b;
                    })
                    c.idCache[p.prop.uid].spritesLoaded = true;
                    e.find('.object:first > svg image:first').attr('xlink:href', location.origin + '/library/emoji/frames/' + this.ref + '/frame_' + c.libs.emoji[this.ref].start + '.svg');
                }
            }
            t.onerror = function () {
                lt++;
            }
            t.src = location.origin + '/library/emoji/frames/' + arg + '/frame_' + i + '.svg';
        }
        return '<svg width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><image width="100%" height="100%" preserveAspectRatio="none" ref="sprite_' + id + '" xlink:href="assets/img/loader.gif"   /><rect class="layer" y="0" x="0" width="100%" height="100%" fill="none" /></svg>';
    }
    smartDrawing_image = function (arg, t) {
        t = new Image;
        t.id = $.now();
        t.onerror = function () {
            toastr.error('Failed to load image');
            c.domCanvas.find('svg image[ref="img_' + this.id + '"]').attr({
                'xlink:href': location.origin + '/assets/img/undefined_photo.jpg',
                'width': '100%',
                'height': '100%'
            });
        }
        t.onload = function (e, s, b) {
            e = c.domCanvas.find('svg image[ref="img_' + this.id + '"]').attr({
                'xlink:href': this.src,
                'width': '100%',
                'height': '100%'
            });
            notify('Image.afterLoad', {
                'ref': this.src,
                'width': this.width,
                'height': this.height,
                'scope': e.parents('.objectBox').attr('scope')
            });
            e.each(function (e, sc) {
                s = $(this).parents('svg');
                e = s.parents('.objectBox[scope]');
                sc = c.slides[0].elements[e.attr('scope')];
                if (!sc.prop.off) {
                    b = real_offset(e);
                    sc.prop.off = {'w': b.width, 'h': b.height, 'x': 0, 'y': 0}
                }
                s.attr('viewBox', '0 0 ' + sc.prop.off.w + ' ' + sc.prop.off.h)
            })
            if (this.afterLoad) {
                this.afterLoad(this);
            }
        }
        if (typeof arg == 'object') {
            t.nosrc = arg.l;
            t.hi_src = arg.u;
            t.afterLoad = function () {
                delete this.afterLoad;
                this.src = this.hi_src;
            }
            t.src = arg.l;
        } else {
            t.nosrc = arg;
            t.src = arg;
        }
        return '<svg width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><image width="100%" height="100%" preserveAspectRatio="none" ref="img_' + t.id + '" xlink:href="assets/img/loader.gif"   /><rect class="layer" y="0" x="0" width="100%" height="100%" fill="none" /></svg>';
    }
    smartDrawing_enforceOffset = function (shapeObject, off) {
        shapeObject = $(shapeObject);
        shapeObject.attr('viewBox', off.x + ' ' + off.y + ' ' + off.w + ' ' + off.h);
        return shapeObject;
    }
    smartDrawing_mask = function (maskSourceData) {
        this.type, this.x, this.y, this.scaleY, this.scaleX, this.fill;
        sourceData = {};
        this.apply = function (imageData) {
        }
        this.remove = function () {
        }
        this.computeSourceData = function (source) {
            this.slide = source.substr(source.lastIndexOf('_') + 1);
            if (!c.slides[this.slide]) return this;
            this.scope = c.slides[this.slide].elements[source];
            if (this.scope.alias !== 'shape') return this;
            if (this.scope.prop.sym && this.scope.prop.sym == 'path') {
                sourceData.cmd = this.scope.prop.cmd;
            } else if (this.scope.prop.sym && this.scope.prop.sym == 'text') {
                sourceData.cmd = this.scope.prop.source;
            }
            if (this.scope.prop.sym) {
                sourceData.sym = this.scope.prop.sym;
            } else {
                sourceData.sym = 'local';
            }
            if (this.scope.prop.off && this.scope.prop.off.x) {
                sourceData.offset = this.scope.prop.off;
            }
        }
        return this;
    }
    smartDrawing_buttonToShape = function (objectID, o) {
        o = {};
        o.t = smartDrawing_textToShape(objectID);
        if (!o.t) return;
        o.s = objectID.substr(objectID.lastIndexOf('_') + 1);
        o.scope = c.slides[o.s].elements[objectID];
        o.build = {};
        o.build.text = o.t
        if (o.scope.prop.background) {
            o.build.background = o.scope.prop.background;
        }
        if (o.scope.prop.border !== undefined) {
            o.build.border = o.scope.prop.border;
        }
        if (o.scope.prop.shadow !== undefined) {
            o.build.shadow = o.scope.prop.shadow;
        }
        if (o.scope.prop.opacity !== undefined) {
            o.build.opacity = o.scope.prop.opacity;
        }
        o.obj = c.domCanvas.find('.objectBox[scope=' + objectID + ']:first');
        o.stl = 'font-family:' + c.libs.fonts[o.build.text.font][o.build.text.type] + ';font-size:' + o.build.text.size + 'px';
        o.src = o.build.text.source;
        o.bufs = [];
        o.p = real_offset(o.obj);
        o.buf = '<svg width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style>.' + o.scope.id + '_cnv{' + o.stl + '};</style><path d="M10,10 l100,0 0,50 -100,0 0,-50z" /><g transform="translate(0,0)"></g></svg>';
        o.home = c.domCanvas.children(':eq(' + o.s + ')');
        o.buf = $('<div>' + o.buf + '</div>');
        o.buf.appendTo(o.home);
        o.buf.css({
            'position': 'absolute',
            'left': o.p.leftab + '%',
            'top': o.p.topab + '%',
            'width': o.p.widthab + '%',
            'height': o.p.heightab + '%'
        });
        o.svg = o.buf.find('svg:first');
        o.g = o.svg.find('g:first');
        o.box = o.g.prev('path');
        o.ofs = o.svg.get(0).getBBox();
        for (o.i = 0; o.src.length > o.i; o.i++) {
            o.tx = o.g.get(0).appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'text'));
            o.tx.append(o.src[o.i].s);
            o.tx.setAttribute('fill', o.build.text.background.color);
            o.tx.setAttribute('class', o.scope.id + '_cnv');
            o.tx.setAttribute('x', o.src[o.i].x);
            o.tx.setAttribute('y', o.src[o.i].y);
        }
        o.svg.attr('viewBox', o.ofs.x + ' ' + o.ofs.y + ' ' + o.ofs.width + ' ' + o.ofs.height)
        o.bf = o.box.get(0).getBBox();
        o.gf = o.g.get(0).getBBox();
        if (o.build.border) {
        }
        if (o.build.background) {
            applyPropertyOption(o.svg, {'background': o.build.background});
        }
        o.g.attr('transform', 'translate(' + o.bf.x + ',' + (o.bf.y + o.gf.height) + ')');
    }
    smartDrawing_stringToText = function (str, opt, f) {
        f = function () {
            this.opt = $.extend(false, {
                'align': 'center',
                'size': 12,
                'type': 'normal',
                'font': 'abeezee',
                'spacing': 0,
                'line': 1
            }, opt);
            if (!c.libs.fonts[this.opt.font]) {
                this.opt.font = 'abeezee';
                this.opt.type = 'normal';
            }
            var callbacks = {'done': $.noop, 'progress': $.noop, 'fail': $.noop, 'begin': $.noop}, self = null;
            this.texts = str;
            this.begin = function (cb) {
                if (typeof cb == 'function') callbacks.begin = cb;
                return this;
            };
            this.done = function (cb) {
                if (typeof cb == 'function') callbacks.done = cb;
                return this;
            };
            this.fail = function (cb) {
                if (typeof cb == 'function') callbacks.fail = cb;
                return this;
            };
            this.progress = function (cb) {
                if (typeof cb == 'function') callbacks.progress = cb;
                return this;
            };
            var testElement = null, testFont = null, endTest = null;
            var init = function (x, o) {
                o = {};
                testElement.empty().css('fontSize', x.opt.size + 'px');
                callbacks.begin();
                o.indent = 0;
                o.sz = 0;
                o.buf = [];
                o.nr = x.texts.replace(/[^\n]/g, '<span>$&</span>');
                o.nr = o.nr.replace(/\n/g, '<br>');
                o.sg = $('<div style="line-height:' + x.opt.line + '">' + o.nr + '</div>')
                o.sg.appendTo(testElement);
                o.s = o.sg.children('span').each(function (i) {
                    k = $(this);
                    i = k.text();
                    o.p = k.position();
                    o.sz = o.p.left;
                    o.cf = {'s': i, 'y': o.p.top, 'x': o.sz};
                    callbacks.progress(i, o.cf);
                    o.buf.push(o.cf);
                });
                testElement.remove();
                callbacks.done(o.buf, self);
            }
            self = this;
            testElement = $('<div class="font-test">Font</div>');
            testElement.css({
                'fontFamily': c.libs.fonts[this.opt.font][this.opt.type] + ' , Comic Sans',
                'fontSize': '250px',
                'textAlign': this.opt.align
            });
            if (this.opt.spacing > 0) {
                testElement.css('wordSpacing', this.opt.spacing);
            }
            c.domDocBody.append(testElement);
            testElement.data('fontWidth', testElement.outerWidth())
            testFont = window.setInterval(function (a, b) {
                a = testElement.data('fontWidth');
                b = testElement.outerWidth();
                if (a !== b) {
                    init(self);
                    clearInterval(testFont);
                    clearInterval(endTest);
                }
            }, 20)
            endTest = window.setTimeout(function () {
                clearInterval(testFont);
                init(self);
            }, 500)
        }
        return new f;
    }
    smartDrawing_textToShape = function (objectID, o, i) {
        o = {};
        if (typeof objectID !== 'string') return;
        o.obj = c.domCanvas.find('.objectBox[scope=' + objectID + ']:first');
        if (o.obj.length == 0) return;
        o.s = objectID.substr(objectID.lastIndexOf('_') + 1);
        o.scope = $.extend(true, {}, c.slides[o.s].elements[objectID]);
        if (!o.scope) return;
        if (o.scope.alias !== 'texts' && o.scope.alias !== 'buttons') return;
        if (o.scope.alias == 'buttons') {
            o.scope.prop = $.extend(false, o.scope.prop.text, o.scope.prop);
        }
        o.scope.prop.size = (o.scope.prop.size / 50) * c.zoomLevel;
        o.txt = o.obj.find('.object:first > span:first').contents();
        o.buf = [];
        o.indent = o.scope.prop.size;
        o.spacing = 0;
        o.cvt = $('<div class="nc-rd" style="position:absolute;"></div>');
        o.cvt.appendTo(c.domDocBody);
        for (i = 0; o.txt.length > i; i++) {
            n = o.txt[i].nodeName.toLowerCase();
            if (n !== '#text' && n !== 'br') continue;
            o.subs = $('<div id="smts-fc-' + i + '" style="opacity:0;position:relative"></div>');
            o.subs.appendTo(o.cvt);
            v = o.txt[i].textContent.split('');
            applyPropertyOption(o.subs, {'text': {'align': o.scope.prop.align}})
            $.each(v, function (k, e) {
                k = $('<span style="width:100%;height:auto" class="fontv-test">' + e + '</span>');
                applyPropertyOption(k, {
                    'text': {
                        'color': o.scope.prop.color,
                        'font': o.scope.prop.font,
                        'size': o.scope.prop.size,
                        'type': o.scope.prop.type,
                    }
                })
                o.subs.append(k);
                sz = k.outerWidth();
                k.attr({'size': sz});
            })
            o.subs.attr('size', o.subs.outerHeight())
        }
        o.sbt = o.cvt.children('div');
        o.indent = 0;
        o.stl = 'font-family:' + o.sbt.find('span.fontv-test:first').css('fontFamily') + ';font-size:' + o.scope.prop.size + 'px';
        o.bufs = [];
        for (i = 0; o.sbt.length > i; i++) {
            o.subs = $(o.sbt[i]);
            o.y = o.subs.attr('size');
            o.y = parseFloat(o.y);
            o.size = 0;
            o.subs.find('.fontv-test[size]').each(function (i, e, v) {
                e = $(this);
                o.sz = e.attr('size');
                o.sz = parseFloat(o.sz);
                o.ps = e.position();
                o.x = o.ps.left;
                o.size = o.x;
                v = e.text();
                o.bufs.push('<text class="' + o.scope.id + '_cnv" x="' + o.size + '" y="' + o.indent + '">' + v + '</text>');
                o.buf.push({'x': o.size, 'y': o.indent, 's': v});
                if (v == "" || v == " ") {
                    o.sz += 5;
                }
            })
            o.indent += o.y;
        }
        o.build = {'background': {'color': o.scope.prop.color}}
        if (o.scope.prop.shadow) {
            o.build.shadow = o.scope.prop.shadow;
        }
        if (o.scope.prop.border) {
            o.build.border = o.scope.prop.border
        }
        if (o.scope.prop.opacity !== undefined) {
            o.build.opacity = o.scope.prop.opacity
        }
        o.build.source = o.buf;
        o.build.sym = 'text';
        o.build.font = o.scope.prop.font
        o.build.type = o.scope.prop.type;
        o.build.size = o.scope.prop.size;
        o.build.align = o.scope.prop.align;
        o.offs = real_offset(o.obj);
        o.tp = $('<div />').css(o.offs);
        o.home = c.domCanvas.children(':eq(' + o.s + ')');
        o.tp.appendTo(o.home);
        o.buff = '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style>.' + o.scope.id + '_cnv{' + o.stl + '};</style>' + o.bufs.join('') + '</svg>';
        o.buff = $('<div id="buff">' + o.buff + '</div>').css('position', 'absolute');
        o.buff.appendTo(o.home);
        o.svg = o.buff.find('svg:first').get(0);
        o.vb = o.svg.getBBox();
        o.build.off = {'x': o.vb.x, 'y': o.vb.y, 'w': o.vb.width, 'h': o.vb.height}
        o.buff.remove();
        o.tp.remove();
        o.cvt.remove();
        o.svg.remove();
        return o.build;
    }
    smartTextTools = function (obj, cb) {
        if (c.smartTextEditor) c.smartTextEditor.destroy();
        if (obj == null || obj == undefined) return;
        if (!notify('workspace.beforeActiveTyping')) return;
        c.smartTextEditor = $('<div />').menu({
            'items': [], 'hide': function (e, u) {
                if (c.smartTextEditor.saved == true) {
                    c.smartTextEditor.el.find('.object:first > svg g:first').removeClass('editing')
                    c.smartTextEditor.destroy();
                    c.smartTextEditor = null;
                    c.editingActive = false;
                    return;
                }
                c.smartTextEditor.preview = false;
                c.smartTextEditor.renderOutput();
            }, 'show': function () {
                c.smartTextEditor.input.focus();
            }, 'init': function (e, u) {
                c.smartTextEditor = u;
                window.clearInterval(c.keyboardEventKeepTimer);
                c.editingActive = true;
                this.saved = true;
                this.s = obj.substr(obj.lastIndexOf('_') + 1);
                this.scope = c.slides[this.s].elements[obj];
                e = $('<div class="context" ><div class="w-100 text-white align-items-centern d-flex justify-content-centern fancyscroll" style="height:180px;overflow:auto"><span class="" contenteditable="true">Text here</span></div><div class="w-100 mt-2"><p class="m-0 px-2">Use Enter key for multiline</p></div><div class="w-100 mt-2 p-2 clearfix"><button class="btn btn-default btn-sm float-right">Preview</button></div><div class="w-100 relative"></div></div>');
                u.menu.find('.menu').append(e).css({'maxHeight': '185px', 'overflow': 'visible'});
                this.input = e.find('span[contenteditable]');
                this.input.parent().css('background', '#292b2c');
                this.prop = this.input.parent().next();
                this.options = {
                    'type': this.scope.prop.type,
                    'font': this.scope.prop.font,
                    'size': this.scope.prop.size,
                    'align': this.scope.prop.align,
                    'line': (this.scope.prop.line || 1),
                    'spacing': (this.scope.prop.spacing | 0)
                };
                this.applybtn = this.prop.next().find('button.btn:first').on('click', function () {
                    c.smartTextEditor.preview = true;
                    c.smartTextEditor.renderOutput();
                })
                this.tools = this.applybtn.parent().next();
                this.tools.after(this.applybtn.parent());
                e = {
                    'fontSize': 22,
                    'textAlign': this.scope.prop.align,
                    'outline': 'none',
                    'wordSpacing': this.options.spacing + 'px',
                    'lineHeight': 1
                };
                if (c.libs.fonts[this.scope.prop.font]) {
                    e.fontFamily = c.libs.fonts[this.scope.prop.font][this.scope.prop.type];
                }
                this.input.css(e)
                this.renderSource();
                this.editor.on('align', function (o) {
                    c.smartTextEditor.options.align = o.align;
                    c.smartTextEditor.input.css('textAlign', o.align);
                    c.smartTextEditor.saved = false;
                })
                this.el = c.domCanvas.children(':visible:first').find('.objectBox[scope=' + this.scope.id + ']');
                this.element = this.el.find('> .viewbox-edit:first')
                this.g = this.el.find('.object > svg g:first');
                this.input.focus();
            }
        }).menu('widget');
        c.smartTextEditor.renderSource = function (e, p) {
            e = [];
            p = {};
            this.editor = new c.wordEditor(this.options);
            this.editor.config.text = this.scope.prop.source;
            this.editor.init();
            p = this.editor.textRange.join("<br>");
            this.input.html(p).focus();
            this.editor.gui({
                'container': this.tools,
                'hideColor': true,
                'hideText': true,
                'hideSize': true,
                'hideFont': true,
                'hideSpacing': true,
                'hideLine': true
            });
        };
        c.smartTextEditor.renderOutput = function (o) {
            o = {};
            o.text = this.input.get(0).innerText;
            if (o.text.length == 0) {
                c.domCanvas.trigger('delObject', [this.scope.id]);
                return;
            }
            o.p = this.options;
            smartDrawing_stringToText(o.text, o.p).done(function (r, u, o) {
                o = {};
                c.smartTextEditor.scope.prop.source = r;
                c.smartTextEditor.scope.prop.align = c.smartTextEditor.options.align;
                c.smartTextEditor.scope.prop.line = c.smartTextEditor.options.line;
                c.smartTextEditor.scope.prop.spacing = c.smartTextEditor.options.spacing;
                o.rg = {};
                o.trf = c.smartTextEditor.el.get(0).style.transform;
                c.smartTextEditor.el.css('transform', '');
                c.smartTextEditor.g.empty();
                o.yIndex = 0;
                o.current = document.createElementNS(c.domSvgNs, 'text');
                c.smartTextEditor.g[0].appendChild(o.current);
                for (i = 0; r.length > i; i++) {
                    o.ns = r[i].y.toString();
                    o.l = r[i].y;
                    if (!o.rg[o.ns]) {
                        o.rg[o.ns] = true;
                    }
                    o.string = document.createElementNS(c.domSvgNs, 'tspan');
                    o.string.append(r[i].s);
                    o.string.setAttribute('x', r[i].x);
                    o.string.setAttribute('y', o.l);
                    o.current.appendChild(o.string);
                }
                o.svg = c.smartTextEditor.g.parents('svg').get(0);
                e = c.smartTextEditor.g[0].getBBox();
                if (c.smartTextEditor.scope.prop.sym == 'text') {
                    o.xy = c.smartTextEditor.g[0].getBoundingClientRect();
                    o.cs = {
                        'width': (o.xy.width / c.domCanvas.width()) * 100 + '%',
                        'height': (o.xy.height / c.domCanvas.height()) * 100 + '%'
                    };
                    c.smartTextEditor.el.css(o.cs);
                    o.svg.setAttribute('viewBox', e.x + ' ' + e.y + ' ' + e.width + ' ' + e.height);
                    c.smartTextEditor.scope.prop.off = {'x': e.x, 'y': e.y, 'w': e.width, 'h': e.height};
                    o.dm = real_offset(c.smartTextEditor.el);
                    c.smartTextEditor.scope.prop.w = o.dm.width;
                    c.smartTextEditor.scope.prop.h = o.dm.height;
                    c.smartTextEditor.scope.prop.left = o.dm.left;
                    c.smartTextEditor.scope.prop.top = o.dm.top;
                    c.transformHandler.reposition();
                } else {
                    o.btn = o.svg.querySelector('path');
                    o.bb = o.btn.getBBox();
                    o.left = (o.bb.width - e.width) / 2;
                    o.top = (o.bb.height - e.height) / 2;
                    if (e.y < 0) {
                        o.i = parseFloat(e.y.toString().substr(1));
                        o.top += o.i;
                    }
                    c.smartTextEditor.scope.prop.xy = [o.left, o.top];
                    o.svg.setAttribute('viewBox', '0 0 ' + o.bb.width + ' ' + o.bb.height + '');
                    c.smartTextEditor.g[0].setAttribute('transform', 'translate(' + o.left + ',' + o.top + ')');
                }
                if (c.isPerpertyOpen && c.isPerpertyTab == 'layer') {
                    o.fx = c.idCache[c.smartTextEditor.scope.prop.uid].fx.fx.textEdit;
                    if (o.fx) {
                        o.fx.update({
                            'font': c.smartTextEditor.scope.prop.font,
                            'text': c.smartTextEditor.scope.prop.source,
                            'align': c.smartTextEditor.scope.prop.align
                        });
                    }
                }
                c.smartTextEditor.el.get(0).style.transform = o.trf;
                c.smartTextEditor.saved = true;
                if (c.smartTextEditor.preview == false) {
                    c.editingActive = false;
                    c.smartTextEditor.g.removeClass('editing');
                    c.smartTextEditor.destroy();
                    c.smartTextEditor = null;
                }
            })
        }
        c.smartTextEditor.init();
        c.smartTextEditor.show();
        c.smartTextEditor.element = c.smartTextEditor.el
        c.smartTextEditor.menu.find('.pointer:first').remove()
        return;
    }
    smartDrawingTools = function (obj, cb) {
        if (obj == null || obj == undefined) return;
        mdDialog(function () {
            this.title = 'Smart drawing tools';
            this.size = 'large';
            this.s = obj.substr(obj.lastIndexOf('_') + 1);
            this.scope = c.slides[this.s].elements[obj];
            this.footer = '<button class="btn btn-success btn-sm">Apply</button>';
            if (typeof cb === 'function') {
                this.applyCallback = cb;
            }
            this.onshow = function () {
                this.box = $(this.target);
                this.box.addClass('u_browser').attr('id', 'shapeEditor');
                if (typeof this.scope !== 'object') {
                    this.close();
                    return;
                }
                if (this.scope.alias !== 'shape') {
                    this.close();
                    return;
                }
                this.off = $.extend(false, {}, this.scope.prop.off);
                if (this.scope.prop.sym !== 'button' && this.scope.prop.cmd) {
                    this.points = this.scope.prop.cmd.split(' ')
                }
                c.shapeEditor = this;
                this.box.find('.modal-body').addClass('p-0').append('<div class="context d-flex justify-content-center" style="height:400px;"><div class="w-75 h-100 d-block" style="border:dashed 1px #334059;overflow:auto"></div><div class="w-25 h-100 properties fancyscroll"></div></div><div class="footer row m-0"></div>');
                if (this.scope.prop.sym) {
                    this.sp = smartDrawing(this.scope.prop);
                } else {
                    this.n = this.scope.prop.src.split('/');
                    this.ref = Object.values(c.libs.shapes[this.n[0]]).indexOf(this.n[1]);
                    this.k = this.n[0]
                    this.sp = c.shapeBlob[this.k][this.ref];
                    if (!this.sp) {
                        $.ajax({
                            'url': location.origin + '/library/shapes/' + this.n[0] + '/svg/' + this.n[1] + '.svg',
                            'id': c.shapeEditor.scope.id,
                            'cat': this.n[0],
                            'ref': this.n[1],
                            'dataType': 'html'
                        }).done(function (data, n) {
                            if (!c.shapeBlob) {
                                c.shapeBlob = {};
                            }
                            if (!c.shapeBlob[this.cat]) {
                                c.shapeBlob[this.cat] = []
                            }
                            n = Object.values(c.libs.shapes[this.cat]).indexOf(this.ref);
                            c.shapeBlob[this.cat][n] = data;
                            smartDrawingTools(this.id);
                        }).fail(function () {
                            alertMessage('error', 'Failed to load smart shape');
                        })
                    }
                    delete this.n;
                    delete this.ref;
                }
                if (!this.sp) {
                    this.close();
                    return;
                }
                this.sp = this.sp.substr(0, this.sp.length - 6)
                this.view = this.box.find('.modal-body > .context > div:first');
                this.viewbox = [this.view.width(), this.view.height()]
                this.view.append(this.sp + '</svg>').attr('title', 'Drag to reposition object on the viewport');
                this.shape = this.view.find('svg:first').get(0);
                $(this.shape).attr({'preserveAspectRatio': 'none', 'width': '100%', 'height': '100%'})
                this.tools = this.view.parent().next('.footer');
                this.tools.append('<div class="col-3 mt-2"><p class="d-inline m-0">X</p><input type="number" class="mac w-75 h-75 float-right" /></div>'.repeat(4));
                this.bt = this.tools.children('div');
                this.off_t = $(this.shape).attr('viewBox');
                if (this.off_t && this.off.x == undefined) {
                    this.off_t = this.off_t.split(' ');
                    this.off_t = $.map(this.off_t, function (e) {
                        if (e == '') return null;
                        return e;
                    });
                    this.off.x = this.off_t[0];
                    this.off.y = this.off_t[1];
                    this.off.w = this.off_t[2];
                    this.off.h = this.off_t[3];
                }
                this.bt.first().find('input').val(this.off.x);
                $(this.bt[1]).find('p').text('Y').next('input').val(this.off.y);
                $(this.bt[2]).find('p').text('W').next('input').val(this.off.w);
                $(this.bt[3]).find('p').text('H').next('input').val(this.off.h);
                this.off.x = parseFloat(this.off.x);
                this.off.y = parseFloat(this.off.y);
                this.off.w = parseFloat(this.off.w);
                this.off.h = parseFloat(this.off.h);
                if (c.shapeEditor.scope.prop.colorProfile) {
                    smartDrawing_enforceColorProfile(this.shape, c.shapeEditor.scope.prop.colorProfile)
                }
                if (this.off.x) {
                    smartDrawing_enforceOffset(this.shape, this.off)
                }
                this.sidebar = this.view.next('.properties').css('overflow', 'auto');
                this.sidebar.append('<div class="col-12 mt-2 d-none"><p>Morphing</p><div><button class="btn btn-sm"><span class="fa fa-plus-square fa-stack fa-lg" title="Switch add point mode"></span></button><button class="btn btn-sm ml-2"><span title="Swich substract point mode" class="fa fa-minus-square fa-stack fa-lg"></span></button></div></div><hr class="w-100">');
                this.sidebar.append('<div class="col-12 mt-2"><p>Color profile</p><div class="paletes"></div></div>');
                if (!this.points || this.points.length == 0) {
                    this.sidebar.children(':first').find('button').attr('disabled', true)
                } else {
                    this.morphModeToggler = this.sidebar.children(':first').find('button');
                    this.morphModeToggler.on('click', function (e, i) {
                        e = $(this);
                        e.addClass('btn-outline-success').siblings('button').removeClass('btn-outline-success');
                        i = c.shapeEditor.morphModeToggler.index(e);
                        if (i == 0) {
                            c.shapeEditor.morphMode = 1
                        } else {
                            c.shapeEditor.morphMode = 0;
                        }
                    }).first().trigger('click')
                }
                this.colorpf = this.sidebar.children(':last').find('p+div')
                this.map = $(this.shape).find('path,text,symbol,rect,circle,polygon,polyline,g,use').not('circle[id=draw-shape-point]');
                this.colorpf.css('padding', '2px')
                this.map.each(function (i, e, n, bg) {
                    n = this.nodeName.toLowerCase();
                    bg = $(this).attr('fill');
                    if (bg === undefined) {
                        bg = $(this).css('fill')
                    }
                    e = $('<input value="' + bg + '" />').spectrum();
                    bg = e.spectrum('get').toHexString();
                    e.spectrum('destroy');
                    e = bg;
                    if (e == '#000000') {
                        bg = 'url(library/bg_textures/tmb/transparency.jpg)';
                        ;
                    }
                    e = $('<div id="path-node" class="d-flex align-items-center mt-2 p-2" data-object-ref="' + i + '"><span class="colorplate d-inline-block mr-1 ml-1 p-2" style="width:35px;background:' + bg + '"></span><span>' + n + '#' + (i + 1) + '</span></div>')
                    e.appendTo(c.shapeEditor.colorpf)
                })
                this.colorpf.find('div[id=path-node]').on('colorupdate', 'span.colorplate', function (e, cl, i) {
                    e = $(this);
                    i = e.parent().data('object-ref');
                    e.css('background', cl.color);
                    if (!c.shapeEditor.colorProfile) {
                        c.shapeEditor.colorProfile = {};
                    }
                    c.shapeEditor.colorProfile[i] = {'type': c.shapeEditor.map[i].nodeName, 'ref': cl.color};
                    $(c.shapeEditor.map[i]).css('fill', cl.color)
                }).on('colorcancel', 'span.colorplate', function (e, i) {
                    e = $(this);
                    i = e.parent().data('object-ref');
                    e.css('background', 'url(library/bg_textures/tmb/transparency.jpg)');
                    $(c.shapeEditor.map[i]).css('fill', '').removeAttr('fill')
                    if (c.shapeEditor.colorProfile) {
                        delete c.shapeEditor.colorProfile[i];
                    }
                }).on('mouseover', function () {
                    e = $(this);
                    i = e.data('object-ref');
                    $(c.shapeEditor.map[i]).css('opacity', 0.5)
                }).on('mouseout', function () {
                    e = $(this);
                    i = e.data('object-ref');
                    $(c.shapeEditor.map[i]).css('opacity', 1);
                }).find('.colorplate').colorGold();
                this.dots = this.view.find('svg > circle[id=draw-shape-point]').drag({
                    'drag': function (e, u) {
                        u.event.stopPropagation();
                        e.stopPropagation();
                        u.x = parseFloat(c.shapeEditor.tw.o[0]);
                        u.y = parseFloat(c.shapeEditor.tw.o[1]);
                        if (u.offset.left > c.shapeEditor.tw.left) {
                            u.x += (u.offset.left - c.shapeEditor.tw.left)
                        } else if (u.offset.left < c.shapeEditor.tw.left) {
                            u.x -= (c.shapeEditor.tw.left - u.offset.left)
                        }
                        if (u.offset.top > c.shapeEditor.tw.top) {
                            u.y += u.offset.top - c.shapeEditor.tw.top
                        } else if (u.offset.top < c.shapeEditor.tw.top) {
                            u.y -= c.shapeEditor.tw.top - u.offset.top
                        }
                        c.shapeEditor.tw.o[0] = u.x;
                        c.shapeEditor.tw.o[1] = u.y;
                        c.shapeEditor.points[c.shapeEditor.tw.i] = c.shapeEditor.tw.o[0] + ',' + c.shapeEditor.tw.o[1];
                        u.pa = 'M' + c.shapeEditor.points.join('L');
                        if (c.shapeEditor.tw.ended) {
                            u.pa += 'z';
                        }
                        c.shapeEditor.tw.s.setAttribute('d', u.pa);
                        $(this).attr({'cy': u.y, 'cx': u.x})
                        c.shapeEditor.tw.left = u.offset.left;
                        c.shapeEditor.tw.top = u.offset.top;
                    }, 'start': function (e, u) {
                        c.shapeEditor.tw = u.offset;
                        c.shapeEditor.tw.i = c.shapeEditor.dots.index(this);
                        c.shapeEditor.tw.ended = (c.shapeEditor.scope.prop.variant == 'polygon')
                        c.shapeEditor.tw.o = c.shapeEditor.points[c.shapeEditor.tw.i].split(',');
                        c.shapeEditor.tw.s = $(c.shapeEditor.shape).find('path:first').get(0);
                    }
                }).on('click', function () {
                    if (c.shapeEditor.morphMode == 0) {
                    }
                })
                this.box.find('.modal-footer > button:first').click(function (e, v, s) {
                    s = c.domCanvas.children(':eq(' + c.shapeEditor.s + ')').find('.objectBox[scope=' + c.shapeEditor.scope.id + '] > .object svg');
                    if (c.shapeEditor.points) {
                        c.shapeEditor.scope.prop.cmd = c.shapeEditor.points;
                        e = 'M' + c.shapeEditor.points.join('L');
                        if (c.shapeEditor.scope.prop.variant == 'polygon') {
                            e += 'z';
                        }
                        s.find('path[d]:first').attr('d', e);
                    }
                    if (c.shapeEditor.off) {
                        e = c.shapeEditor.off;
                        c.shapeEditor.scope.prop.off = e;
                        smartDrawing_enforceOffset(s, e)
                    }
                    if (c.shapeEditor.colorProfile && Object.keys(c.shapeEditor.colorProfile).length > 0) {
                        c.shapeEditor.scope.prop.colorProfile = c.shapeEditor.colorProfile
                        smartDrawing_enforceColorProfile(s, c.shapeEditor.colorProfile)
                    } else {
                        smartDrawing_enforceColorProfile(s, c.shapeEditor.colorProfile)
                        delete c.shapeEditor.scope.prop.colorProfile;
                    }
                    c.shapeEditor.close();
                })
                this.view.css('cursor', 'move');
                this.draw = new drawPencil({
                    'type': 'polyline', 'mouse': false, 'draw': function (e, item, opt) {
                        if (c.shapeEditor.morphMode == 1) {
                            c.shapeEditor.points.push((opt.left) + ',' + (opt.top));
                            e = 'M' + c.shapeEditor.points.join('L');
                            if (c.shapeEditor.scope.prop.variant == 'polygon') {
                                e += 'z';
                            }
                            c.shapeEditor.pathNode.setAttribute('d', e)
                            $(item).remove();
                        }
                    }, 'stop': function (shape) {
                        $(shape.data).remove();
                        delete c.shapeEditor.pathNode;
                        c.shapeEditor.draw.initiated = false;
                        smartDrawing_enforceOffset(c.shapeEditor.shape, c.shapeEditor.off)
                    }, 'container': this.view, 'drawboard': this.view, 'start': function (e, opt, n) {
                        c.shapeEditor.pathNode = $(c.shapeEditor.shape).find('path:first').get(0);
                        c.shapeEditor.draw.initiated = true;
                        e = c.shapeEditor.points[c.shapeEditor.points.length - 1];
                        n = c.shapeEditor.view.offset()
                    }
                });
                this.view.drag({
                    'drag': function (ev, p, e, u, x, y) {
                        e = $(this);
                        ev = p.event;
                        e = c.shapeEditor.off;
                        x = parseFloat(e.x);
                        y = parseFloat(e.y);
                        if (ev.pageX > c.shapeEditor.ev.pageX) {
                            x -= (ev.pageX - c.shapeEditor.ev.pageX)
                        } else if (ev.pageX < c.shapeEditor.ev.pageX) {
                            x += (c.shapeEditor.ev.pageX - ev.pageX)
                        }
                        if (ev.pageY > c.shapeEditor.ev.pageY) {
                            y -= (ev.pageY - c.shapeEditor.ev.pageY);
                        } else if (ev.pageY < c.shapeEditor.ev.pageY) {
                            y += (c.shapeEditor.ev.pageY - ev.pageY)
                        }
                        e.x = x;
                        e.y = y;
                        u = x + ' ' + y + ' ' + e.w + ' ' + e.h;
                        c.shapeEditor.ev = ev;
                        c.shapeEditor.shape.setAttribute('viewBox', u);
                    }, 'stop': function (e, u) {
                        $(c.shapeEditor.bt[0]).find('input').val(c.shapeEditor.off.x)
                        $(c.shapeEditor.bt[1]).find('input').val(c.shapeEditor.off.y)
                        delete c.shapeEditor.ev
                    }, 'start': function (e, p) {
                        c.shapeEditor.ev = p.event;
                        $(this).addClass('dragging')
                    }
                })
                this.bt.on('input', 'input[type=number]', function (e, v, i) {
                    e = $(this);
                    i = c.shapeEditor.bt.index(e.parent());
                    v = e.val();
                    v = parseFloat(v);
                    if (isNaN(v)) {
                        e.focus();
                        return;
                    }
                    e = c.shapeEditor.off;
                    if (i == 0 && v > e.x) {
                        v = e.x -= (v - e.x);
                    } else if (i == 0 && v < e.x) {
                        v = e.x += (e.x - v);
                    } else if (i == 1 && v > e.y) {
                        v = e.y += v - e.y;
                    } else if (i == 1 && v < e.y) {
                        v = e.y -= e.y - v
                    } else if (i == 2 && v > e.w) {
                        v = e.w -= v - e.w
                    } else if (i == 2 && v < e.w) {
                        v = e.w += e.w - v
                    } else if (i == 3 && v > e.h) {
                        v = e.h += v - e.h;
                    } else if (i == 3 && v < e.h) {
                        v = e.h -= e.h - v;
                    }
                    $(this).val(v);
                    v = e.x + ' ' + e.y + ' ' + e.w + ' ' + e.h;
                    c.shapeEditor.shape.setAttribute('viewBox', v);
                })
            }
            this.onhide = function () {
                delete c.shapeEditor;
                this.destroy();
            }
            return this;
        })
    }
    smartDrawing = function (arg, o) {
        o = {};
        switch (arg.sym) {
            case'line':
                o.sw = 2;
                o.s = '#000';
                if (arg.border && arg.border.size !== undefined) {
                    o.sw = arg.border.size;
                }
                if (arg.border && arg.border.color) {
                    o.s = arg.border.color;
                }
                o.i = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="width:100%"><line x1="0" y1="0" y2="0" x2="100%"  /></svg>';
                break;
            case'circle':
            case'square':
                o.i = '<ellipse cx="30" cy="30" rx="30" ry="30" />';
                o.c = '#000';
                if (arg.background && arg.background.color) {
                    o.c = arg.background.color
                }
                if (arg.sym == 'square') {
                    o.i = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" fill="' + o.c + '" width="25" height="25" viewBox="0 0 25 25" style="width:100%;height:100%"><rect y="0" x="0" width="100%" height="100%" /></svg>';
                } else {
                    o.i = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60.34" preserveAspectRatio="none" fill="' + o.c + '" viewBox="0 0 60 60.34" style="width:100%;height:100%">' + o.i + '</svg>';
                }
                break;
            case'path':
                o.c = '#0000';
                if (arg.background && arg.background.color) {
                    o.c = arg.background.color;
                }
                if (arg.border) {
                    o.s = 'stroke:' + arg.border.color + ';stroke-width:' + arg.border.size;
                }
                o.p = arg.cmd.split(' ').join('L');
                if (arg.variant == 'polygon') {
                    o.p += 'z';
                }
                o.i = '<svg style="' + o.s + ';stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1" width="100%" fill="' + o.c + '" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="' + arg.off.x + ' ' + arg.off.y + ' ' + arg.off.w + ' ' + arg.off.h + '" preserveAspectRatio="none" width="100%" height="100%"><path d="M' + o.p + '"></path></svg>';
                if (arg.colorProfile) {
                    o.i = smartDrawing_enforceColorProfile(o.i, arg.colorProfile);
                }
                break;
            case'button':
            case'text':
                o.bufs = [];
                o.ns = 'b' + $.now() + '_smd';
                o.src = arg.source;
                o.stl = 'font-size:' + arg.size + 'px';
                if (c.libs.fonts[arg.font]) {
                    o.stl += ';font-family:' + c.libs.fonts[arg.font][arg.type];
                }
                o.gp = [];
                o.gl = {};
                o.line = parseFloat(arg.line);
                if (isNaN(o.line)) o.line = 0;
                o.yIndex = 0;
                for (o.i = 0; o.src.length > o.i; o.i++) {
                    o.nl = o.src[o.i].y;
                    if (!o.gl[o.nl]) {
                        o.gl[o.nl] = true;
                    }
                    o.gp.push('<tspan id="no" class="' + o.ns + '" x="' + o.src[o.i].x + '" y="' + o.nl + '">' + o.src[o.i].s + '</tspan>')
                }
                o.bufs = '<text>' + o.gp.join('') + '</text>'
                o.cl = '#000';
                if (arg.sym == 'text' && arg.background && arg.background.color) {
                    o.cl = arg.background.color;
                } else {
                    o.cl = '#0000';
                }
                o.vb = arg.off.x + ' ' + arg.off.y + ' ' + arg.off.w + ' ' + arg.off.h;
                o.vb = 'viewBox="' + o.vb + '"';
                o.graph = '<g style="' + o.stl + '">' + o.bufs + '</g>';
                o.tid = $.now() + Math.random().toString().replace('.', '');
                if (arg.sym == 'button') {
                    o.graph = '<path d="' + arg.cmd + '" /><g fill="' + arg.color + '" stroke="none" style="' + o.stl + ';stroke:none" transform="translate(' + arg.xy[0] + ',' + arg.xy[1] + ')">' + o.bufs + '</g><defs></defs>';
                }
                o.i = '<svg width="100%" height="100%" ' + o.vb + '  preserveAspectRatio="xMidYMid" fill="' + o.cl + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + o.graph + '</svg>';
                if (arg.sym == 'text' && arg.colorProfile) {
                    o.i = smartDrawing_enforceColorProfile(o.i, arg.colorProfile);
                }
                break;
            case'mysvgshapes':
                if (c.mysvgshapes) {
                    for (o.k = 0; c.mysvgshapes.length > o.k; o.k++) {
                        if (c.mysvgshapes[o.k].uid === arg.ref) {
                            o.i = c.mysvgshapes[o.k].u;
                            break;
                        }
                    }
                }
                if (!o.i) {
                    o.rid = arg.ref + '_' + $.now();
                    o.i = '<svg ref-id="' + o.rid + '"><image id="' + arg.ref + '" xlink:href="assets/img/loader.gif"   /></svg>';
                    $.ajax({
                        'url': arg.ref + '.svg?' + Math.random(),
                        'type': 'GET',
                        'ref': o.rid,
                        'opt': arg,
                        'dataType': 'html'
                    }).done(function (r, d) {
                        r = $(r).filter('svg').first();
                        r.attr('preserveAspectRatio', 'none').css({'width': '100%', 'height': '100%'})
                        d = c.domStage.find('svg[ref-id="' + this.ref + '"]').replaceWith(r);
                        if (this.opt.uid) {
                            this.opt.svgfxOb = c.idCache[this.opt.uid].fx;
                            r = r.get(0);
                            r.setAttribute('id', this.opt.uid);
                            if (this.opt.colorProfile) {
                                smartDrawing_enforceColorProfile(r, this.opt.colorProfile)
                            }
                            if (this.opt.off) {
                                smartDrawing_enforceOffset(r, this.opt.off);
                            }
                            this.opt.svgfxOb.init(r);
                            c.TL.render(this.opt.uid)
                            this.opt.svgfxOb.applyAll(null, true);
                        }
                    })
                } else {
                    if (arg.colorProfile) {
                        o.i = smartDrawing_enforceColorProfile(o.i, arg.colorProfile);
                    }
                    if (arg.off) {
                        o.i = smartDrawing_enforceOffset(o.i, arg.off);
                    }
                }
                break;
        }
        if (typeof o.i == 'object' && o.i.is('svg')) {
            o.i = o.i.filter('svg').get(0);
            o.i = new XMLSerializer().serializeToString(o.i);
            o.i = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' + o.i;
        } else if (typeof o.i == 'object') {
            o.i = o.i.find('svg').get(0);
        }
        return o.i;
    }
    fixBoundary = function (o) {
        if (!c.workSpaceReady) return;
        o = {}
        o.p = c.domCanvas.position({'my': 'center center', 'at': 'center center', 'of': c.domStage}).position();
        o.c = {};
        if (o.p.top < 0) {
            o.c.top = 0;
        }
        if (o.p.left < 0) o.c.left = 0;
        c.domCanvas.css(o.c)
        return;
    }
    resizeEditor = function (o) {
        o = {};
        o.sc = o.bh = c.domWindow.height();
        o.sw = c.domWindow.width();
        c.domDocBody.css({'height': o.sc + 'px', 'width': o.sw + 'px'});
        o.esh = c.domEditorHeader.outerHeight()
        o.eft = c.domEditorFooter.outerHeight();
        o.sc -= c.domTimeline.outerHeight();
        o.ec = c.domStage.css({'height': (o.sc - (o.esh + (o.eft))) + 'px', 'width': '100%'});
        o.tg = c.domSidebarToggle.outerWidth() + c.domSidebarWrapper.outerWidth();
        o.w = (o.sw - (o.tg));
        o.ec.css('width', o.w + 'px');
        c.domFooterTools.css('width', o.w - 15);
        c.domSidebarWrapper.css('height', o.bh);
        c.domSidebarToggle.css('height', o.bh);
        if (c.workSpaceReady) {
            c.domZoomFit.trigger('click')
            c.domCanvas.position({'at': 'center center', 'of': c.domStage}).css('left', 0);
            fixBoundary();
        } else {
            window.setTimeout(function () {
                c.domCanvas.position({'at': 'center center', 'of': c.domStage}).css('left', 0);
                fixBoundary();
            }, 200)
        }
    }
    bigloader = function () {
        if (c.bigSpinnrer && c.bigSpinnrer.close) return c.bigSpinnrer;
        return mdDialog(function () {
            this.footer = false;
            this.title = false;
            this.size = 'large', this.oninit = function (e) {
                c.bigSpinnrer = this;
                this.body = $(this.target + ' .modal-body').css('height', '100%').addClass('p-0');
                this.wn = $(window);
                $(this.target).css('zIndex', 20000)
                e = {'max-width': '100%', 'height': this.wn.height(), 'margin': 0};
                this.body.parents('.modal-dialog').css(e);
                this.body.parent().css({
                    'height': '100%',
                    'boxShadow': 'none',
                    'border': 'none',
                    'borderRadius': 'none',
                    'background': '#cccccc30'
                });
                this.body.append('<div class="d-flex h-100 align-items-center justify-content-center">' + loader + '</div>').find('figure:first').addClass('d-flex align-items-center justify-content-center').css({
                    'width': 105,
                    'height': 105,
                    'border-radius': 14,
                    'background-color': '#47444f'
                })
            }
            this.onhide = function () {
                delete c.bigSpinnrer;
                this.destroy();
            }
            return this;
        })
    }
    alertMessage = function (type, msg, p, f) {
        f = function () {
            this.title = 'Info';
            this.content = '<div class="alert"><p class="h5 text-inverse text-center">' + msg + '</p></div>';
            this.type = type;
            this.onshow = function (e) {
                $(this.target).css('zIndex', 20000);
                e = 'solid 5px #ff4400';
                if (this.type == 'info') e = 'solid 5px #1e91c4';
                $(this.target + ' .modal-header').addClass('d-none').nextAll('.modal-footer').find('button').removeClass('d-none');
                $(this.target + ' .modal-dialog').addClass('p-2');
                $(this.target + ' .modal-content').css('border', e)
            }
            this.onhide = function () {
                this.destroy();
            }
            return this;
        };
        if (typeof p == 'object' && typeof p.openWindow === 'function' && p.win && p.target) {
            return p.openWindow('alertMessage' + $.now(), f);
        }
        return mdDialog(f)
    }
    c.setEditableCursor = function (e, p) {
        if (!c.PointerSelectionEditor) return;
        p = {};
        p.at = $(e).index();
        p.of = $(e.parentNode).index();
        p.ch = $(c.PointerSelectionEditor.get(0)).contents().filter(function () {
            return this.nodeType == 3;
        });
        p.range = document.createRange();
        p.range.setStart(p.ch[p.of], p.at + 1);
        p.range.collapse(true);
        p.sel = window.getSelection();
        p.sel.removeAllRanges();
        p.sel.addRange(p.range);
        c.PointerSelectionEditor.focus();
    }
    c.changeArcMode = function (m, p) {
        p = c.Arcmode;
        c.Arcmode = m;
        if (c.Arcmode !== p) {
            notify('workspace.afterModeChange');
        }
    }
    c.shourtcutString = [];
    c.shortcutEvents = [65, 83, 90, 67, 86, 68, 48, 57];
    c.keyboardEventKeep = function () {
    }
    c.getShortcut = function () {
        return {
            'add': function (e, s, t) {
                if (e.which == 17) {
                    c.ctrl = true;
                    return;
                }
                s = c.getShortcut();
                if (c.ctrl == true && e.which == 16) {
                    c.ctrlShift = true;
                    return;
                }
                if (c.ctrl == true && c.shortcutEvents.indexOf(e.which) !== -1) {
                    c.shourtcutString.push(e.which);
                }
                if (s.is('ctrl+65')) {
                    s.do(e, 'ctrl+65')
                } else if (s.is('ctrl+83')) {
                    s.do(e, 'ctrl+83');
                } else if (s.is('ctrl+shift+83')) {
                    s.do(e, 'ctrl+shift+83')
                } else if (s.is('ctrl+90')) {
                    s.do(e, 'ctrl+90');
                } else if (s.is('ctrl+67')) {
                    s.do(e, 'ctrl+67');
                } else if (s.is('ctrl+86')) {
                    s.do(e, 'ctrl+86');
                } else if (s.is('ctrl+68')) {
                    s.do(e, 'ctrl+68');
                } else if (s.is('ctrl+48')) {
                    s.do(e, 'ctrl+48')
                } else if (s.is('ctrl+57')) {
                    s.do(e, 'ctrl+57')
                } else {
                    t = '';
                    if (s.isCmd()) {
                        t += 'ctrl+';
                    }
                    if (c.ctrlShift == true) {
                        t += 'shift+';
                    }
                    if (c.shourtcutString.length > 0) {
                        t += c.shourtcutString.join('+');
                    } else {
                        t += e.which;
                    }
                    s.do(e, t);
                }
            }, 'is': function (cm, e) {
                if (c.ctrl !== true) return false;
                e = 'ctrl+';
                if (c.ctrlShift == true) {
                    e += 'shift+';
                }
                return (e + c.shourtcutString.join('+') == cm);
            }, 'isCmd': function () {
                return (c.shourtcutString.length == 0 && c.ctrl === true)
            }, 'has': function (key) {
                if (c.ctrl != true) return false;
                return (c.shourtcutString.indexOf(key) !== -1);
            }, 'do': function (e, t) {
                switch (t) {
                    case'ctrl+48':
                        e.preventDefault();
                        e.stopPropagation();
                        c.domZoomFit.trigger('click');
                        break;
                    case'ctrl+57':
                        e.preventDefault();
                        e.stopPropagation();
                        c.domZoomActual.trigger('click');
                        break;
                    case'ctrl+90':
                        e.preventDefault();
                        e.stopPropagation();
                        c.backHistory(c.history[0], 'before');
                        notify('workspace.afterCtrlZ');
                        break;
                    case'ctrl+65':
                        e.preventDefault();
                        e.stopPropagation();
                        notify('workspace.afterCtrlA');
                        break;
                    case'ctrl+shift+83':
                        e.preventDefault();
                        e.stopPropagation();
                        if (c.Autosave === true) {
                            delete c.Autosave
                        } else {
                            c.Autosave = true;
                        }
                        notify('workspace.afterCtrlShiftS');
                        break;
                    case'ctrl+83':
                        e.preventDefault();
                        e.stopPropagation();
                        notify('workspace.afterCtrlS');
                        break;
                    case'ctrl+67':
                        e.preventDefault();
                        e.stopPropagation();
                        e = Object.keys(c.currentSelection);
                        if (e.length > 0) {
                            workspaceJob('copy', e);
                            notify('workspace.afterCtrlC');
                        }
                        break;
                    case'ctrl+86':
                        e.preventDefault();
                        e.stopPropagation();
                        if (c.clipboard) {
                            notify('obj.beforeCreate', {'obj': c.clipboard})
                        }
                        workspaceJob('paste');
                        if (!c.clipboard) {
                            notify('obj.afterCreate')
                            notify('workspace.afterCtrlP');
                        }
                        break;
                    case'ctrl+68':
                        e.preventDefault();
                        e.stopPropagation();
                        e = Object.keys(c.currentSelection);
                        if (e.length > 0) {
                            if (!notify('obj.beforeCreate', {'obj': e})) return;
                            workspaceJob('clone', e);
                            notify('obj.afterCreate', {'obj': e})
                            notify('workspace.afterCtrlD');
                        }
                        break;
                    default:
                        t = t[0].toUpperCase() + t.substr(1);
                        notify('shortcutevents.after' + t, e);
                        break;
                }
            }, 'remove': function (key, i) {
                if (key == 17) {
                    delete c.ctrl;
                    return;
                }
                if (key == 16) {
                    delete c.ctrlShift;
                    return;
                }
                i = c.shourtcutString.indexOf(key);
                if (i !== -1) {
                    c.shourtcutString.splice(i, 1);
                }
            }
        }
    }
    poa = function (angle, x, y, segment, diagonal) {
        segment = Math.floor(angle / Math.PI * 2) + 2;
        diagonal = (1 / 2 * segment + 1 / 4) * Math.PI;
        op = Math.cos(Math.abs(diagonal - angle)) * Math.sqrt(2);
        x = op * Math.cos(angle);
        y = op * Math.sin(angle);
        return {x1: x < 0 ? 1 : 0, y1: y < 0 ? 1 : 0, x2: x >= 0 ? x : x + 1, y2: y >= 0 ? y : y + 1};
    }

    function guideBoxinfoSetup(e, a, h) {
        if (typeof e == 'object') {
            a = e;
            h = 0;
        } else {
            a = c.domStageViewport;
            h = a.children('.card-footer').outerHeight();
        }
        e = a.get(0).getBoundingClientRect();
        c.guideLines['w'].style.width = e.width + 'px';
        c.guideLines['w'].style.left = e.left + 'px';
        c.guideLines['w2'].style.left = e.left + 'px';
        c.guideLines['w2'].style.width = e.width + 'px';
        c.guideLines['h'].style.height = (c.domStageViewport.height() + c.domEditorHeader.height()) + 'px';
        c.guideLines['h'].style.top = (c.domStageViewport.position().top) + 'px';
        c.guideLines['h2'].style.top = c.guideLines['h'].style.top
        c.guideLines['h2'].style.height = c.guideLines['h'].style.height
    }

    function real_boundary(eles, o) {
        o = {};
        o.k = Object.values(eles);
        o.rg = document.createRange();
        $.each(o.k, function (i, e) {
            if (i == 0) {
                o.rg.selectNode(e[0]);
                return;
            }
            o.rg.insertNode(e[0])
        })
        o.bd = o.rg.getBoundingClientRect();
        o.offset = {'left': o.bd.left, 'top': o.bd.top, 'width': o.bd.width, 'height': o.bd.height}
        return o.offset;
    }

    function real_offset(e, p, a, w, h, w2, h2) {
        if (p) {
            a = p;
        } else {
            a = c.domCanvas;
        }
        e = $(e);
        p = e.attr('scope');
        if (p) {
            p = p.substr(p.lastIndexOf('_') + 1);
        } else {
            p = 0;
        }
        w = a.width();
        h = a.height();
        a = a.children(':eq("' + p + '")');
        w2 = e.get(0).style.left;
        h2 = e.get(0).style.top;
        e.css({'left': '-=1', 'top': '-=1'});
        p = {'left': e.get(0).style.left.replace('px', '')}
        p.top = e.get(0).style.top.replace('px', '')
        e.css({'left': w2, 'top': h2});
        p.left = parseFloat(p.left) + 1;
        p.top = parseFloat(p.top) + 1;
        p.leftab = (p.left / w) * 100;
        p.topab = (p.top / h) * 100;
        p.width = $(e).width();
        p.height = $(e).height();
        p.widthab = (p.width / w) * 100;
        p.heightab = (p.height / h) * 100;
        p.realHeight = (c.height / 100) * p.heightab;
        p.realWidth = (c.width / 100) * p.widthab;
        p.realLeft = (c.width / 100) * p.leftab;
        p.realTop = (c.height / 100) * p.topab;
        return p;
    }

    function interactiveGuide(e, v, t, p, o) {
        p = e.getBoundingClientRect();
        c.guideLines['w'].style.top = p.top + 'px';
        c.guideLines['w2'].style.top = p.bottom + 'px';
        c.guideLines['h'].style.left = p.left + 'px';
        c.guideLines['h2'].style.left = p.right + 'px';
        o = {};
        o.l = p.right >= v.left;
        o.r = p.left <= v.right;
        o.t = p.bottom >= v.top;
        o.b = p.top <= v.bottom;
        o.off = ((o.l && o.r) && (o.t && o.b));
        o.offset = real_offset(e);
        if (t == 'drag') {
            c.guideLines['w'].style.left = p.left + 'px';
            c.guideLines['w2'].style.left = p.left + 'px';
            c.guideLines['wx'].innerHTML = '<strong>Y: </strong> <span>' + number_format(o.offset.realTop) + '</span>';
            c.guideLines['hx'].innerHTML = '<strong>X: </strong> <span>' + number_format(o.offset.realLeft) + '</span>';
        } else {
            c.guideLines['wx'].innerHTML = '<strong>Height: </strong> <span>' + number_format(o.offset.realHeight) + '</span>';
            c.guideLines['hx'].innerHTML = '<strong>Width: </strong> <span>' + number_format(o.offset.realWidth) + '</span>';
        }
        c.guideLines['wx'].style.top = (p.top - ($(c.guideLines['wx']).outerHeight() + 3)) + 'px';
        c.guideLines['wx'].style.left = (p.left - ($(c.guideLines['wx']).outerWidth() + 3)) + 'px';
        c.guideLines['hx'].style.top = (p.bottom + (3)) + 'px';
        c.guideLines['hx'].style.left = (p.right + (3)) + 'px';
        if (o.off == false) {
            c.domDocBody.addClass('guidelineoffBound');
        } else {
            c.domDocBody.removeClass('guidelineoffBound');
        }
        if (p.left >= v.left) {
            $(c.guideLines['h']).removeClass('guidelineoffBound');
        } else {
            $(c.guideLines['h']).addClass('guidelineoffBound');
        }
        if (p.right <= v.right) {
            $(c.guideLines['h2']).removeClass('guidelineoffBound');
        } else {
            $(c.guideLines['h2']).addClass('guidelineoffBound');
        }
        if (p.top >= v.top) {
            $(c.guideLines['w']).removeClass('guidelineoffBound');
        } else {
            $(c.guideLines['w']).addClass('guidelineoffBound');
        }
        if (p.bottom <= v.bottom) {
            $(c.guideLines['w2']).removeClass('guidelineoffBound');
        } else {
            $(c.guideLines['w2']).addClass('guidelineoffBound');
        }
    }

    c.store = function (n, v) {
        n += '_clx';
        try {
            if (v === undefined) {
                return window.localStorage.getItem(n);
            } else if (v === null) {
                window.localStorage.removeItem(n);
            } else {
                window.localStorage.setItem(n, v);
            }
        } catch (e) {
        }
    }
    c.backHistory = function (scope, offset, o) {
        o = {};
        if (typeof scope !== 'object') {
            c.history.shift();
            return;
        }
        o.type = scope.e + '_' + scope.ev;
        switch (o.type) {
            case'obj_fx':
                o.sc = c.domCanvas.find('.objectBox[scope="' + scope.before.id + '"] > .object:first > svg:first')
                o.e = scope[offset];
                if (c.idCache[o.e.uid] && c.idCache[o.e.uid].fx.fx[o.e.k]) {
                    o.ac = {};
                    o.fx = c.idCache[o.e.uid].fx;
                    o.fx.init(o.sc);
                    o.fx.fx[o.e.k].update(o.e.param[o.e.k], false);
                    if (c.isPerpertyOpen && c.isPerpertyTab == 'fx') {
                        o.fx.fx[o.e.k].gui();
                    }
                    o.fx.mute = true;
                    o.fx.applyAll(o.e.k);
                    o.fx.mute = false;
                    o.pass = true;
                    c.slides[0].elements[scope.before.id].prop[o.e.k] = o.e.param[o.e.k];
                }
                break;
            case'obj_fxclear':
                o.e = scope[offset];
                o.sc = c.domCanvas.find('.objectBox[scope="' + scope.before.id + '"] > .object:first > svg:first');
                o.fx = c.idCache[o.e.uid].fx;
                if (offset == 'after') {
                    o.fx.fx[o.e.k].destroy(false);
                    delete c.slides[0].elements[scope.before.id].prop[o.e.k];
                } else {
                    o.p = {};
                    o.p[o.e.k] = o.e.param;
                    o.fx.load(o.p);
                    o.fx.mute = true;
                    o.fx.applyAll(o.e.k);
                    o.fx.mute = false;
                    c.slides[0].elements[scope.before.id].prop[o.e.k] = o.e.param;
                }
                o.pass = true;
                break;
            case'screen_paint':
                o.sc = c.domCanvas.find('> div:eq(' + scope.before.s + ')');
                if (o.sc.length == 0) {
                    return;
                }
                if (offset == 'before') {
                    o.sc.css('background', scope.before.paint);
                    c.slides[scope.before.s].background = scope.before.param;
                } else {
                    o.sc.css('background', scope.after.paint);
                    c.slides[scope.before.s].background = scope.after.param;
                }
                o.pass = true;
                break;
            case'screen_resize':
                if (offset == 'before') {
                    c.width = scope.before.size.w;
                    c.height = scope.before.size.h;
                } else {
                    c.width = scope.after.size.w;
                    c.height = scope.after.size.h;
                }
                $('input#stage_general_config_h').val(c.height);
                $('input#stage_general_config_w').val(c.width)
                c.domCanvas.trigger('stage_resize');
                o.pass = true;
                break;
            case'obj_create':
                o.sc = c.domCanvas.find('> div:eq(' + scope.before.s + ')');
                if (scope.after.len > scope.before.len) {
                    o.ly = c.domSlidesWrapper.find('.view_slide_item:eq(' + scope.before.s + ') > .card-block > .row > div.card[scope]');
                    e = o.sc.find('> .objectBox[scope="' + scope.after.element + '"]');
                    if (offset == 'before') {
                        scope.before.prop = c.slides[scope.before.s].elements[scope.after.element];
                        delete c.slides[scope.before.s].elements[scope.after.element];
                        o.l = o.ly.filter('[scope="' + scope.after.element + '"]');
                        scope.before.ly = o.l.clone();
                        scope.before.lyindex = o.l.index();
                        o.l.remove();
                        scope.before.dom = e.clone();
                        e.remove();
                    } else if (offset == 'after') {
                        c.slides[scope.before.s].elements[scope.after.element] = scope.before.prop;
                        scope.before.dom.removeClass('active');
                        scope.before.dom.appendTo(o.sc);
                        o.ly.parent().prepend(scope.before.ly);
                        o.ly.siblings('[scope]:eq(' + scope.before.lyindex + ')').before(scope.before.ly)
                        scope.before.dom.objectInteract();
                        c.nomalizeSlides();
                        c.domCanvas.triggerHandler('stage_resize');
                    }
                }
                o.pass = true;
                break;
            case'obj_del':
                o.sc = c.domCanvas.find('> div:eq(' + scope.before.s + ')');
                o.ly = c.domSlidesWrapper.find('.view_slide_item:eq(' + scope.before.s + ') > .card-block > .row');
                $.each(scope.before.param, function (e) {
                    if (offset == 'after') {
                        e = this.element.attr('scope');
                        o.sc.find('> .objectBox[scope="' + e + '"]').remove();
                        o.ly.find('> [scope="' + e + '"]').remove();
                        delete c.slides[scope.before.s].elements[e];
                        c.TL.remove(this.prop.prop.uid);
                        delete c.idCache[this.prop.prop.uid];
                        return;
                    }
                    this.element.removeClass('active');
                    this.element.appendTo(o.sc);
                    this.element.objectInteract();
                    o.id = this.prop.id;
                    c.idCache[this.prop.prop.uid] = this.fx;
                    c.slides[scope.before.s].elements[o.id] = this.prop;
                    o.ly.prepend(this.layer);
                    this.fx.fx.init(this.element.find('.object:first > svg:first'));
                    this.fx.fx.applyAll();
                    o.ly.children('[scope]:eq(' + this.layerIndex + ')').before(this.layer)
                })
                c.domCanvas.trigger('stage_resize');
                o.pass = true;
                break;
            case'obj_move':
            case'obj_resize':
                o.sc = c.domCanvas.find('> div:eq(' + scope.before.s + ') > div.objectBox[scope]');
                o.xy = scope.before;
                if (offset == 'after') o.xy = scope.after;
                $.each(o.xy.param, function () {
                    o.el = o.sc.filter('.objectBox[scope="' + this.id + '"]').css({
                        'left': this.x.left + '%',
                        'top': this.x.top + '%',
                        'width': this.x.width + '%',
                        'height': this.x.height + '%'
                    });
                    o.p = o.el.position();
                    c.slides[scope.before.s].elements[this.id].prop.left = o.p.left;
                    c.slides[scope.before.s].elements[this.id].prop.top = o.p.top;
                    c.slides[scope.before.s].elements[this.id].prop.width = o.el.width();
                    c.slides[scope.before.s].elements[this.id].prop.height = o.el.height();
                })
                if (o.type == 'obj_resize') {
                    c.domCanvas.trigger('stage_resize', [true]);
                }
                o.pass = true;
                break;
            case'obj_rename':
                o.ly = c.domSlidesWrapper.find('.view_slide_item:eq(' + scope.before.s + ') > .card-block > .row .card[scope="' + scope.before.param.id + '"] > span.title:first');
                o.i = 'before';
                if (offset == 'after') {
                    o.i = 'after'
                }
                if (scope[o.i].param.name == undefined) {
                    o.sm = c.slides[scope.before.s].elements[scope.before.param.id]
                    if (o.sm.prop.sym) {
                        o.ly.text(o.sm.prop.sym);
                    } else {
                        o.ly.text(c.slides[scope.before.s].elements[scope[o.i].param.id].alias);
                    }
                    delete c.slides[scope.before.s].elements[scope.before.param.id].name;
                } else {
                    c.slides[scope.before.s].elements[scope[o.i].param.id].name = scope[o.i].param.name;
                    o.ly.text(scope[o.i].param.name);
                    c.TL.renameLayer(c.slides[scope.before.s].elements[scope.before.param.id].prop.uid, scope[o.i].param.name);
                }
                o.pass = true;
                break;
            case'obj_rotate':
                o.p = c.domCanvas.find('> div:eq(' + scope.before.s + ') > .objectBox[scope]');
                o.r = scope.before;
                if (offset == 'after') o.r = scope.after;
                $.each(o.r.param, function (i, e) {
                    o.sc = o.p.filter('[scope=' + e.id + ']');
                    c.slides[scope.before.s].elements[e.id].prop.r = e.deg;
                    if (o.sc[0]._gsTransform) {
                        o.sc[0]._gsTransform.rotation = e.deg;
                    }
                    applyPropertyOption(o.sc, {'rotate': e.deg})
                });
                o.pass = true;
                break;
            case'obj_lock':
            case'obj_visible':
                $.each(scope[offset].param, function (i, e) {
                    o.s = this.id.substr(this.id.lastIndexOf('_') + 1);
                    o.el = c.domCanvas.find('> div:eq(' + o.s + ') > .objectBox[scope="' + this.id + '"]');
                    o.ly = c.domSlidesWrapper.find('.view_slide_item:eq(' + o.s + ') > .card-block > .row .card[scope="' + this.id + '"]');
                    applyPropertyOption(o.el, {'lock': (this.loc == false)})
                    applyPropertyOption(o.el, {'hide': (this.vis == false)});
                    if (this.vis == true) {
                        o.ly.find('span:eq(4)').addClass('fa-eye').removeClass('fa-eye-slash')
                    } else {
                        o.ly.find('span:eq(4)').addClass('fa-eye-slash').removeClass('fa-eye')
                    }
                    if (this.loc == true) {
                        c.slides[o.s].elements[this.id].locked = 1;
                        o.ly.find('span:eq(3)').addClass('fa-unlock').removeClass('fa-lock').attr('title', c.language('editor_ui_tip_libobjnolock'))
                    } else {
                        c.slides[o.s].elements[this.id].locked = 0;
                        o.ly.find('span:eq(3)').addClass('fa-lock').removeClass('fa-unlock').attr('title', c.language('editor_ui_tip_libobjlock'))
                    }
                });
                o.pass = true;
                break
            case'obj_order':
                o.lg = c.domCanvas.children()
                $.each(scope[offset].param, function (i, e) {
                    o.s = e.id.substr(e.id.lastIndexOf('_') + 1)
                    o.sc = o.lg.filter(':eq(' + o.s + ')').find('.objectBox[scope=' + e.id + ']');
                    o.sc.css('zIndex', e.ord);
                    c.slides[o.s].elements[e.id].prop.z = e.ord;
                    o.ly = c.domSlidesWrapper.find('.view_slide_item:eq(' + o.s + ') > .card-block > .row .card[scope="' + e.id + '"]');
                    o.ly.parent().children(':eq(' + e.layerIndex + ')').before(o.ly);
                })
                o.pass = true;
                break;
            case'obj_createupdate':
                c.slides[scope.before.s].elements[scope.before.param.id].prop.src = scope[offset].param.src;
                o.sc = c.domCanvas.find('> div:eq(' + scope.before.s + ') > .objectBox[scope="' + scope.before.param.id + '"] > .object image:first').attr('href', scope[offset].param.src);
                o.pass = true;
                break;
            case'obj_pformat':
                o.lg = c.slides[0].elements[scope[offset].id];
                c.idCache[o.lg.prop.uid].fx.loadAll(scope[offset].param);
                c.idCache[o.lg.prop.uid].fx.applyAll(null, true)
                if (c.isPerpertyOpen && c.idCache[o.lg.prop.uid].fx.onActivate) {
                    c.idCache[o.lg.prop.uid].fx.onActivate();
                } else {
                    $.each(scope[offset].param, function (k, v) {
                        o.lg.prop[k] = v;
                    })
                }
                o.pass = true;
                break;
            case'obj_flip':
                break;
            default:
                c.history.shift();
                break;
        }
        c.history.shift();
        if (o.pass === true && offset == 'before') {
            notify('workspace.afterUndo', scope);
        } else if (offset == 'after' && o.pass === true) {
            notify('workspace.afterRedo', scope);
        }
    }
    c.history = [];
    c.backhistory = null;
    c.recordHistory = function (event, entity, fix, data, o, a, e, f) {
        try {
            if (['select'].indexOf(event) != -1) return;
            if (c.history[0] && c.history[0].before !== undefined && !c.history[0].after && fix == 'before') {
                c.history.shift();
                return;
            }
            if (c.history[0] && c.history[0].before && fix == 'after' && (c.history[0].e == entity && c.history[0].ev == event) == false) {
                return;
            }
            f = {};
            switch (entity + '_' + event) {
                case'obj_fx':
                    o = {'s': 0, 'id': data.obj};
                    if (typeof c.slides[o.s].elements[data.obj].prop[data.ref] === 'object') {
                        o.fx = $.extend(true, {}, c.slides[o.s].elements[data.obj].prop[data.ref])
                    } else {
                        o.fx = c.slides[o.s].elements[data.obj].prop[data.ref];
                    }
                    o.param = {};
                    o.param[data.ref] = o.fx
                    o.uid = c.slides[o.s].elements[data.obj].prop.uid;
                    o.k = data.ref;
                    delete o.fx;
                    break;
                case'obj_fxclear':
                    o = {'id': data.obj, 'k': data.ref, 'uid': c.slides[0].elements[data.obj].prop.uid}
                    if (fix == 'before' && typeof c.slides[0].elements[data.obj].prop[data.ref]) {
                        o.param = $.extend(true, {}, c.slides[0].elements[data.obj].prop[data.ref])
                    } else if (fix == 'before') {
                        o.param = c.slides[0].elements[data.obj].prop[data.ref];
                    }
                    break;
                case'screen_paint':
                    o = {'s': c.domCanvas.children('div:visible:first').index()};
                    o.paint = c.domCanvas.children('div:visible:first').css('background');
                    o.param = $.extend({}, true, c.slides[o.s].background);
                    break;
                case'screen_resize':
                    o = {'size': {'w': c.width, 'h': c.height}}
                    break;
                case'obj_create':
                    a = c.domCanvas.children('div:visible:first');
                    o = {'s': a.index()};
                    o.len = Object.keys(c.slides[o.s].elements).length;
                    if (fix == 'after') {
                        o.element = a.children('.objectBox:last').attr('scope')
                    }
                    break;
                case'obj_del':
                    a = c.domCanvas.children('div:visible:first');
                    o = {'s': a.index()};
                    f.domP = c.domSlidesWrapper.find('.view_slide_item:eq(' + o.s + ') > .card-block > .row > .card[scope]');
                    f.objP = a.children('[scope]');
                    o.len = Object.keys(c.slides[o.s].elements).length;
                    if (fix == "before" && typeof data.obj == 'object') {
                        o.param = $.map(data.obj, function (e, i, p, l) {
                            i = f.objP.filter('[scope="' + e + '"]').clone();
                            p = $.extend({}, true, c.slides[o.s].elements[e]);
                            if ((t = c.TL.exportAll(c.slides[o.s].elements[e].prop.uid))) {
                                p.tween = t[c.slides[o.s].elements[e].id]
                            }
                            l = f.domP.filter('[scope="' + e + '"]').clone(true);
                            return {
                                'element': i,
                                'prop': p,
                                'layer': l,
                                'layerIndex': l.index(),
                                'fx': c.idCache[p.prop.uid]
                            };
                        })
                    } else if (fix == 'before') {
                        o.param = [];
                        e = a.children('[scope="' + data.obj + '"]').clone();
                        f.ldom = f.domP.filter('[scope="' + data.obj + '"]').clone();
                        if ((t = c.TL.exportAll(c.slides[o.s].elements[data.obj].prop.uid))) {
                            c.slides[o.s].elements[data.obj].tween = t[c.slides[o.s].elements[data.obj].id]
                        }
                        o.param.push({
                            'layer': f.ldom,
                            'layerIndex': f.ldom.index(),
                            'element': e,
                            'prop': $.extend({}, true, c.slides[o.s].elements[data.obj]),
                            'fx': c.idCache[c.slides[o.s].elements[data.obj].prop.uid]
                        });
                    } else if (fix == 'after' && typeof data.obj == 'obj') {
                        f.check = $.map(data.obj, function (e) {
                            return Number(f.objP.filter('[scope="' + e + '"]').length > 0)
                        })
                    } else if (fix == 'after') {
                        f.ceval = Number(f.objP.filter('[scope="' + data.obj + '"]').length > 0);
                        f.check = [o.ceval];
                    }
                    if (fix == 'after') {
                        f.check = $.unique(f.check);
                    }
                    if (fix == 'after' && f.check.length == 1 && f.check[0] == 1) {
                        o = false;
                    }
                    break;
                case'obj_move':
                case'obj_resize':
                    a = c.domCanvas.children('div:visible:first');
                    o = {'s': a.index()};
                    f.objP = a.children('[scope]');
                    if (typeof data.obj == 'object') {
                        o.param = $.map(data.obj, function (e, i, p) {
                            i = f.objP.filter('[scope="' + e + '"]');
                            f.tp = real_offset(i, a);
                            p = {};
                            p.top = f.tp.topab;
                            p.left = f.tp.leftab;
                            p.width = f.tp.widthab
                            p.height = f.tp.heightab
                            return {'id': e, 'x': p};
                        })
                    } else {
                        o.param = [];
                        f.e = f.objP.filter('[scope="' + data.obj + '"]');
                        f.p = {};
                        f.tp = real_offset(f.e, a);
                        f.p.left = f.tp.leftab;
                        f.p.top = f.tp.topab;
                        f.p.width = f.tp.widthab;
                        f.p.height = f.tp.heightab;
                        o.param.push({'id': data.obj, 'x': f.p});
                    }
                    if (fix == 'after' && typeof data.obj == 'object') {
                        f.check = $.map(data.obj, function (e, i) {
                            return Number(c.history[0].before.param[i].x === f.p);
                        })
                    } else if (fix == 'after') {
                        f.evl = Number(c.history[0].before.param[0].x === f.p);
                        f.check = [f.evl];
                    }
                    if (fix == 'after') {
                        f.check = $.unique(f.check);
                    }
                    if (fix == 'after' && f.check.length == 1 && f.check[0] == 1) {
                        o = false;
                    }
                    break;
                case'obj_rename':
                    a = c.domCanvas.children('div:visible:first');
                    o = {'s': a.index()};
                    o.param = {'id': data.obj, 'name': c.slides[o.s].elements[data.obj].name};
                    break;
                case'obj_rotate':
                    a = c.domCanvas.children('div:visible:first');
                    o = {'s': a.index()};
                    if (typeof data.obj !== 'object') data.obj = [data.obj];
                    o.param = $.map(data.obj, function (e, t, s) {
                        s = e.substr(e.lastIndexOf('_') + 1);
                        return {'id': e, 'deg': c.slides[s].elements[e].prop.r}
                    })
                    break;
                case'obj_lock':
                case'obj_visible':
                    o = {};
                    if (typeof data.obj == 'object') {
                        o.param = $.map(data.obj, function (e, s, l, v, a) {
                            s = e.substr(e.lastIndexOf('_') + 1);
                            a = c.domCanvas.children('div:eq(' + s + ')').find('.objectBox[scope="' + e + '"]');
                            l = (c.slides[s].elements[e].locked == true)
                            v = (a.hasClass('invisible') == false);
                            return {'id': e, 'vis': v, 'loc': l}
                        })
                    } else {
                        o.param = [];
                        f.s = data.obj.substr(data.obj.lastIndexOf('_') + 1);
                        f.dom = c.domCanvas.children('div:eq(' + f.s + ')').find('.objectBox[scope="' + data.obj + '"]');
                        o.param.push({
                            'id': data.obj,
                            'vis': (f.dom.hasClass('invisible') == false),
                            'loc': (c.slides[f.s].elements[data.obj].locked == true)
                        });
                    }
                    break;
                case'obj_order':
                    o = {};
                    f.p = c.domSlidesWrapper;
                    if (typeof data.obj !== 'object') data.obj = [data.obj];
                    o.param = $.map(data.obj, function (e, t, s) {
                        s = e.substr(e.lastIndexOf('_') + 1);
                        t = f.p.find('.view_slide_item:eq(' + s + ') > .card-block > .row .card[scope="' + e + '"]').index();
                        return {'id': e, 'ord': c.slides[s].elements[e].prop.z, 'layerIndex': t};
                    })
                    break;
                case'obj_pformat':
                    o = {'id': data.obj}
                    f.k = c.idCache[c.slides[0].elements[data.obj].prop.uid].fx.toArray();
                    o.param = {};
                    $.each(f.k, function (i, k) {
                        if (fix == 'after' && data.format.indexOf(k) === -1) return;
                        i = c.slides[0].elements[data.obj].prop[k];
                        if (typeof i == 'object') {
                            o.param[k] = $.extend({}, true, i)
                        } else {
                            o.param[k] = i;
                        }
                    })
                    break;
                case'obj_createupdate':
                    o = {'s': data.obj.substr(data.obj.lastIndexOf('_') + 1)};
                    o.param = {'id': data.obj, 'src': c.slides[o.s].elements[data.obj].prop.src}
                    break;
            }
        } catch (e) {
        }
        if (o === false || fix == 'after' && c.history[0] === undefined) {
            return;
        }
        if (fix == 'after' && c.history[0].before && c.history[0].e == entity && c.history[0].ev == event) {
            c.history[0].after = o;
        } else {
            c.history.unshift({'before': o, 'e': entity, 'ev': event});
        }
        if (c.history.length > 50) {
            c.history = c.history.slice(0, 50);
        }
    }
    logStatus = function (msg) {
        if (typeof msg !== 'object') return;
        msg = $.extend(false, {}, msg);
        if (msg.type && ['text', 'bubble', 'progress'].indexOf(msg.type) == -1) {
            msg.type = 'text';
        }
        switch (msg.type) {
            case'text':
                msg.text = msg.text.replace(/([s\d\w]+)+\:([^\s]+.*?)/g, '<span class="mr-2" meta-id="$1">$1: <em class="text-danger">$2</em> </span> ');
                $('#workstation_status').html('<div class="p-2"><p class="text-center">' + msg.text + '</p></div>');
                break;
            case'progress':
                if (msg.rate == '100') {
                    $('#workstation_status > .progress').remove();
                    logStatus({'type': 'text', 'text': 'Ready'})
                    return;
                }
                $('#workstation_status').html('<div class="progress"><div class="progress-bar" style="width:' + msg.rate + '%"></div></div>');
                msg.cl = [];
                if (msg.color) {
                    msg.cls = {'red': 'bg-danger', 'blue': 'bg-info', 'green': 'bg-success', 'orange': 'bg-warning'};
                }
                if (msg.color && msg.cls[msg.color]) {
                    msg.cl.push(msg.cls[msg.color]);
                } else {
                    msg.cl.push('bg-info');
                }
                if (msg.striped) {
                    msg.cl.push('progress-bar-striped');
                }
                if (msg.cl.length > 0) {
                    $('#workstation_status .progress-bar').removeClass('bg-info bg-danger bg-success bg-warning').addClass(msg.cl.join(' '));
                }
                break;
            case'bubble':
                $('#workstation_status').html('<div class="p-2"><p class="text-center"><span class="bubble">' + msg.text + '</span></p></div>');
                break;
        }
    }
    c.refreshDocColorPalette = function (cp, e) {
        cp = {};
        c.domCanvas.find('div.objectBox[scope]').each(function (e, s, i, a) {
            e = $(this);
            a = e.attr('scope');
            s = a.substr(a.lastIndexOf('_') + 1);
            if (!c.slides[s]) return;
            if (c.slides[s].background.color) {
                cp[c.slides[s].background.color] = true;
            }
            if (!c.slides[s].elements[a]) {
                return;
            }
            if (c.slides[s].elements[a].prop.background && c.slides[s].elements[a].prop.background.color) {
                cp[c.slides[s].elements[a].prop.background.color] = true;
            }
            if (c.slides[s].elements[a].prop.background && c.slides[s].elements[a].prop.background.gradient) {
                cp[c.slides[s].elements[a].prop.background.gradient[0].start] = true;
                cp[c.slides[s].elements[a].prop.background.gradient[0].stop] = true;
            }
            if (c.slides[s].elements[a].prop.color) {
                cp[c.slides[s].elements[a].prop.color] = true;
            }
            if (c.slides[s].elements[a].prop.text && c.slides[s].elements[a].prop.text.color) {
                cp[c.slides[s].elements[a].prop.text.color] = true;
            }
            if (c.slides[s].elements[a].prop.border) {
                cp[c.slides[s].elements[a].prop.border.color] = true;
            }
        })
        cp = Object.keys(cp);
        if (cp.length > 0) {
            c.ColorPalette = [];
            e = $.map(cp, function (i) {
                i = i.replace('#', '');
                c.ColorPalette.unshift('#' + i);
                return '<div data-object="bg_colors" data-object-ref="' + i + '" class="card object col-1 loaded" data-lib-link="' + i + '" style="background-color: #' + i + ';margin-bottom:0;margin-top:5px;margin-left:5px"></div>'
            })
            c.domLibraryContainers.filter('#objectpack_bg').find('.tab-content > #editor_material_color .row:first > div.col-12:eq(1)').html(e.join(''));
        }
    }
    recordActivity = function (actions, elements, cb) {
    }
    c.nomalizeSlides = function (obj) {
        obj = {};
        obj.scenes = c.domCanvas.children('div');
        obj.scenes.each(function (i) {
            obj.s = $(this).index();
            obj.d = Object.keys(c.slides[obj.s].elements);
            obj.scene = $(this);
            c.domSlidesWrapper.find('.view_slide_item:eq(' + obj.s + ')').find('.card-header:first span.title:first').text('Slide ' + (obj.s + 1));
            for (i = 0; obj.d.length > i; i++) {
                obj.al = obj.d[i];
                obj.id = c.slides[obj.s].elements[obj.al].id;
                obj.id = obj.id.substr(0, obj.id.lastIndexOf('_') + 1) + obj.s;
                c.slides[obj.s].elements[obj.al].id = obj.id;
                obj.scene.children('.objectBox[scope="' + obj.al + '"]').attr('scope', obj.id);
                obj.l = c.domSlidesWrapper.find('> .view_slide_item:eq(' + obj.s + ') > .card-block > .row .card[scope="' + obj.al + '"]').attr('scope', obj.id);
                if (!c.slides[obj.s].elements[obj.al].name && c.slides[obj.s].elements[obj.al].prop.sym) {
                    obj.l.find('span.title:first').text(c.slides[obj.s].elements[obj.al].prop.sym)
                } else if (!c.slides[obj.s].elements[obj.al].name) {
                    obj.l.find('span.title:first').text(c.slides[obj.s].elements[obj.al].alias)
                } else {
                    obj.l.find('span.title:first').text(c.slides[obj.s].elements[obj.al].name)
                }
                obj.el = $.extend(true, {}, c.slides[obj.s].elements[obj.al]);
                delete c.slides[obj.s].elements[obj.al];
                c.slides[obj.s].elements[obj.id] = obj.el;
            }
        })
    }
    notify = function (event, data, o) {
        o = {};
        o = event.match(/(\w+)\.([a-z]+)+(.*)/);
        if (o) {
            o[3] = o[3].toLowerCase();
        }
        try {
            Events.call(o[1] + '.' + o[3], o[2], data);
            if (c.workSpaceReady === true && o && o[1] == 'obj' || o[1] == 'screen') {
                c.recordHistory(o[3], o[1], o[2], $.extend({}, true, data));
            }
        } catch (e) {
            return false;
        }
        return true;
    }
    addSlides = function (scope, b, e, t, s, i) {
        c.domCanvas.trigger('disconnectScope', ['.active']);
        b = c.domCanvas.empty();
        c.domSlidesWrapper.empty();
        c.slides = [];
        c.history = [];
        c.domScreenAdd.trigger('click');
        s = b.children(':first');
        $('input#stage_general_config_h').val(scope.size[1]);
        $('input#stage_general_config_w').val(scope.size[0]).trigger('mouseenter');
        e = buildTPL(scope.tpl.slides[0], s);
        t = scope.tpl.slides.length;
        for (i = 1; t > i; i++) {
            c.domScreenAdd.trigger('click');
            s = s.hide(0).next().show(0);
            buildTPL(scope.tpl.slides[i], s);
        }
        c.slides = $.extend(true, [], scope.tpl.slides);
        c.nomalizeSlides();
        c.refreshDocColorPalette();
    }
    buildTPL = function (options, dom, standalone, e, i) {
        options = $.extend(true, {}, options);
        if (typeof dom !== 'object') {
            dom = $('<div style="width:100%;height:100%"><div>')
        }
        if (options.background.zoom !== undefined) {
            if (options.background.zoom >= 100) {
                options.background.zoom = 'cover';
            } else {
                options.background.zoom += '% ' + options.background.zoom + '%';
            }
        }
        if (options.background.color) {
            if (options.background.color == '00000000' || options.background.color == '#0000' || options.background.color == '#00000000') {
                dom.css('background-image', 'url(library/bg_textures/tmb/transparency.jpg)');
            } else {
                dom.css('background', options.background.color);
            }
        } else if (options.background.gradient) {
            options.gr = $.map(options.background.gradient.stops, function (i) {
                return i.color + ' ' + i.offset;
            })
            if (options.background.gradient.mode == 'l') {
                options.grt = 'linear-gradient';
            } else {
                options.grt = 'radial-gradient';
                if (options.background.gradient.deg.toString().indexOf('circle') !== 0) {
                    options.background.gradient.deg = 'circle ' + options.background.gradient.deg.substr(options.background.gradient.deg.indexOf('at'));
                }
            }
            dom.css('background', options.grt + '(' + options.background.gradient.deg + ',' + options.gr.join(',') + ')');
        } else if (options.background.pattern) {
            c.applyPattern(dom, options.background.pattern);
        } else if (options.background.image) {
            dom.css({
                'background-image': 'url(' + options.background.image + ')',
                'background-repeat': 'repeat',
                'background-position': options.background.x + 'px ' + options.background.y + 'px',
                'background-size': options.background.zoom
            });
        }
        if (options.elements == undefined || Object.keys(options.elements).length == 0) {
            return dom;
        }
        e = Object.keys(options.elements);
        options.layers = [];
        $.each(e, function (i) {
            options.elid = e[i];
            if (['buttons', 'texts'].indexOf(options.elements[options.elid].alias) !== -1) {
                options.elref = 0;
            } else if (options.elements[options.elid].alias == 'images') {
                options.elref = {
                    'u': options.elements[options.elid].prop.src,
                    'l': options.elements[options.elid].prop.src
                };
            } else if (['sticker', 'sprite'].indexOf(options.elements[options.elid].alias) !== -1) {
                options.elref = options.elements[options.elid].prop.src;
            } else if (options.elements[options.elid].alias == 'shape' && options.elements[options.elid].prop.src) {
                options.elref = options.elements[options.elid].prop.src.split('/')[0];
            }
            $('<div style="width:' + options.elements[options.elid].prop.w + ';height:' + options.elements[options.elid].prop.h + '"></div>').css({'position': 'absolute'}).appendTo(dom);
            s = dom.children(':last').data({
                'object': options.elements[options.elid].alias,
                'object-ref': options.elref,
                'uid': options.elements[options.elid].prop.uid
            });
            if (options.elements[options.elid].alias == 'shape') {
                if (options.elements[options.elid].prop.sym) {
                    s.data('object-src', options.elements[options.elid].prop)
                } else {
                    options.elrefid = options.elements[options.elid].prop.src.split('/')[1];
                    options.elrefpos = Object.values(c.libs.shapes[options.elref]).indexOf(options.elrefid);
                    c.shapeBlob[options.elref] = {};
                    c.shapeBlob[options.elref][options.elrefpos] = '<svg data-id="' + options.elid + '" data-target="' + options.elements[options.elid].prop.src + '"></svg>';
                    s.data('object-src', options.elrefid);
                    $.ajax({
                        'url': c.policySetup.PUBLIC_SHAPE_REPO + '/library/shapes/' + options.elref + '/svg/' + options.elrefid + '.svg',
                        'type': 'GET',
                        'target': options.elements[options.elid].prop.src,
                        'el': options.elid,
                        'dataType': 'html',
                        'opt': options.elements[options.elid],
                        'cache': true,
                        'cat': options.elref,
                        'index': options.elrefpos
                    }).done(function (r, e, b, a) {
                        b = $('svg[data-target="' + this.target + '"][data-id="' + this.el + '"]');
                        a = {};
                        if (b.attr('fill')) {
                            a.fill = b.attr('fill');
                        }
                        c.shapeBlob[this.cat][this.index] = r;
                        a.preserveAspectRatio = 'none';
                        r = $(r).filter('svg').attr(a).css({'width': '100%', 'height': '100%'});
                        this.opt.svgfxOb = c.idCache[this.opt.prop.uid].fx;
                        if (this.opt.prop.colorProfile) {
                            smartDrawing_enforceColorProfile(r, this.opt.prop.colorProfile)
                        }
                        if (this.opt.prop.off) {
                            smartDrawing_enforceOffset(r, this.opt.prop.off);
                        }
                        e = b.replaceWith(r);
                        r = r.get(0);
                        r.setAttribute('id', this.opt.prop.uid);
                        this.opt.svgfxOb.init(r);
                        this.opt.svgfxOb.loadAll(this.opt.prop);
                        this.opt.svgfxOb.applyAll(false, true);
                        c.TL.render(this.opt.prop.uid)
                    }).fail(function (t) {
                        t = c.language('editor_ui_msg_dataloaderr');
                        toastr['error'](t);
                    })
                }
            }
            if (options.elements[options.elid].prop.r !== undefined) {
                s.data('src-rotate', options.elements[options.elid].prop.r);
            }
            c.domCanvas.trigger('addObject', [s, {}, s]);
            options.eldom = c.domCanvas.children('div:visible:first').find('.objectBox[scope]:last');
            options.eldomInner = options.eldom.children('.object:first');
            options.eldomSvg = options.eldomInner.children('svg:first');
            options.eldom_id = options.eldom.attr('scope');
            options.elements[options.elid].svgfxOb = c.idCache[options.elements[options.elid].prop.uid].fx;
            if (options.elements[options.elid].alias !== 'shape') {
                options.elements[options.elid].svgfxOb.loadAll(options.elements[options.elid].prop);
            }
            applyPropertyOption(options.eldom, {'xy': options.elements[options.elid].prop.left + 'x' + options.elements[options.elid].prop.top});
            applyPropertyOption(options.eldom, {'wh': options.elements[options.elid].prop.w + 'x' + options.elements[options.elid].prop.h});
            if (options.elements[options.elid].alias == 'shape' && options.elements[options.elid].prop.sym !== undefined) {
                if (options.elements[options.elid].prop.sym == 'line') {
                }
            }
            if (options.elements[options.elid].prop.r !== undefined) {
            }
            if (options.elements[options.elid].prop.flip !== undefined) {
                applyPropertyOption(options.eldomInner, {'flip': options.elements[options.elid].prop.flip});
            }
            if (options.elements[options.elid].noshow == 1) {
                applyPropertyOption(options.eldom, {'hide': options.elements[options.elid].noshow});
            }
            if (options.elements[options.elid].locked == 1 || options.elements[options.elid].locked == 'true') {
                applyPropertyOption(options.eldom, {'lock': options.elements[options.elid].locked});
            }
            options.eldom.css('zIndex', options.elements[options.elid].prop.z);
            options.el_lay = $('#wrapper_slide_groups #view_slide_items .view_slide_item > .card-block > .row > div[scope="' + options.eldom.attr('scope') + '"]');
            if (options.elements[options.elid].locked == 1) {
                options.el_lay.find('span.fa-lock').removeClass('fa-lock').addClass('fa-unlock');
            }
            if (options.elements[options.elid].noshow == 1) {
                options.el_lay.find('span.fa-eye').removeClass('fa-eye').addClass('fa-eye-slash');
                options.el_lay.attr('data-visibility', 1);
            }
            if (options.elements[options.elid].name) {
                options.el_lay.find('span.title:first').attr('title', options.elements[options.elid].name).text(options.elements[options.elid].name);
            }
            if (options.elements[options.elid].grpid) {
                options.eldom.attr('group_id', options.elements[options.elid].grpid).addClass('grouped');
            }
            options.layers.push(options.el_lay);
            if (standalone === true) {
                options.el_lay.remove();
            } else {
                options.el_lay.attr('scope', options.elid);
            }
            options.eldom.attr('scope', options.elid);
            delete c.slides[0].elements[options.eldom_id];
            options.eldom.appendTo(dom);
        })
        if (standalone !== true && options.layers.length > 0) {
            $.each(options.layers, function () {
                this.appendTo(this.parent())
            })
            options.layers[0].parent().children('div[locked]').appendTo(options.layers[0].parent());
        }
        return dom;
    }
    degToRad = function (d) {
        return ((d * Math.PI) / 180);
    }
    c.domColorPickerRef = c.domDocBody.append('<input id="colorGold" />').find('#colorGold:last');
    c.domColorPickerRef.spectrum({
        'flat': true,
        'containerClassName': 'fade d-none colorGold_wrapper',
        'hide': function () {
            c.domColorPickerRef.spectrum('container').addClass('d-none').removeClass('in');
        },
        'showInput': true,
        'preferredFormat': 'hex',
        'showPalette': true,
        'togglePaletteMoreText': 'Show picker',
        'togglePaletteLessText': 'Hide picker',
        'clickoutFiresChange': false,
        'showButtons': true,
        'palette': c.ColorPalette,
        'allowEmpty': true,
        'change': function (e, b) {
            if (c.colorRotating) return;
            b = (c.domColorPickerRef.spectrum('option', 'move'));
            if (b) b(e)
            c.colorRotating = true;
            window.setTimeout(function () {
                delete c.colorRotating;
            }, 20)
        },
        'showAlpha': false,
        'show': function (o) {
            o = {};
            o.ec = c.domColorPickerRef.next('.colorGold_wrapper');
            o.eb = $('<a href="#" class="btn choose btn-sm btn-primary" >Add to pallete</a>');
            o.ec.find('.sp-choose').replaceWith(o.eb);
            o.eb.off('click').click(function (e, f, b) {
                e.stopPropagation();
                b = c.domColorPickerRef.spectrum('get');
                if (b == null) {
                    b = '#0000';
                } else {
                    b = b.toHexString()
                }
                if (!notify('workspace.beforeAddColorToPalette', {'ref': b})) return;
                e = c.domColorPickerRef.spectrum('container');
                f = e.data('CGEl').trigger('colorapply', [b])
            }).prev('.sp-cancel').off().click(function (e) {
                e = c.domColorPickerRef.spectrum('container').addClass('d-none').removeClass('in');
                e.data('CGEl').trigger('colorcancel')
            });
        },
        'move': function (e, f, b) {
            if (c.colorRotating) return;
            f = c.domColorPickerRef.spectrum('container');
            b = {}
            if (e === null) {
                b.color = '#0000';
                b.rgb = {'r': 0, 'g': 0, 'b': 0, 'a': 0}
            } else {
                b.color = e.toHexString();
                b.rgb = e.toRgb();
            }
            f.data('CGEl').trigger('cgupdate', [b]);
            c.colorRotating = true;
            window.setTimeout(function () {
                delete c.colorRotating;
            }, 20)
        }
    }).on('dragstart.spectrum', function (f) {
        f = c.domColorPickerRef.spectrum('container');
        f.data('CGEl').trigger('dragstart.spectrum');
    }).on('dragstop.spectrum', function (f) {
        f = c.domColorPickerRef.spectrum('container');
        f.data('CGEl').trigger('dragstop.spectrum');
    })
    c.domDocBody.on('click', function (e, i) {
        i = c.domColorPickerRef.spectrum('container');
        if (i.is(':visible') == false) return;
        i.addClass('d-none').removeClass('in');
    })
    $.fn.gradientGold = function (config, default_config) {
        default_config = {'items': [], 'angle': 0, 'type': 'linear', 'apply': $.noop};
        config = $.extend(default_config, false, config);
        return this.each(function (a, d, f) {
            $(this).find('.gradient_markup_wrapper').remove();
            a = $(this).append('<div class="gradient_markup_wrapper row col-12"></div>').children(':last');
            a.data('uiColorGold', config)
            a.append('<div class="col-12"><label>Mode</label><select class="form-control"><option value="linear">Linear</option><option value="radial">Radial</option></select></div>');
            a.find('select:first').on('change', function (e) {
                e = $(this).val();
                $(this).parent().next('.gradient_markup').find('.card-header:first').data('gradtype', e + '-gradient').next().trigger('update');
            })
            a.append('<div class="col-12 gradient_markup mt-4 h-100 bg-none border-0 p-0"><div class="card-header" style="height:35px"></div><div class="card-footer bg-none border-0 pl-0 pr-0"></div></div>').append('<div class="col-12 gradient_markup gradient_markup_deg bg-none border-0 h-100"><div class="card-header center"><div class="fa fa-2x os-icon os-icon-arrow-2-up "></div><span class="text-danger degstr">0</span></div></div>').append('<div class="center col-12 mt-2"><button class="btn btn-primary">' + c.language('editor_ui_apply') + '</button></div>');
            a.data('gradientMarshup', [])
            a.find('.card-footer:first').on({
                'click': function (e, o) {
                    o = $(this);
                    if (o.hasClass('moved')) return;
                    if (o.find('span.fa').length >= 5) return;
                    o.trigger('addNode', [e])
                }
            }).on('click', 'span.fa', function (e) {
                e.stopPropagation();
            }).on('update', function (e, i, a) {
                e = []
                $(this).find('span.fa').map(function (i, a, k) {
                    i = $(this).data('colorGold');
                    if (!i.stop) i.stop = 0;
                    e.push(i.color + ' ' + i.stop + '%');
                })
                if (e.length == 0) return;
                i = e.join(',');
                a = $(this).prev();
                a.data('gradlist', i);
                $(this).trigger('apply');
            }).on('apply', function (e, i, a, k) {
                a = $(this).prev();
                e = 0;
                a = $(this).prev();
                i = a.data('gradlist');
                if (i == undefined) return;
                k = a.data('gradDeg');
                if (k) {
                    e = k;
                }
                k = a.data('gradtype');
                if (!k) {
                    k = 'linear-gradient';
                }
                if (k == 'radial-gradient') {
                    e = 'circle at ' + e + '%';
                } else {
                    e += 'deg';
                }
                a.css('background', '').css('background', k + '(' + e + ',' + i + ')')
            }).on('addNode', function (a, e, t) {
                t = $(this);
                a = t.append('<span class="fa fa-square fa-2x " style="position:absolute;left:0px;top:33px;color:#047bf8"></span>').children(':last').css('boxShadow', 'black 0px 0px 15px 0px inset').draggable({
                    'axis': 'x', 'containment': 'parent', 'drag': function (e, u, a) {
                        a = $(this);
                        if (a.hasClass('dragging') == false) return;
                        o = a.data('gradUi');
                        o.container.addClass('moved')
                        o.startOffsetX = e.pageX;
                        o.s = ((100 / o.containerWidth) * u.position.left).toString();
                        o.stop = o.s.substr(0, o.s.indexOf('.') + 2);
                        if (o.gradlist[o.index]) {
                            o.gradlist[o.index] = o.color + ' ' + o.stop + '%';
                            o.handlerEl.data('gradlist', o.gradlist.join(','))
                            u.g = a.data('colorGold');
                            u.g.stop = o.stop;
                            a.data('colorGold', u.g)
                            o.container.trigger('apply')
                        }
                    }, 'start': function (o, e) {
                        o = {};
                        o.startOffsetX = e.pageX;
                        e = $(this);
                        e.addClass('dragging');
                        o.container = e.parent();
                        o.containerWidth = o.container.outerWidth();
                        o.handlerEl = o.container.prev();
                        o.gradlist = o.handlerEl.data('gradlist');
                        o.offsetX = o.container.offset().left;
                        if (o.gradlist) {
                            o.gradlist = o.gradlist.split(',');
                        } else {
                            o.gradlist = [];
                        }
                        o.index = e.index();
                        o.color = o.gradlist[o.index].split(' ')[0];
                        e.data('gradUi', o);
                    }, 'stop': function (e, a, i) {
                        a = $(this);
                        i = a.parent();
                        if (i.hasClass('moved')) {
                            i.removeClass('moved');
                            c.domColorPickerRef.spectrum('container').addClass('d-none').removeClass('in');
                        }
                        a.removeData('gradUi')
                    }
                }).colorGold();
                if (typeof e == 'object') {
                    a.css({'left': e.pageX - t.offset().left})
                }
                e = {};
                e.p = a.data('colorGold');
                a.css('color', e.p.color)
                e.s = ((100 / a.parent().outerWidth()) * a.position().left);
                if (!isNaN(e.s)) e.s = e.s.toString(); else e.s = '0';
                e.inn = e.s.indexOf('.');
                if (e.inn !== -1) {
                    e.p.stop = e.s.substr(0, e.inn + 2);
                } else {
                    e.p.stop = e.s;
                }
                a.data('colorGold', e.p)
                t.trigger('update');
            }).on('colorupdate', 'span.fa', function (e, cl) {
                $(this).css('color', cl.color).parent().trigger('update');
            }).on('colorcancel', 'span.fa', function () {
                e = $(this).parent();
                if (e.find('span.fa').length <= 2) return;
                $(this).remove();
                e.trigger('update')
            })
            f = a.find('.card-footer:first');
            if (config.items.length > 0) {
                $.each(config.items, function (x, d) {
                    d = f.trigger('addNode').children(':last');
                    x = d.data('colorGold');
                    x.color = this.color;
                    x.stop = this.offset.replace('%', '');
                    d.data('colorGold', x);
                    d.css({'left': x.stop + '%', 'color': x.color})
                });
            } else {
                f.trigger('addNode')
                f.trigger('addNode').children(':last').css({
                    'left': '65%',
                    'color': '#d1cece'
                }).data('colorGold', {'color': '#d1cece', 'stop': 65});
            }
            f = a.find('.gradient_markup_deg');
            d = f.find('.card-header:first .fa:first')
            d.rotatable({
                'degrees': config.angle, 'rotate': function (e, i) {
                    e = i.angle.degrees.toString().split('.');
                    if (e.length > 1) {
                        e[0] += '.' + e[1].substr(0, 1)
                    }
                    $(this).data('gradEl').data('gradDeg', e[0])
                    $(this).next('span').text(e[0])
                    i.el = $(this).data('gradEl');
                    i.el.next().trigger('apply');
                }, 'handle': d
            }).data('gradEl', f.prev().find('.card-header:first').data('gradDeg', config.angle));
            d.next('span').text(config.angle);
            a.find('select:first').val(config.type).trigger('change');
            f.next().find('button:first').click(function (e, a, p) {
                p = $(this).parents('.gradient_markup_wrapper');
                a = $.extend(true, {}, p.data('uiColorGold'));
                e = $(this).parent().prev().prev().find('.card-header').data();
                if (e.gradlist) {
                    a.items = e.gradlist.split(',');
                }
                if (e.gradDeg) {
                    a.angle = e.gradDeg;
                }
                if (e.gradtype) {
                    a.type = e.gradtype;
                } else {
                    a.type += '-gradient';
                }
                a.bType = a.type.split('-')[0];
                a.bItems = $.map(a.items, function (e) {
                    e = e.split(' ')
                    return {'color': e[0], 'offset': e[1].replace('%', '')};
                });
                a.colorMap = p.find('.card-header:first').get(0).style.background;
                a.element = p;
                e = a.apply;
                delete a.apply;
                e(a);
            })
        })
    }
    $.fn.colorGold = function (e, v) {
        return this.each(function (i, d) {
            d = $(this);
            if (d.is('input') && typeof e !== 'string') {
                e = d.val();
            }
            d.css('cursor', 'pointer')
            if (e == '' || e == null || e == undefined) {
                e = '#000';
            }
            d.data('colorGold', {'color': e});
            e = c.domDocBody.find('#colorGold');
            d.off('click.cg').on('click.cg', function (e, f, i) {
                e.stopPropagation();
                e = c.domColorPickerRef.spectrum('container');
                i = $(this);
                f = i.data('colorGold');
                e.data('CGEl', i)
                f = i.offset();
                c.domColorPickerRef.spectrum('option', 'palette', c.ColorPalette);
                e.css({
                    'left': f.left,
                    'top': f.top,
                    'position': 'absolute'
                }).removeClass('d-none').show(500, function (e, p, o, f) {
                    e = $(this).addClass('in').focus();
                    f = e.data('CGEl').data('colorGold');
                    c.domColorPickerRef.spectrum('set', f.color);
                    c.domColorPickerRef.spectrum('show');
                    p = e.position();
                    p.h = e.height();
                    p.w = e.width();
                    if (p.h + p.top > c.domDocBody.height()) {
                        e.css('top', '-=' + p.h)
                    }
                    if (p.w + p.left > c.domDocBody.width()) {
                        e.css('left', '-=' + p.w)
                    }
                })
            }).off('cgupdate').on('cgupdate', function (e, c, f) {
                f = $(this).data('colorGold');
                f.color = c.color;
                f.rgb = c.rgb;
                $(this).data('colorGold', f).trigger('colorupdate', [f]);
            })
        })
        return this;
    }
    $.fn.drag = function (config, cf) {
        cf = {'start': $.noop, 'drag': $.noop, 'stop': $.noop, 'step': 0, 'trigger': null}
        if (config !== 'destroy') {
            cf = $.extend(true, cf, config);
        }
        return this.each(function () {
            if (config === 'destroy') {
                $(this).off('mousedown.drg').off('mouseup.drg').off('mousemove.drg').removeData('drahEvent-ei')
                return;
            }
            $(this).on({
                'mousedown.drg': function (ev, e, s) {
                    s = $(this);
                    s.removeClass('ei-initiated').addClass('ei-active');
                    ev.stopPropagation();
                    clearTimeout(c.eidrag_init);
                    c.eidrag_init = window.setTimeout(function () {
                        if (!s.hasClass('ei-active')) return;
                        e = s.addClass('ei-initiated');
                        e = ev.data.config;
                        e.hold = false;
                        s.one('dragstart', e.start).trigger('dragstart', [{
                            'offset': {
                                'left': ev.pageX,
                                'top': ev.pageY
                            }, 'event': ev
                        }])
                        e.startPos = {'x': ev.pageX, 'y': ev.pageY};
                        e.position = {'left': 0, 'top': 0};
                        window.setTimeout(function (i) {
                            i = $(document).find('.ei-initiated').not('.ei-dragging').removeClass('ei-dragging ei-active ei-initiated').addClass('ei-dragging-stopped')
                            if (i.length > 0) {
                            }
                        }, 1000)
                    }, 500)
                }, 'mousemove.drg': function (ev, e, s, u, p) {
                    e = $(this);
                    ev.stopPropagation();
                    if (!e.hasClass('ei-initiated')) return;
                    clearTimeout(c.eidrag_init);
                    s = ev.data.config
                    if (!s) return;
                    clearTimeout(s.t);
                    e.addClass('ei-dragging')
                    if (ev.pageX > s.startPos.x) {
                        s.position.left += (ev.pageX - s.startPos.x)
                    } else if (ev.pageX < s.startPos.x) {
                        s.position.left -= (s.startPos.x - ev.pageX)
                    }
                    if (ev.pageY > s.startPos.y) {
                        s.position.top += (ev.pageY - s.startPos.y);
                    } else if (ev.pageY < s.startPos.y) {
                        s.position.top -= (s.startPos.y - ev.pageY)
                    }
                    s.startPos = {'x': ev.pageX, 'y': ev.pageY};
                    e.one('dragmove', s.drag).trigger('dragmove', [{
                        'offset': {'left': ev.pageX, 'top': ev.pageY},
                        'position': s.position,
                        'event': ev
                    }])
                    s.t = window.setTimeout(function () {
                        $(document).find('.ei-initiated').removeClass('ei-dragging ei-active ei-initiated').addClass('ei-dragging-stopped')
                    }, 500)
                }, 'mouseup.drg': function (ev, e, s, u) {
                    u = $(this);
                    u.addClass('ei-dragging-stopped')
                    s = u.removeClass('ei-dragging ei-active ei-initiated');
                    s = ev.data.config;
                    s.hold = true;
                    console.log('stopped')
                    clearTimeout(s.t);
                    ev.stopPropagation();
                    if (!s) return;
                    $(this).one('dragstop', s.stop).trigger('dragstop', [{
                        'offset': {'left': ev.pageX, 'top': ev.pageY},
                        'event': ev
                    }])
                },
            }, cf.trigger, {'config': cf})
        })
    }
    $.fn.switch = function (cf) {
        return this.each(function (e, m, k) {
            e = $(this);
            e.attr('type', 'checkbox')
            m = e.hide(0).after('<div class="switch_wrapper"><button class="btn btn-rounded btn-primary btn-block p-0 pl-4 mt-2 on"><i class="fa fa-circle ml-0" style=""></i></button></div>').next();
            k = {'element': e, 'value': e.is(':checked')};
            m.data('uiswitch', k);
            e.on('change.sw', function (e, m) {
                e = $(this).next('.switch_wrapper');
                m = e.data('uiswitch');
                if ($(this).is(':checked')) {
                    e.addClass('on')
                    m.value = true;
                } else {
                    e.removeClass('on');
                    m.value = false;
                }
            })
            m.find('button').on('click.sw', function (e, m) {
                e.stopPropagation();
                e = $(this).parents('.switch_wrapper')
                m = e.data('uiswitch');
                $(this).triggerHandler('updateSwitch');
                m.element.triggerHandler('update', [m]);
            }).on('updateSwitch', function (e) {
                e.stopPropagation();
                e = $(this).parents('.switch_wrapper');
                m = e.data('uiswitch');
                if (m.value == true) {
                    m.element.prop('checked', false);
                } else {
                    m.element.prop('checked', true);
                }
                m.element.triggerHandler('change.sw')
            });
            if (k.value == true) {
                m.addClass('on');
            }
        })
    }
    $.fn.objectDisInteract = function () {
        this.off('click.obj').off('keydown.obj').off('keyup.obj').off('mouseover.obj').off('mouseout.obj');
        return this;
    }
    $.fn.objectInteract = function (h, a, d) {
        h = 'all';
        if (this.data('object-ref') == 'texts') {
            h = 'w,e';
        }
        this.find('.ui-resizable-handle').remove();
        this.droppable({
            'scope': 'object', 'accept': function (e, f, g) {
                e = e.data('object');
                f = $(this).data('object-ref');
                if (e == 'texts' || e == 'shape' || e == 'buttons' || e == 'f-asset' || e == 'sprite' || e == 'sticker') return false;
                if (f == 'images' && e == 'images') return true;
                if (f == 'images' && e.indexOf('_colors') !== -1) return false;
                if (e == 'bg_gradients' && f !== 'shape') return false;
                return true;
            }, 'greedy': true, 'hoverClass': 'dropeffect-hover', 'tolerance': 'pointer', 'over': function (e, ui) {
                if (c.draggingLib === true) {
                    c.dropeffectEl = this;
                }
            }, 'drop': function (e, u) {
                if (!c.dropeffectEl) {
                    return;
                }
                u.el = $(c.dropeffectEl);
                u.eld = u.el.find('.object:first');
                u.elsvg = u.eld.find('svg:first');
                u.id = u.el.attr('scope');
                u.s = u.id.substr(u.id.lastIndexOf('_') + 1);
                u.scope = c.slides[u.s].elements[u.id];
                u.drg = u.draggable.data('object');
                u.drgRef = u.draggable.data('object-ref');
                if (u.drg == 'bg_colors' && u.drgRef == '00000000') u.drgRef = '0000';
                u.type = u.drg + '_' + u.scope.alias;
                switch (u.type) {
                    case'fonts_buttons':
                    case'fonts_texts':
                        applyPropertyOption(u.elsvg, {'text': {'font': u.drgRef, 'type': 'normal',}})
                        break;
                    case'bg_colors_shape':
                    case'bg_gradients_shape':
                        if (!notify('obj.beforeFx', {'obj': u.scope.id, 'ref': 'background'})) return;
                        if (u.drg == 'bg_gradients' && c.bg_gradients_native[u.drgRef]) {
                            u.scope.prop.background = {'gradient': []};
                            u.e = c.bg_gradients_native[u.drgRef];
                            u.mode = 'linear';
                            u.deg = u.e.deg.replace(/[^\d.]/g, '');
                            if (u.deg == '') u.deg = 50;
                            if (u.e.mode.indexOf('r') === 0) u.mode = 'radial';
                            u.scope.prop.background.gradient.push({'stops': u.e.stops, 'deg': u.deg, 'mode': u.mode})
                        } else {
                            u.scope.prop.background = {'color': '#' + u.drgRef};
                        }
                        c.idCache[u.scope.prop.uid].fx.load({'background': u.scope.prop.background});
                        c.idCache[u.scope.prop.uid].fx.applyAll('background');
                        notify('obj.afterFx', {'obj': u.scope.id, 'ref': 'background'});
                        break;
                    case'images_images':
                        if (notify('obj.beforeCreateUpdate', {'obj': u.scope.id}) !== false && c.images.items[u.drgRef]) {
                            u.im = new Image;
                            u.im.id = $.now();
                            u.im.onload = function (e) {
                                e = c.domCanvas.find('image[data-bid="' + this.id + '"]:first');
                                e.attr('href', this.src).nextAll('div.bid-o').remove();
                            }
                            u.eld.find('image:first').attr('data-bid', u.im.id).after('<div class="d-inline bid-o"><img src="assets/img/loader.gif" /></div>');
                            u.im.src = c.images.items[u.drgRef].u;
                            u.scope.prop.src = c.images.items[u.drgRef].u;
                            notify('obj.afterCreateUpdate', {'obj': u.scope.id});
                        }
                        break;
                    case'images_texts':
                        break;
                }
                delete c.dropeffectEl;
            }
        }).on('keydown.obj', function (e, a, i, o) {
            o = {};
            e.stopPropagation();
            if (e.target.nodeName == 'SPAN') return;
            if ($(this).is('.active,.ui-selected') == false) return;
            if (typeof a == 'object' && a.which > 0) {
                c.getShortcut().add(a);
                a = a.which;
                if ($(this).data('locked') === true) return;
            } else {
                c.getShortcut().add(e);
                a = e.which;
                if ($(this).data('locked') === true) return;
                o.alo = true;
                if (a == 46) {
                    if (!notify('obj.beforeDel', {'obj': $(this).attr('scope')})) return;
                    o.a = 'Del';
                } else if ([37, 39, 40, 38].indexOf(a) != -1) {
                    if (!notify('obj.beforeMove', {'obj': $(this).attr('scope')})) return;
                    o.a = 'Move';
                }
            }
            e = $(this);
            switch (a) {
                case 46:
                    c.domCanvas.trigger('delObject', [e.attr('scope')]);
                    break;
                case 37:
                    a = $(this).attr('scope');
                    d = a.substr(a.lastIndexOf('_') + 1);
                    c.slides[d].elements[a].prop.left--;
                    i = $('#wrapper_slide_viewport #viewport_stage_wrapper > div:eq(' + d + ') > .objectBox[scope=' + a + ']');
                    i.css('left', '-=1px');
                    e = i.get(0).style.left.replace('px', '');
                    e = parseFloat(e);
                    c.slides[d].elements[a].prop.left = e;
                    k = i.parent();
                    i.css('left', ((e) / k.width()) * 100 + '%');
                    break;
                case 39:
                    a = $(this).attr('scope');
                    d = a.substr(a.lastIndexOf('_') + 1);
                    i = $('#wrapper_slide_viewport #viewport_stage_wrapper > div:eq(' + d + ') > .objectBox[scope=' + a + ']');
                    i.css('left', '+=1px');
                    e = i.get(0).style.left.replace('px', '');
                    e = parseFloat(e);
                    c.slides[d].elements[a].prop.left = e;
                    k = i.parent();
                    i.css('left', ((e) / k.width()) * 100 + '%');
                    break;
                case 38:
                    a = $(this).attr('scope');
                    d = a.substr(a.lastIndexOf('_') + 1);
                    i = $('#wrapper_slide_viewport #viewport_stage_wrapper > div:eq(' + d + ') > .objectBox[scope=' + a + ']');
                    i.css('top', '-=1px');
                    e = i.get(0).style.top.replace('px', '');
                    e = parseFloat(e);
                    c.slides[d].elements[a].prop.top = e;
                    k = i.parent();
                    i.css('top', (e / k.height()) * 100 + '%');
                    break;
                case 40:
                    a = $(this).attr('scope');
                    d = a.substr(a.lastIndexOf('_') + 1);
                    i = $('#wrapper_slide_viewport #viewport_stage_wrapper > div:eq(' + d + ') > .objectBox[scope=' + a + ']');
                    i.css('top', '+=1px');
                    e = i.get(0).style.top.replace('px', '');
                    e = parseFloat(e);
                    c.slides[d].elements[a].prop.top = e;
                    k = i.parent();
                    i.css('top', (e / k.height()) * 100 + '%');
                    break;
            }
            if (o.alo === true && o.a !== undefined) {
                notify('obj.after' + o.a, {'obj': $(this).attr('scope')});
            }
        }).on('keyup.obj', function (e) {
            c.getShortcut().remove(e.which)
        }).on('mouseover.obj', function (i) {
            $(this).addClass('inspectHover');
        }).on('mouseout.obj', function () {
            $(this).removeClass('inspectHover');
        })
        if (this.is('div[data-object-shape-glyph]')) {
            this.on('dblclick.obj', 'svg g:first', function (ev, e, p, ns) {
                e = $(this);
                p = e.parents('.objectBox');
                if (p.hasClass('active') == false) {
                    c.editingActive = false;
                    return;
                }
                if (!e.hasClass('editing')) {
                    c.editingActive = false;
                    e.addClass('editing');
                } else {
                    return;
                }
                if (!notify('workspace.beforeActiveTyping')) return;
                smartTextTools(p.attr('scope'));
                return;
            })
        }
        a = $(this).data('object-ref');
        if (a == 'shape') {
            this.find('.viewbox-edit:first').off('click').on('click', function (e) {
                e.stopPropagation();
                e = $(this).parent('.objectBox').attr('scope');
                if (!e) return;
                smartTextTools(e, $.noop)
            });
        }
        return this;
    }
    $.fn.rotate = function (d, e, m) {
        function activateRotate(el, e) {
            this.el = el;
            if (typeof e == 'object') {
                this.config = e;
            } else this.config = {};
            this.enable = function (d) {
                d = this.getDegree();
                this.el.rotatable({
                    'degrees': d,
                    'handle': this.el.find('.ui-rotate-handle:first > span'),
                    'wheelRotate': false,
                    'cancel': '.preventdefault',
                    'stop': function (e, ui, u, i) {
                        i = (ui.angle.stop / Math.PI * 180);
                        this.style.transform = 'rotate(' + i + 'deg)';
                        u = $(this).data('uiRotate');
                        if (typeof u.config.stop == 'function') {
                            u.config.stop(this, ui)
                        }
                    },
                    'start': function (e) {
                        u = $(this).data('uiRotate');
                        if (typeof u.config.start == 'function') {
                            u.config.start(this)
                        }
                        this.style.transformOrigin = 'center'
                    },
                    'rotate': function (e, i) {
                        u = $(this).data('uiRotate');
                        if (typeof u.config.rotate == 'function') {
                            u.config.rotate(i)
                        }
                    }
                });
                if (d > 0) {
                    this.el.css('transform', 'rotate(' + d + 'deg)');
                }
            }
            this.disable = function () {
                this.el.find('.ui-rotate-handle:first').hide(0);
                this.el.rotatable('disable');
            }
            this.getDegree = function (i, d) {
                i = 0;
                d = this.el.get(0).style.transform.match(/rotate+\((.*)\)/i);
                if (d) {
                    d = d[1].replace(/[^\d\.-]/g, '');
                    i = parseFloat(d);
                }
                ;
                return i;
            }
            this.update = function (i) {
                e = this.el.data('uiRotatable');
                if (typeof i !== 'number') {
                    i = this.getDegree();
                }
                e.elementStopAngle = i / 180 * Math.PI;
                e.elementCurrentAngle = e.elementStopAngle;
                $(this).data('uiRotatable', e)
            }
            this.init = function () {
                if (this.el.children('[id=ui_rotate_handle]').length == 0) {
                    this.el.append('<div id="ui_rotate_handle" class="ui-rotate-handle"><span></span></div>');
                }
                return this;
            }
            return this.init();
        }

        m = new activateRotate(this, d);
        m.enable();
        this.data('uiRotate', m);
        this.addClass('ui-rotate');
        return this;
    }
    $.fn.upload = function (url, uploader, uploader_btn) {
        if (typeof url == 'object') {
            this.data('urlObjectMod', url)
        } else {
            this.data('urlObjectMod', {'mod': 'imageObject'})
        }
        this.on('click', function () {
            uploader_btn = this;
            if (!notify('upl.beforeLaunch')) return
            mdDialog(function () {
                uploader = this;
                c.uploader = this;
                this.availMods = {
                    'svgObject': {
                        'lib': 'svgshapes',
                        'title': 'My Vector Graphics',
                        'filter': {'mime_types': [{'extensions': 'svg'}]},
                        'url': '/editor/upload.php'
                    },
                    'imageObject': {
                        'lib': 'img',
                        'title': 'My Images',
                        'filter': {'mime_types': 'image/png,image/jpg,image/jpeg'},
                        'url': '/editor/upload.php'
                    },
                    'youtubeObject': {'lib': 'tube', 'title': 'My Linked Videos'},
                    'cxiObject': {
                        'lib': 'cxi',
                        'title': '',
                        'filter': {'mime_types': [{'extensions': 'cxi', 'title': 'Package file'}]},
                        'url': '/compile/unpack.php'
                    }
                }
                this.module = $(uploader_btn).data('urlObjectMod');
                this.size = 'large';
                this.currentMode = this.availMods[this.module.mod];
                this.title = this.currentMode.title;
                this.requests = {};
                this.footer = false;
                this.fetchLib = function (e) {
                    i = $.now() + '_rq';
                    this.stage.html('<figure class="center"><img src="assets/img/loader.gif" /></figure>');
                    e = $.ajax({
                        'type': 'GET',
                        'url': location.origin + '/editor/getphoto.php?type=my' + this.currentMode.lib,
                        'dataType': 'json',
                        'rid': i,
                    }).done(function (r, e) {
                        c['my' + uploader.currentMode.lib] = r.reverse();
                        c[uploader.currentMode.lib + 'Loaded'] = true;
                        uploader.stage.find('figure').remove();
                        e = c['my' + uploader.currentMode.lib];
                        uploader.addToStage(e);
                        uploader.bindStage();
                    }).always(function () {
                        delete uploader.requests[this.rid];
                        uploader.stage.find('figure').remove();
                    });
                    this.requests[i] = e;
                }
                this.addToStage = function (index, e, i, m) {
                    if (!this.stage.hasClass('masi')) {
                        this.stage.masonry({
                            'items': '.item',
                            'columnWidth': 150,
                            'transitionDuration': 0
                        }).addClass('masi');
                    }
                    if (typeof index == 'object') {
                        $.each(index, function (i) {
                            uploader.addToStage(i);
                        })
                        return;
                    }
                    e = c['my' + this.currentMode.lib][index];
                    if (typeof e !== 'object') return;
                    e.id = index;
                    m = new Image;
                    m.rel = e.l;
                    m.onload = function () {
                        m.el.attr('src', this.src);
                        uploader.stage.masonry('appended', m.el.parent());
                    }
                    m.onerror = function () {
                        uploader.stage.masonry('remove', m.el.parent())
                    }
                    if (uploader.currentMode.lib == 'img') {
                        e = '<img width="150" />';
                    } else if (uploader.currentMode.lib == 'svgshapes') {
                        e = '<img height="150" width="150"  />';
                    }
                    i = uploader.stage.append('<div class="item"><div class="toolbar"><a><span class="fa fa-trash"></span></a></div>' + e + '</div>').children(':last');
                    m.el = i.find('img:first');
                    m.src = m.rel;
                    i.data('meta', c['my' + this.currentMode.lib][index]);
                    return i;
                }
                this.bindStage = function () {
                    this.stage.on('click', '.item .toolbar a', function (e, ref) {
                        e.stopPropagation();
                        e.preventDefault();
                        e = $(this).parents('.item');
                        ref = e.data('meta');
                        c.editorSDK.gui.confirm(c.language('editor_ui_msg_confirm'), function () {
                            $.ajax({
                                'url': location.origin + '/editor/libpurge.php',
                                'data': {'q': ref.uid},
                                'type': 'POST',
                                'uid': ref.uid,
                                'el': e,
                                'beforeSend': function () {
                                    this.el.hide(0);
                                }
                            }).done(function (i) {
                                for (i = 0; c['my' + uploader.currentMode.lib].length > i; i++) {
                                    if (c['my' + uploader.currentMode.lib][i].uid == this.uid) {
                                        c['my' + uploader.currentMode.lib].splice(i, 1)
                                        uploader.stage.masonry('remove', this.el).masonry('layout')
                                        break;
                                    }
                                }
                            })
                        })
                    })
                    this.stage.on('click', '.item', function (e, i) {
                        e = $(this).data('meta');
                        i = $(this).find('img:first');
                        e.lw = i.width();
                        e.lh = i.height();
                        $(uploader_btn).trigger('up.done', [e]);
                        uploader.close();
                    })
                }
                this.onshow = function () {
                    this.md = $(this.target + ' .modal-dialog').addClass('big bg-current');
                    this.header = this.md.find('.modal-header').addClass('justify-content-start');
                    this.header.find('h4').addClass('text-current');
                    if (this.currentMode.lib == 'img' || this.currentMode.lib == 'svgshapes' || this.module.mod == 'cxiObject') {
                        this.header.append('<div class="btn-group center"><button class="btn-sm btn-primary">Upload</button></div>');
                    }
                    this.header.append('<div class="clearfix close" data-close><span class="fa fa-close float-right"></span></div>').find('.close').click(function () {
                        uploader.close();
                    })
                    if (this.currentMode.lib == 'img') {
                        $(this.target + ' .modal-header .btn-group').append('<button class="btn-sm btn-link text-muted" style="position: relative; z-index: 1;"><span class="fa fa-camera fa-2x"></span></button>');
                    }
                    this.stage = $(this.target + ' .modal-body').html('<div class="row fancyscroll"></div>').find('.row');
                    this.stage.css('min-height', 400)
                    $(this.target).css('zIndex', 10200);
                    if (this.currentMode.lib !== false && c['my' + this.currentMode.lib] !== undefined && c[this.currentMode.lib + 'Loaded'] === true) {
                        $.each(c['my' + this.currentMode.lib], function (i, e) {
                            uploader.addToStage(i);
                        });
                        this.bindStage();
                    } else if (this.currentMode.lib == 'img' || this.currentMode.lib == 'svgshapes' && c[this.currentMode.lib + 'Loaded'] !== true) {
                        this.fetchLib();
                    }
                    this.btn = $(this.target + ' .modal-header  button:first');
                    if (c.policySetup.ENABLE_UPLOADS != 1) {
                        this.btn.attr('disabled', true).attr('title', 'Sorry. Upload is currently disabled');
                    }
                    this.btnSnap = this.btn.next('button');
                    if (this.module.mod == 'cxiObject') {
                        this.stage.addClass('p-4').css('border', 'dashed 5px  #8a8a8a').html('<div class="center" style="margin-bottom: auto;margin-top: auto;"><h2 class="mb-5">Load .cxi package</h2><button class=" btn btn-lg btn-primary">Browse package file <span class="fa fa-cloud-uplo"></span></button></div>');
                        this.stage.find('div > button').on('click', function () {
                            uploader.btn.trigger('click');
                        })
                        this.btn.addClass('d-none');
                    }
                    this.camera = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
                    if (!this.camera) {
                        this.btnSnap.remove();
                    } else {
                        this.camera = $.proxy(this.camera, navigator);
                        this.btnSnap.click(function () {
                            uploader.openWindow('videoCam', function () {
                                this.content = '<div class="center" style="width:100%;height:100%"><video style="object-fit:fill;transform:scaleX(-1)"  height="100%" autoplay></video><span class="fa fa-4x text-white fa-spin fa-spinner" style="position:absolute;left:50%;top:50%"></span></div>';
                                this.footer = '<button id="takephoto" class="btn btn-primary btn-sm"><span class="fa fa-chrome fa-3x"></span></button>';
                                this.size = 'large';
                                this.takephoto = function (cvs, ctx) {
                                    if (!this.videoCard) return;
                                    $(this.target + ' .modal-footer').find('[id=takephoto],[id=acceptphoto]').addClass('waiting')
                                    $(this.target + ' .modal-body').append('<canvas width="' + this.videoCard.width + '" height="' + this.videoCard.height + '" class="d-none"></canvas>')
                                    cvs = $(this.target + ' .modal-body canvas').get(0);
                                    ctx = cvs.getContext('2d');
                                    ctx.translate(this.videoCard.width, 0);
                                    ctx.scale(-1, 1)
                                    ctx.drawImage(this.videoCard.pixel, 0, 0, this.videoCard.width, this.videoCard.height);
                                    cvs.toBlob(function (b, i) {
                                        uploader.videoCam.photoroll = b;
                                        img = new Image;
                                        if ($(uploader.videoCam.target + ' .modal-body .photoroll').length == 0) {
                                            $(uploader.videoCam.target + ' .modal-body video').after('<div class="photoroll"></div>');
                                        }
                                        img.onload = function () {
                                            $(uploader.videoCam.target + ' .modal-footer').find('[id=acceptphoto]').removeClass('waiting');
                                            $(uploader.videoCam.target + ' .modal-body .photoroll').prepend(this);
                                        }
                                        img.src = cvs.toDataURL('image/jpeg', 1);
                                    }, 'image/jpeg')
                                    this.photoroll = undefined;
                                }
                                this.uploadphoto = function () {
                                    if (!this.photoroll) return;
                                    uploader.up.addFile(this.photoroll, $.now() + '.jpg');
                                    this.close();
                                }
                                this.prepareTake = function () {
                                    $(this.target + ' .modal-body').find('canvas,div.photoroll').remove();
                                    $(this.target + ' .modal-footer button').removeClass('waiting')
                                }
                                this.onshow = function (e) {
                                    uploader.videoCam = this;
                                    $(this.target).css('zIndex', 10300);
                                    $(this.target + ' .modal-footer').append('<button id="acceptphoto" class="btn btn-outline-success btn-sm"><span class="fa fa-check fa-3x"></span></button>').find('button[data-close]').addClass('btn btn-sm btn-outline-secondary').html('<span class="fa fa-times fa-3x text-danger"></span>');
                                    $(this.target + ' .modal-body').addClass('p-0 h-75').parents('.modal-dialog').addClass('camera-app').css({
                                        'max-width': c.domWindow.width(),
                                        'height': c.domWindow.height()
                                    }).addClass('m-0').find('.modal-content').addClass('h-100');
                                    $(this.target + ' .modal-footer button').each(function (i) {
                                        i = $(this);
                                        if (i.is('[id=takephoto],[id=acceptphoto]')) {
                                            i.attr('disabled', true).on('click', function (i, e) {
                                                e = $(this);
                                                if (e.is(':disabled')) return;
                                                i = e.attr('id');
                                                if (i == 'takephoto' && e.hasClass('waiting')) {
                                                    uploader.videoCam.prepareTake();
                                                    return;
                                                }
                                                if (i == 'takephoto') {
                                                    uploader.videoCam.takephoto();
                                                } else if (i == 'acceptphoto' && !e.hasClass('waiting')) {
                                                    uploader.videoCam.uploadphoto();
                                                }
                                            })
                                        }
                                    })
                                    window.setTimeout(function () {
                                        $(uploader.videoCam.target + ' .modal-body video+span.fa').animate({'opacity': 0}, 500, function () {
                                            $(this).remove();
                                        })
                                        uploader.camera({'video': true, 'audio': false}, function (stream) {
                                            uploader.videoCam.cameraStream = stream;
                                            uploader.videoCam.videoCard = {'pixel': $(uploader.videoCam.target + ' .modal-body video').get(0)}
                                            try {
                                                uploader.videoCam.videoCard.pixel.src = window.URL.createObjectURL(stream);
                                            } catch (e) {
                                                uploader.videoCam.videoCard.pixel.srcObject = stream;
                                            }
                                            window.setTimeout(function () {
                                                uploader.videoCam.videoCard.width = uploader.videoCam.videoCard.pixel.clientWidth;
                                                uploader.videoCam.videoCard.height = uploader.videoCam.videoCard.pixel.clientHeight;
                                                $(uploader.videoCam.target + ' .modal-footer').find('[id=takephoto],[id=acceptphoto]').removeAttr('disabled')
                                            }, 2000)
                                        }, function (err, e) {
                                            e = alertMessage('error', 'Could not start camera');
                                            $(e.target).hide(500, function () {
                                                $(this).show().css('zIndex', (10400))
                                            })
                                        })
                                    }, 1000)
                                }
                                this.onhide = function () {
                                    if (this.cameraStream) {
                                        this.cameraStream.getTracks().forEach(function (t) {
                                            t.stop();
                                        })
                                    }
                                    this.destroy();
                                }
                                return this;
                            })
                        })
                    }
                    this.upload = function () {
                        if (this.currentMode.lib !== false) {
                            this.openWindow('progress', function () {
                                this.title = false;
                                this.footer = true;
                                this.content = '<div class="progress"><div class="progress-bar-animated progress-bar-striped progress-bar" style="width:100%"></div></div>';
                                this.size = 'small';
                                this.onshow = function () {
                                    $(this.target).position({
                                        'my': 'top',
                                        'at': 'center',
                                        'of': $(uploader.target + ' .modal-body')
                                    });
                                }
                                this.onhide = function () {
                                    uploader.up.stop();
                                }
                                return this;
                            })
                            this.up.start();
                        }
                    }
                    this.up = new plupload.Uploader({
                        runtimes: 'html5,flash,html4',
                        flash_swf_url: 'assets/js/plupload/moxie.swf',
                        silverlight_xap_url: 'assets/js/plupload/moxie.xap',
                        'url': location.origin + uploader.currentMode.url,
                        browse_button: this.btn.get(0),
                        drop_element: this.stage.get(0),
                        'headers': {'X-Requested-With': 'XMLHttpRequest'},
                        'multi_selection': false,
                        'el': this,
                        filters: $.extend(this.currentMode.filter, true, {
                            'max_file_count': 1,
                            'max_file_size': '5mb',
                        }),
                        'init': {
                            'Error': function (u, e, t) {
                                uploader.clearLoader();
                                t = c.language('editor_ui_msg_failedupl')
                                toastr['error'](t + '.Error:' + e.message);
                            }, 'Browse': function () {
                                if (c.policySetup.ENABLE_UPLOADS != 1) {
                                    toastr.error('Upload is currently disabled');
                                    return false;
                                }
                            }, 'FilesAdded': function (u, f, r) {
                                if (c.policySetup.ENABLE_UPLOADS != 1) {
                                    toastr.error('Upload is currently disabled');
                                    return false;
                                }
                                file = f[0];
                                if (uploader.trustedFile) {
                                    uploader.up.files[0].source = uploader.trustedFile;
                                }
                                delete uploader.trustedFile;
                                if (!notify('upl.beforeFileAdded', {'file': file})) return;
                                $(uploader_btn).trigger('up.fileadded', [file]);
                                uploader.upload();
                                notify('upl.afterFileAdded', {'file': file});
                                return u;
                            }, 'FileUploaded': function (u, f, r, e) {
                                uploader.clearLoader();
                                e = JSON.parse(r.response);
                                if (r.status != 200 && r.error) {
                                    toastr['error'](r.error.message);
                                    return;
                                } else if (r.status != 200) {
                                    t = c.language('editor_ui_msg_failedupl');
                                    toastr['error'](f);
                                    return;
                                }
                                r = e;
                                if (typeof r !== 'object' || r == null) return;
                                if (uploader.currentMode.lib === 'svgshapes') {
                                    r.u = file.source;
                                }
                                if (!r.dub && uploader.currentMode.lib == 'img' || uploader.currentMode.lib == 'svgshapes') {
                                    c['my' + uploader.currentMode.lib].push(r);
                                    e = uploader.addToStage(c['my' + uploader.currentMode.lib].length - 1);
                                    e.prependTo(e.parent());
                                    $(uploader.target + ' .modal-body .row').masonry('prepended', e);
                                }
                                notify('upl.afterUpload', {'data': r});
                                u.removeFile(f);
                                if (uploader.currentMode.lib == 'cxi') {
                                    uploader.openWindow('confirmPackInstall', function () {
                                        this.data = r;
                                        this.title = 'Run package - ' + this.data.title || 'unnamed -';
                                        this.title += ' - ' + this.data.tpl.width + 'x' + this.data.tpl.height;
                                        this.onhide = function () {
                                            this.destroy();
                                        }
                                        this.footer = '<button class="btn btn-primary d-block w-100">Continue</button>';
                                        this.content = '<div class="row"></div>';
                                        this.onshow = function (e, i, g) {
                                            e = $(this.target + ' .modal-body .row');
                                            i = '<div class="col-5"><span class="os-icon os-icon-arrow-right2"></span> <span class="fa-lg">{name}</span></div><div class="col-5 offset-2"> <span class="fa-lg">{val}</span></div>';
                                            e.append(i.replace('{name}', 'Publisher').replace('{val}', this.data.publisher.name));
                                            e.append(i.replace('{name}', 'Packed').replace('{val}', date('Y m d H:i', this.data.packed)));
                                            e.append(i.replace('{name}', 'Creator').replace('{val}', this.data.creator.name));
                                            e.append(i.replace('{name}', 'Created').replace('{val}', date('Y m d H:i', this.data.created)));
                                            e.append(i.replace('{name}', 'Package Source').replace('{val}', '<a href="http://' + this.data.source + '" target="blank">' + this.data.source + '</a>'));
                                            e.parent().next('.modal-footer').find('button:last').addClass('d-block w-100').removeClass('btn-sm').prev().on('click', function (e) {
                                                if (!notify('workspace.beforeLoadTpl', {
                                                    'cat': uploader.win.confirmPackInstall.data.source,
                                                    'id': false
                                                })) return;
                                                uploader.win.confirmPackInstall.data.size = [uploader.win.confirmPackInstall.data.tpl.width, uploader.win.confirmPackInstall.data.tpl.height];
                                                addSlides(uploader.win.confirmPackInstall.data);
                                                c.domCanvas.trigger('connectScreen', [0, c.sessionKey])
                                                delete c.ID;
                                                uploader.close();
                                                notify('workspace.afterLoadTpl');
                                            })
                                            e.children('div:even').addClass('mt-1')
                                        }
                                        return this;
                                    })
                                }
                            }
                        }
                    })
                    this.up.init();
                    $(this.btn).data('uploadObject', this.up);
                    notify('upl.afterLaunch');
                }
                this.clearLoader = function () {
                    if (!uploader.win.progress) return;
                    $(uploader.win.progress.target).fadeOut(500, function () {
                        uploader.win.progress.destroy();
                    })
                }
                this.onhide = function () {
                    $.each(Object.values(this.requests), function () {
                        this.abort();
                    })
                    $.each(Object.values(this.win), function () {
                        this.close();
                    })
                    delete c.uploader;
                    this.destroy();
                }
                return this;
            })
        })
        return this;
    }

    function safe_text(input, allowed, tags, commentsAndPhpTags) {
        allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
        tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
        return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
            return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
        });
    }

    c.Supported = function (type, e, f) {
        e = {
            'texts': ['color', 'size', 'align', 'font', 'type'],
            'images': ['brightness', 'blur', 'tear', 'mask', 'overlay', 'glow', 'noise'],
            'sticker': ['brightness', 'blur', 'tear', 'overlay', 'glow', 'noise'],
            'sprite': ['brightness', 'blur', 'tear', 'overlay', 'glow', 'noise'],
            'buttons': ['background', 'color', 'size', 'align', 'font', 'type', 'blur'],
            'shape': ['background', 'border']
        };
        f = e[type];
        if (['buttons', 'images'].indexOf(type) !== -1) {
            f = $.merge(f, ['border', 'shadow', 'opacity']);
        } else {
            f = $.merge(f, ['shadow', 'opacity', 'blur', 'tear', 'glow']);
        }
        return f;
    }

    function ShapeTexture(shape, texture, a, i1, i2, t) {
        a = $(shape);
        a.after(c.drawingShapes[texture.sym]);
        t = a.next().get(0);
        a.remove();
        t.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'defs'));
        i1 = t.querySelector('defs:first-of-type');
        i2 = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
        i2.setAttribute('id', 'bgs_texture');
        i2.setAttribute('patternUnits', 'objectBoundingBox');
        i2.setAttribute('x', '0');
        i2.setAttribute('y', '0');
        i2.setAttribute('width', '100%');
        i2.setAttribute('height', '100%');
        b = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        b.setAttribute('href', texture.image);
        b.setAttribute('width', '100%');
        b.setAttribute('height', '100%');
        b.setAttribute('x', '0');
        b.setAttribute('y', '0');
        b.setAttribute('preserveAspectRatio', 'none');
        i2.appendChild(b);
        i1.appendChild(i2);
        t.appendChild(i1);
        b = t.querySelector('rect,circle');
        b.setAttribute('fill', 'url(#bgs_texture)');
    }

    function ShapeGradient(shape, grad, i1, i2, a, id) {
        a = $(shape).get(0);
        i1 = a.querySelector('defs:first-of-type');
        if (!i1) {
            i1 = a.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'defs'));
        }
        i2 = i1.querySelector('linearGradient');
        if (!i2) {
            id = $.now().toString().replace(/[^a-z0-9_]/ig, '');
            i2 = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            i2.setAttribute('id', 'gradient_' + id);
            i2.setAttribute('y1', '0');
            i2.setAttribute('y2', '100%');
            i2.setAttribute('x1', '50%');
            i2.setAttribute('x2', '50%');
            b = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            d = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            i2.appendChild(b);
            i2.appendChild(d);
            i1.appendChild(i2);
            a.appendChild(i1);
        } else {
            b = i2.firstChild;
            d = i2.lastChild;
            id = i2.getAttribute('id').substr(9);
        }
        b.setAttribute('offset', grad.x);
        b.setAttribute('style', 'stop-color:' + grad.start);
        d.setAttribute('offset', grad.y);
        d.setAttribute('style', 'stop-color:' + grad.stop);
        a.setAttribute('fill', 'url(#gradient_' + id + ')');
    }

    function shapeShadow(shape, shadow, o) {
        o = {};
        o.obj = $(shape).get(0);
        o.def = o.obj.querySelector('defs:first-of-type');
        if (!o.def) {
            o.def = o.obj.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'defs'));
        }
        o.fil = o.def.querySelector('filter');
        if (!o.fil) {
        }
    }

    c.applyPattern = function (ele, pat, i, cmd, e) {
        e = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%" height="100%">';
        for (i = 0; pat.points.length > i; i++) {
            cmd = $.map(pat.points[i][1], function (e) {
                return e.join(',')
            })
            cmd = cmd.join('L');
            e += '<path stroke-width="' + pat.opts.stroke_width + '" stroke="' + pat.points[i][0] + '" fill="' + pat.points[i][0] + '" d="M' + cmd + 'Z" />';
        }
        e += '</svg>';
        e = 'data:image/svg+xml;base64,' + btoa(e);
        ele.css({'background': 'url(' + e + ')',});
    }
    c.randomPatternPalette = function (a, e, i, pattern, cf, svg) {
        a.empty();
        c.libs.bg_patterns = [];
        for (i = 0; 52 > i; i++) {
            e = $('<div data-object="bg_pattern" data-object-ref="' + i + '" class="card bg-none col-4  loading  nodrag" style="margin-bottom:0;margin-top:5px;"></div>');
            a.append(e);
            cf = {
                height: 100,
                width: 100,
                cell_size: 5 + Math.random() * 100,
                stroke_width: 0.5 * Math.random(),
                variance: 0.50,
                seed: Math.random() + 'os2',
                x_colors: 'random',
            }
            pattern = Trianglify(cf)
            e.append(pattern.svg());
            svg = e.find('svg:first').get(0)
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            svg.setAttribute('viewBox', '0 0 100 100');
            svg.setAttribute('preserveAspectRatio', 'none');
            e.removeClass('loading').addClass('loaded');
            c.libs.bg_patterns.push({
                'opts': {
                    'colors': pattern.opts.x_colors,
                    'seed': pattern.opts.seed,
                    'cell_size': pattern.opts.cell_size,
                    'stroke_width': pattern.opts.stroke_width,
                    'variance': pattern.opts.variance
                }, 'points': pattern.polys
            })
        }
    }

    function applyPickerColor(scope, b) {
        if (!c.colorPick_recent) {
            c.colorPick_recent = [];
        }
        c.colorPick_recent.unshift('<span class="color-pallete" data-color="' + b + '" style="background:' + b + ';cursor:pointer"></span>');
        if (c.colorPick_recent.length > 6) {
            c.colorPick_recent = c.colorPick_recent.slice(0, 6);
        }
        scope.inspectorContentDom.find('[id=recentPick] > span:last').html(c.colorPick_recent.join(''));
    }

    function workspaceJob(task, ele, o, e) {
        if (typeof ele == 'string') ele = [ele];
        o = {};
        switch (task) {
            case'trim':
                dom = {'b': {}, 'a': {}};
                dom.selc = [];
                f = [];
                c.domCanvas.find('.objectBox[scope]').not('.invisible').each(function (i, e) {
                    e = $(this);
                    i = e.attr('scope');
                    if (!c.slides[0].elements[i]) {
                        return;
                    }
                    dom.selc.push(i);
                    f.push(e);
                    return e;
                });
                if (f.length == 0) return false;
                f.sort(function (a, b) {
                    a = a[0].offsetTop;
                    b = b[0].offsetTop;
                    return a > b ? 0 : -1 | (b > a ? 0 : 1);
                });
                e = $.map(f, function (e) {
                    return e;
                }).sort(function (a, b) {
                    a = a[0].offsetLeft;
                    b = b[0].offsetLeft;
                    return a > b ? 0 : -1 | (b > a ? 0 : 1);
                });
                dom.b.top = f[0].position().top;
                dom.b.left = e[0].position().left;
                applyPropertyOption(f[0], {'xy': 'y0'});
                applyPropertyOption(e[0], {'xy': 'x0'});
                dom.a.top = f[0].position().top;
                dom.a.left = e[0].position().left;
                dom.tab1 = dom.b.top - dom.a.top;
                dom.tab2 = dom.b.left - dom.a.left;
                f[0].get(0).style.top = dom.b.top + 'px'
                e[0].get(0).style.left = dom.b.left + 'px'
                notify('obj.beforeMove', {'obj': dom.selc});
                $.each(f, function (id, ele, o) {
                    id = ele.attr('scope');
                    o = real_offset(ele);
                    o.top = (o.top - dom.tab1)
                    o.left = (o.left - dom.tab2);
                    ele.css({'top': o.top, 'left': o.left, 'height': o.height, 'width': o.width})
                    c.slides[0].elements[id].prop.left = o.left;
                    c.slides[0].elements[id].prop.top = o.top;
                })
                c.transformHandler.reposition();
                notify('obj.afterMove', {'obj': dom.selc});
                if (!notify('screen.beforeResize', {'w': c.width, 'h': c.height})) return;
                e = real_boundary(f);
                c.width = e.width;
                c.height = e.height;
                c.domCanvas.css({'width': c.width, 'height': c.height});
                c.domSize[0].value = c.width;
                c.domSize[1].value = c.height;
                $.each(f, function (i, ele) {
                    o = real_offset(ele);
                    ele.css({
                        'top': o.topab + '%',
                        'left': o.leftab + '%',
                        'height': o.heightab + '%',
                        'width': o.widthab + '%'
                    })
                })
                c.domZoomActual.trigger('click');
                notify('screen.afterResize');
                break;
            case'copy':
                c.clipboard = ele;
                notify('workspace.afterClipboardEvent');
                break;
            case'paste':
                if (typeof c.clipboard !== 'object') return;
                if (c.clipboard.length < 1) {
                    delete c.clipboard;
                    return;
                }
                a = c.domCanvas;
                k = a.children('div:visible:first').find('.objectBox[scope]').length;
                if (!notify('obj.beforeCreate', c.clipboard)) return;
                $.each(c.clipboard, function (i, id) {
                    a.trigger('cloneObject', [id]);
                })
                a.trigger('disconnectScope', ['.active']);
                delete c.clipboard;
                if (c.domCanvas.children(':visible:first').find('[scope]').length > k) {
                    notify('obj.afterCreate');
                }
                break;
            case'clone':
                o.v = c.domCanvas.children('div:visible:first');
                $.each(ele, function (i, id) {
                    c.domCanvas.trigger('cloneObject', [id]);
                    o.o = o.v.children(':last');
                    c.currentSelection[o.o.attr('scope')] = o.o.get(0);
                })
                break;
            case'order_front':
            case'order_back':
            case'order_forward':
            case'order_backward':
                e = o;
                e.ch = c.domCanvas.children('div:visible:first').index();
                e.fg = c.domSlidesWrapper.find('.view_slide_item:eq(' + e.ch + ') .card-block > .row .card[scope]');
                e.i = task.split('_')[1];
                $.each(ele, function (k, t) {
                    e.dom = e.fg.filter('[scope=' + t + ']');
                    applyPropertyOption(e.dom, {'order': e.i});
                    e.dom.css('zIndex', '')
                })
                d = c.domCanvas.children(':eq(' + e.ch + ')').find('.objectBox[scope]');
                e.f = Object.keys(c.slides[e.ch].elements).length;
                e.fg = $(e.fg[0]).parent().children('[scope]');
                for (i = 0; e.fg.length > i; i++) {
                    e.dom = $(e.fg[i]).attr('scope');
                    d.filter('[scope=' + e.dom + ']').css('z-index', e.f - i);
                    c.slides[e.ch].elements[e.dom].prop.z = (e.f - i);
                }
                e.p = $(e.fg[0]).parent();
                e.p.children('[locked]').appendTo(e.p)
                break;
            case'performSelection':
                o.s = ele[0];
                if (c.currentSelection[o.s] !== undefined && (s = $(c.currentSelection[o.s])) && s.is('.grouped[group_id]')) {
                    s.siblings('.objectBox.grouped[scope][group_id=' + s.attr('group_id') + ']').each(function (e) {
                        e = $(this).attr('scope');
                        c.currentSelection[e] = $(this);
                        c.currentSelection[e].css('outline', 'blue 2px solid').attr('tabIndex', 0).addClass('ui-selected');
                    })
                    if (c.currentSelection && (m = Object.keys(c.currentSelection)) && m.length > 0) {
                        c.domStageViewport.attr('tabIndex', 0).focus();
                    }
                }
                break;
            case'matchSize':
                o.key = Object.keys(ele);
                o.key = o.key[0];
                o.k = o.key.substr(0, 1);
                o.lkey = o.k.toUpperCase() + o.key.substr(1);
                o.f = Object.values(c.currentSelection);
                o.f.sort(function (a, b) {
                    a = a[0]['offset' + o.lkey]
                    b = b[0]['offset' + o.lkey];
                    return a < b ? 0 : -1 | (b < a ? 0 : 1);
                });
                if (ele[o.key]) {
                    o.dom = real_offset(ele[o.key]);
                } else {
                    o.dom = real_offset(o.f[0]);
                }
                $.each(o.f, function (i, e) {
                    i = e.attr('scope');
                    if (c.slides[0].elements[i].locked == true) return;
                    c.slides[0].elements[i].prop[o.k] = o.dom[o.key];
                    e.css(o.key, o.dom[o.key + 'ab'] + '%')
                })
                break;
        }
    }

    function applyPropertyOption(a1, a2, i1, i2, i3, i, type, ref) {
        if (typeof a1 == 'string') {
            a1 = $(a1);
        } else if (a1.isObjectScope === true) {
            a1 = a1.dom;
        }
        a1 = $(a1);
        if (a1.length == 0) return;
        i1 = Object.keys(a2);
        for (i = 0; i1.length > i; i++) {
            switch (i1[i]) {
                case'background':
                    if ([undefined, null].indexOf(a2.background) !== -1) {
                        a1.css({'background': '', 'fill': ''});
                        a1.removeAttr('fill');
                        continue;
                    }
                    if (a1.is('svg')) {
                        continue;
                    }
                    if (a2.background.color !== undefined) {
                        if (c.libs.bg_colors[a2.background.color] !== undefined) {
                            a1.css('background', '#' + a2.background.color);
                        } else {
                            a1.css('background', a2.background.color);
                        }
                    } else if (a2.background.gradient !== undefined) {
                        if (typeof a2.background.gradient === 'object') {
                            type = Object.values(a2.background.gradient);
                            ref = [];
                            for (ii = 0; type.length > ii; ii++) {
                                ref.push('linear-gradient(' + type[ii].deg + 'deg,' + type[ii].start + ' ' + type[ii].y + ',' + type[ii].stop + ' ' + type[ii].x + ')');
                            }
                            i3 = {'background': ref.join(',')};
                        } else {
                            i3 = {'background': c.bg_gradients_string[a2.background.gradient]};
                        }
                    } else if (a2.background.texture !== undefined && c.libs.bg_textures[a2.background.texture.ref] !== undefined) {
                        if (a2.background.texture.zoom == 100) {
                            e = 'cover';
                        } else {
                            e = a2.background.texture.zoom + '%';
                        }
                        i3 = {
                            'background-image': 'url(' + c.bg_textures_string[a2.background.texture.ref] + ')',
                            'background-size': e
                        };
                    } else if (typeof a2.background.image.ref == 'string') {
                        if (c.bg_images && c.bg_images.items[a2.background.image.ref] !== undefined) {
                            ref = c.bg_images.items[a2.background.image.ref].u;
                        } else {
                            ref = a2.background.image.ref;
                        }
                        if (a2.background.image.zoom == 100) {
                            e = 'cover';
                        } else {
                            e = a2.background.image.zoom + '%';
                        }
                        i3 = {'background-image': 'url(' + ref + ')', 'background-size': e};
                    }
                    if (a2.background.color) {
                        continue;
                    }
                    if (a2.background.y) {
                        i3['background-position-y'] = a2.background.y + '%';
                    }
                    if (a2.background.x) {
                        i3['background-position-x'] = a2.background.x + '%';
                    }
                    if (a2.background.zoom === 'auto' || a2.background.zoom == 100) {
                        i3['background-size'] = 'cover';
                    } else if (a2.background.zoom) {
                        i3['background-size'] = a2.background.zoom + '%';
                    }
                    a1.css(i3);
                    break;
                case'text':
                    i3 = {};
                    if (a2.text.font && c.libs.fonts[a2.text.font]) {
                        i3.fontFamily = c.libs.fonts[a2.text.font][a2.text.type];
                    }
                    if (a2.text.size) {
                        i3.fontSize = a2.text.size + 'px';
                    }
                    if (a2.text.color) {
                        i3.color = a2.text.color;
                    }
                    if (typeof a2.text.content == 'string') {
                        a1.text(a2.text.content);
                    } else if (typeof a2.text.content == 'object') {
                        a1.text(a2.text.content.join('<br>'));
                    }
                    if (a2.text.align) {
                        i3.textAlign = a2.text.align;
                    }
                    a1.css(i3);
                    break;
                case'linestroke':
                    if ([undefined, null].indexOf(a2.linestroke) !== -1) {
                        a1.css({'stroke': '#000', 'stroke-width': 2});
                        continue;
                    }
                    a1.css({'stroke': a2.linestroke.color, 'stroke-width': a2.linestroke.size})
                    break;
                case'border':
                    if ([undefined, null].indexOf(a2.border) !== -1) {
                        a1.css({
                            'borderColor': '',
                            'borderWidth': '',
                            'borderRadius': '',
                            'borderStyle': '',
                            '-webkit-text-stroke': '',
                            '-moz-text-stroke': '',
                            '-o-text-stroke': ''
                        });
                        a1.css({'stroke': '', 'stroke-width': ''});
                        continue;
                    }
                    if (a1.parent().data('object-ref') == 'texts') {
                        a1.css({
                            '-webkit-text-stroke': a2.border.color + ' ' + a2.border.size + 'px',
                            '-moz-text-stroke': a2.border.color + ' ' + a2.border.size + 'px',
                            'o-text-stroke': a2.border.color + ' ' + a2.border.size + 'px'
                        });
                        continue;
                    }
                    if (a1.is('svg')) {
                        a1.css({'stroke': a2.border.color, 'stroke-width': a2.border.size});
                        continue;
                    }
                    i3 = {'borderStyle': 'solid'};
                    if (a2.border.color) {
                        i3.borderColor = a2.border.color;
                    }
                    if (a2.border.size !== undefined) {
                        i3.borderWidth = a2.border.size + 'px';
                    }
                    if (a2.border.corner !== undefined) {
                        i3.borderRadius = a2.border.corner + 'px';
                    }
                    a1.css(i3);
                    break;
                case'shadow':
                    if ([undefined, null].indexOf(a2.shadow) !== -1) {
                        a1.css('text-shadow', '');
                        ref = a1.get(0).style.filter;
                        ref = ref.replace(/(rgba|rgb)+\(.*?\)/g, '#0000');
                        a1.get(0).style.filter = ref.replace(/drop\-shadow+\(.*?\)/g, '');
                        continue;
                    }
                    if (a1.parent().data('object-ref') == 'texts') {
                        a1.css('text-shadow', '' + a2.shadow.x + 'px ' + a2.shadow.y + 'px ' + (a2.shadow.spread | 0) + 'px ' + a2.shadow.color + '');
                        continue;
                    }
                    ref = a1.get(0).style.filter;
                    ref = ref.replace(/(rgba|rgb)+\(.*?\)/g, '#0000');
                    ref = ref.replace(/drop\-shadow+\(.*?\)/g, '')
                    ref += ' drop-shadow(' + a2.shadow.x + 'px ' + a2.shadow.y + 'px ' + (a2.shadow.spread | 0) + 'px ' + a2.shadow.color + ')';
                    a1.css('filter', ref);
                    break;
                case'blur':
                case'opacity':
                    if (a2.blur !== undefined) {
                    }
                    if (a2.opacity !== undefined) {
                        a2.opacity = parseFloat(a2.opacity);
                        ref = a1.get(0).style.filter.replace(/opacity+\(.*?\)/g, '');
                        ref += 'opacity(' + ((1 / 10) * a2.opacity) + ')';
                        a1.css('filter', ref);
                    } else {
                        ref = a1.get(0).style.filter;
                        a1.get(0).style.filter = ref.replace(/opacity+\(.*?\)/g, '');
                    }
                    break;
                case'linestroke':
                    if ([undefined, null].indexOf(a2.linestroke) !== -1) {
                        a1.css({'stroke': '#000', 'stroke-width': 2});
                        continue;
                    }
                    a1.css({'stroke': a2.linestroke.color, 'stroke-width': a2.linestroke.size})
                    break;
                case'xy':
                    if (a2.xy == 'x0') {
                        a1.css('left', 0 + '%');
                    } else if (a2.xy == 'x1') {
                        i3 = a1.parent();
                        a1.css('left', ((i3.width() - a1.width()) / i3.width()) * 100 + '%');
                    } else if (a2.xy == 'xy0') {
                        i3 = a1.parent();
                        a1.position({'my': 'center center', 'at': 'center center', 'of': i3});
                        e = a1.position();
                        e.leftAbs = ((e.left / i3.width()) * 100) + '%';
                        e.topAbs = ((e.top / i3.height()) * 100) + '%';
                        a1.css({'left': e.leftAbs, 'top': e.topAbs});
                        return e;
                    } else if (a2.xy == 'y0') {
                        a1.css('top', '0%');
                    } else if (a2.xy == 'y1') {
                        i3 = a1.parent();
                        a1.css('top', ((i3.height() - a1.height()) / i3.height()) * 100 + '%');
                    } else {
                        e = a2.xy.split('x');
                        i3 = a1.parent();
                        if (e[0].indexOf('%') !== -1) {
                            e.leftAbs = e[0];
                        } else {
                            e.leftAbs = ((e[0] / i3.width()) * 100) + '%';
                        }
                        if (e[1].indexOf('%') !== -1) {
                            e.topAbs = e[1];
                        } else {
                            e.topAbs = ((e[1] / i3.width()) * 100) + '%';
                        }
                        a1.css({'left': e.leftAbs, 'top': e.topAbs});
                    }
                    return a1.position();
                    break;
                case'wh':
                    e = a2.wh.split('x');
                    i3 = a1.parent();
                    if (e[0].indexOf('%') !== -1) {
                        e.width = e[0];
                    } else {
                        e.width = ((e[0] / i3.width()) * 100) + '%';
                    }
                    if (e[1].indexOf('%') !== -1) {
                        e.height = e[1];
                    } else {
                        e.height = ((e[1] / i3.width()) * 100) + '%';
                    }
                    a1.css({'width': e.width, 'height': e.height});
                    break;
                case'rotate':
                    e = a1.data('uiRotate');
                    if (a2.rotate == undefined || a2.rotate == null) {
                        a1.get(0).style.transform = '';
                        if (e) {
                            e.update(0);
                        }
                        continue;
                    }
                    if (a1[0]._gsTransform) {
                        a1[0]._gsTransform.rotation = a2.rotate;
                    }
                    a1.get(0).style.transform = 'rotate(' + a2.rotate + 'deg)';
                    if (e) {
                        e.update(a2.rotate);
                    }
                    break;
                case'flip':
                    if ([undefined, null].indexOf(a2.flip) !== -1) {
                        a1.css('transform', '');
                        continue;
                    }
                    a1.css('transform', 'translateZ(0px) scale(' + a2.flip[0] + ', ' + a2.flip[1] + ')');
                    break;
                case'hide':
                    if (a2.hide) {
                        a1.addClass('invisible');
                    } else {
                        a1.removeClass('invisible');
                    }
                    break;
                case'lock':
                    if (a2.lock) {
                        a1.data('locked', true);
                    } else {
                        a1.data('locked', false);
                    }
                    break;
                case'order':
                    if (a2.order == 'front') {
                        a1.prependTo(a1.parent());
                    } else if (a2.order == 'forward') {
                        a1.prev().before(a1)
                    } else if (a2.order == 'back') {
                        a1.appendTo(a1.parent());
                    } else if (a2.order == 'backward') {
                        a1.before(a1.next());
                    } else {
                        a1.css('zIndex', a2.order);
                    }
                    e = a1.index() + 1;
                    a1.css('zIndex', e);
                    return e;
                    break;
                case'clip':
                    ShapeTexture(a1, a2.clip)
                    break;
            }
        }
    }

    function parseTemplates(type, i1, i2, i3, i4, i5, i6) {
        switch (type) {
            case'tpl':
                break;
            case'background':
                i2 = i1.indexOf('|');
                i3 = i1.substr(0, i2);
                i4 = i1.substr(i2 + 1);
                if (i3 == 'color') {
                    return {'color': i4};
                }
                if (i3 == 'gradient') {
                    i4 = i4.split('+');
                    i6 = [];
                    i4 = i4.slice(0, 4);
                    for (i2 = 0; i4.length > i2; i2++) {
                        i5 = i4[i2].trim().split(' ');
                        i6.push({'deg': i5[0], 'start': i5[1], 'y': i5[2], 'stop': i5[3], 'x': i5[4]});
                    }
                    i5 = {'gradient': i6};
                    return i5;
                }
                if (i3 == 'texture' || i3 == 'image') {
                    i4 = i4.trim().split(' ');
                    i6 = {'ref': i4[0], 'zoom': i4[1]};
                    if (i4[2] !== undefined) {
                        i6.x = i4[2];
                    }
                    if (i4[3] !== undefined) {
                        i6.y = i4[3];
                    }
                    i5 = {};
                    i5[i3] = i6;
                    return i5;
                }
                break;
            case'buttons':
                i1 = $.extend(true, {}, i1);
                i5 = {};
                i6 = i1.text.indexOf('|');
                i3 = i1.text.substr(0, i6);
                i1.text = i1.text.substr(i6 + 1);
                i5.text = parseTemplates('texts', i1.text);
                i5.text.content = i3;
                if (i1.bd) {
                    i5.border = parseTemplates('border', i1.bd);
                }
                if (i1.sd) {
                    i5.shadow = parseTemplates('shadow', i1.sd);
                }
                if (i1.b) {
                    i5.blur = parseTemplates('blur', i1.b);
                }
                if (i1.t) {
                    i5.opacity = parseTemplates('transparency', parseFloat(i1.t));
                    i5.opacity = (i5.opacity * 10)
                }
                i5.background = parseTemplates('background', i1.background);
                return i5;
                break;
            case'texts':
                i1 = i1.split('|');
                i3 = 'normal';
                if ((i2 = i1[0].indexOf(':')) && i2 !== -1) {
                    i3 = i1[0].split(':')[1];
                    i4 = i1[0].substr(0, i2);
                } else {
                    i4 = i1[0];
                }
                if (c.libs.fonts[i4] && c.libs.fonts[i4][i3] == 0) {
                    i3 = 'normal';
                }
                i5 = i1[1].trim().split(' ');
                return {'font': i4, 'type': i3, 'size': i5[0], 'color': i5[1]};
                break;
            case'border':
                i1 = i1.split(' ');
                return {'size': i1[0], 'color': i1[1], 'corner': i1[2]};
                break;
            case'shadow':
                i1 = i1.split(' ');
                return {'x': i1[0], 'y': i1[1], 'color': i1[2], 'spread': (i1[3] | 0)};
                break;
            case'blur':
            case'transparency':
                i1 = parseFloat(i1);
                return i1;
                break;
        }
    }

    function getPhoto(ph_cb, type) {
        if (c['loaded' + type] && c['loaded' + type] < Object.keys(c[type].items).length) {
            if (typeof ph_cb === 'function') {
                ph_cb(type);
            }
            return;
        }
        $.getJSON(location.origin + '/editor/getphoto.php?type=' + type, function (r) {
            if (typeof c[r.type] !== 'object') {
                c[r.type] = r;
                c['loaded' + r.type] = 0;
            } else {
                $.extend(c[r.type].items, r.item);
            }
            if (typeof ph_cb === 'function') {
                ph_cb(r.type);
            }
        }).fail(function () {
            ph_cb(type, false);
        })
    }

    function updateLoadables(e) {
        e = e.toString().toLowerCase();
        if (e == 'brushes') {
            $.get(location.origin + '/editor/loadbrushes.php', function (r) {
                c.brushes_strings = r;
            }, 'json')
        } else if (e == 'bg_textures') {
            c.failedTextures = [];
            j.each(c.libs.bg_textures, function (b, d) {
                e = new Image;
                e.id = b;
                e.data_lib_link = d;
                e.onload = function () {
                    $('#objectpack_bg .tab-content > #editor_material_textures .row:last > .card:eq(' + this.id + ')').empty().removeClass('loading').addClass('loaded').css({
                        'background-image': 'url(' + this.tmb + ')',
                        'background-size': 'cover'
                    });
                    c.bg_textures_string[this.id] = this.src;
                }
                e.onerror = function () {
                    c.failedTextures.push(this.src);
                    c.bg_textures_string[this.id] = '';
                }
                e.src = location.origin + '/library/bg_textures/' + d + '.jpg';
                e.tmb = location.origin + '/library/bg_textures/tmb/' + d + '.jpg';
            })
        } else if (e == 'shapes') {
            a = $('#objectpack_shapes .row[data-shape-ref]:visible');
            j.each(a, function (e) {
                e = $(this).find('.loading');
                a = $(this).data('shape-ref');
                if (e.length == 0) {
                    return;
                }
                d = Object.values(c.libs.shapes[a]);
                f = Object.keys(c.libs.shapes[a]);
                b = d.length;
                $('#objectpack_shapes').data({'max_load_request': b, 'max_loaded_request': 0});
                for (i = 0; b > i; i++) {
                    k = e.index(e[i]);
                    $(e[i]).attr('data-ref-id', k);
                    j.ajax({
                        'url': c.policySetup.PUBLIC_SHAPE_REPO + '/library/shapes/' + a + '/svg/' + d[k] + '.svg',
                        'id': k,
                        'name': f[k],
                        'ref': a,
                        'index': d[k],
                        'type': 'GET',
                        'dataType': 'text',
                        'cache': true,
                    }).done(function (r, e) {
                        e = $('#objectpack_shapes .row[data-shape-ref="' + this.ref + '"] > .loading[data-ref-id=' + this.id + ']').removeClass('loading').addClass('loaded').attr({
                            'title': this.name,
                            'data-object-ref': this.ref,
                            'data-object-src': this.index
                        }).css('height', 55);
                        e.get(0).innerHTML = r
                        e.find('svg').attr({'preserveAspectRatio': 'none', 'fill': '#888585'}).css({
                            'width': '100%',
                            'height': '100%'
                        });
                        a = $('#objectpack_shapes');
                        b = a.data('max_loaded_request') + 1;
                        a.data('max_loaded_request', b);
                        if (b == a.data('max_load_request')) {
                            a.addClass('loaded');
                        }
                        if (typeof c.shapeBlob[this.ref] == 'undefined') {
                            c.shapeBlob[this.ref] = {};
                        }
                        c.shapeBlob[this.ref][this.id] = r;
                    }).fail(function () {
                        objectpack_log.innerHTML = '<a href="#" onclick="($(\'#object_toggler > ul > li:last a\').trigger(\'click\'),$(this).remove())"><span class="text-danger">Some objects could not load. Click to try again</span></a>';
                    })
                }
            })
        }
    }

    c.embedCode = function (e) {
        e = parseInt(c.ID);
        if ((isNaN(e) == false && typeof e == 'number') == false) {
            alertMessage('error', c.language('editor_ui_msg_saveall'));
            return;
        }
        mdDialog(function () {
            this.size = 'medium'
            this.title = '';
            this.copy = function (e) {
                e = $(e).get(0)
                e.focus();
                e.select();
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(e.value).then(function () {
                        toastr['success']('Successfully copied to clipboard');
                    }, function () {
                        alertMessage('error', 'Could not copy (strings) to clipboard')
                    })
                    return;
                }
                try {
                    document.execCommand('copy');
                    toastr['success']('Successfully copied to clipboard');
                } catch (e) {
                    alertMessage('error', 'Could not copy (strings) to clipboard')
                }
            }
            this.onshow = function (e, i) {
                clipboardCopyUi = this;
                this.body = $(this.target + ' .modal-body');
                for (i = 0; 4 > i; i++) {
                    this.dsc = '';
                    if (i == 0) {
                        this.n = c.language('editor_ui_lkwin_tx_edit');
                        this.v = location.origin + '/edit?q=' + c.ID
                        this.dsc = c.language('editor_ui_lkwin_tx_edit_tip');
                    } else if (i == 1) {
                        this.n = c.language('editor_ui_lkwin_tx_prv');
                        this.v = location.origin + '/printer/display/' + c.ID + '/preview.png'
                    } else if (i == 2) {
                        this.n = c.language('editor_ui_lkwin_tx_grab');
                        this.v = '';
                        this.dsc = c.language('editor_ui_lkwin_tx_grab_tip');
                    } else {
                        this.n = c.language('editor_ui_pdp');
                        this.v = location.origin + '/printer/print/' + c.ID + '.{format}'
                        this.dsc = c.language('editor_ui_pdp_tip') + ' i.e png,jpg,gif,svg,html,svg,mp4,gif <br><br>' + c.language('editor_ui_lkwin_tx_edit_tip');
                        ;
                    }
                    this.tp = $('<div class="form-group"><label>' + this.n + '</label><div class="input-group"><input readonly value="' + this.v + '" class="form-control form-control-sm" /><div class="input-group-btn"><button copy class="btn btn-sm btn-primary">' + c.language('editor_ui_cp') + '</button></div></div><p class="text-warning">' + this.dsc + '</p></div>');
                    if (i == 2) {
                        this.tp.find('.input-group:first').prepend('<div class="input-group-btn"><button gen class="btn btn-sm btn-primary">' + c.language('editor_ui_gen') + '</button></div>')
                    }
                    this.body.append(this.tp)
                }
                this.body.find('.form-group button.btn[copy]').on('click', function (e) {
                    e = this.parentNode.previousSibling;
                    if (e.value == "") {
                        toastr.error(c.language('editor_ui_msg_dataloadempty'));
                        return;
                    }
                    clipboardCopyUi.copy(e)
                })
                this.body.find('.form-group button.btn[gen]:first').on('click', function () {
                    $(this).find('span.fa-spin').remove();
                    $(this).append('<span class="fa fa-spin fa-spinner"></span>')
                    $.ajax({
                        'url': location.origin + '/editor/grabkey.php',
                        'type': 'POST',
                        'data': {'q': c.ID}
                    }).done(function (r) {
                        if (clipboardCopyUi && clipboardCopyUi.body) {
                            r = location.origin + '/printer/get/' + r + '.jpg';
                            clipboardCopyUi.body.find('.form-group:eq(2) input:first').val(r)
                        }
                    }).always(function () {
                        clipboardCopyUi.body.find('.form-group:eq(2) button[gen] span.fa-spin').remove()
                    })
                })
            }
            this.onhide = function () {
                this.destroy();
                $.each(Object.keys(this), function (i, e) {
                    delete clipboardCopyUi[e];
                })
            }
            return this;
        })
    }
    c.projectBlank = function () {
        if (!notify('workspace.beforeblank')) return;
        pre_blank_prompt = mdDialog(function () {
            this.start = function () {
                c.domCanvas.trigger('disconnectScope', ['.active']).empty();
                c.domSlidesWrapper.empty();
                delete c.slides;
                c.slides = [];
                c.history = [];
                c.idCache = {};
                c.workSpaceReady = false;
                if (c.ID) {
                    delete c.ID;
                }
                c.idCache = {};
                c.domScreenAdd.trigger('click');
                c.workSpaceReady = true;
                c.TL.clear()
                notify('screen.afterBlank');
            }
            this.title = c.language('editor_ui_msg_saveall');
            this.size = 'small';
            this.footer = '<button class="btn btn-sm btn-primary">' + c.language('editor_ui_saveit') + '</button><button class="btn btn-sm btn-faded">No</button>';
            this.onshow = function () {
                $(this.target + ' .modal-footer > button:first').on('click', function (e) {
                    pre_blank_prompt.minimize();
                    e = $('#object_toggler_save ul > li > a[data-export-type=none]');
                    c.saveWork(e, function (status) {
                        if (status == true) {
                            pre_blank_prompt.maximize();
                            pre_blank_prompt.start();
                            pre_blank_prompt.close()
                        } else {
                            toastr['error'](c.language('editor_ui_msg_failedop'));
                            pre_blank_prompt.destroy();
                        }
                    });
                }).next().on('click', function () {
                    pre_blank_prompt.start();
                    pre_blank_prompt.close()
                })
                $(this.target + ' .modal-body').hide(0);
            }
            this.onhide = function () {
                this.destroy();
            }
            return this;
        })
    }
    c.runPlugin = function (ext, arg) {
        if (!c.pluginManagerSetup[ext]) return false;
        if (c.pluginManagerSetup[ext].state !== 0) {
            c.pluginManager[ext].arguement = arg;
            c.pluginManager[ext].maximize();
            if (c.pluginManager[ext].plugGui && typeof c.pluginManager[ext].plugGui.onload == 'function') {
                c.pluginManager[ext].plugGui.onload();
            }
            return;
        }
        c.pluginManager[ext] = mdDialog(function () {
            this.uid = ext;
            this.title = 'Plugin: ' + c.pluginManagerSetup[ext].name;
            this.size = 'large';
            this.displayMode = 0;
            this.arguement = arg;
            this.focus = function () {
                if (c.pluginManagerSetup[this.uid].fullscreen == true) return;
                if (c.pluginManActive && c.pluginManager[c.pluginManActive]) {
                    c.pluginManager[c.pluginManActive].md.parents('.modal').css('zIndex', '')
                }
                c.pluginManActive = this.uid;
                this.md.parents('.modal').css('zIndex', '10001')
            }
            this.startPlug = function (token) {
                this.e = document.createElement('iframe');
                this.e.setAttribute('class', 'border-0 d-none');
                this.e.style.height = this.body.height() + 'px';
                this.e.style.width = this.body.width() + 'px';
                this.e.setAttribute('scrolling', 'no');
                this.body.prepend('<div id="start_loading"><figure class=""><div class="preloader"><p></p><span><img src="assets/img/logo.png"></span></div></figure><span class="h2 center">Loading</span></div>').append(this.e);
                this.__win = (this.e.contentWindow);
                this.__doc = this.e.contentDocument;
                $(this.__doc).on('mouseover', 'input,textarea,select', function () {
                    window.clearInterval(c.keyboardEventKeepTimer)
                }).on('mouseout', 'input,textarea,select', function () {
                    c.keyboardEventKeep();
                })
                this.e = this.__doc.createElement('script');
                this.e.setAttribute('type', 'text/javascript');
                if (c.pluginManagerSetup[this.uid].host) {
                    this.e.setAttribute('src', 'https://' + c.pluginManagerSetup[this.uid].host + '/' + c.pluginManagerSetup[this.uid].app + '?' + $.now());
                } else {
                    this.e.setAttribute('src', location.origin + '/plugin/' + this.uid + '.js?' + $.now());
                }
                this.__doc.head.appendChild(this.e);
                delete this.__doc;
                delete this.e;
                this.__win.SdkPluginGui = this;
                this.initToken = token;
                this.maximize();
                this.focus();
                this.__win.initPluginSdk = function (cb, ui, sdk) {
                    this.SdkPluginGui.body.find('#start_loading').remove();
                    this.SdkPluginGui.body.find('iframe:first').removeClass('d-none');
                    this.clearTimeout(this.waiting);
                    sdk = function (n, pm) {
                        var uid = n;
                        this.gui = c.editorSDK.gui;
                        if (c.pluginManager[uid].initToken.length > 0) {
                            for (i = 0; c.pluginManager[uid].initToken.length > i; i++) {
                                pm = c.pluginManager[uid].initToken[i];
                                if (c.editorSDK[pm]) this[pm] = c.editorSDK[pm];
                                if (pm == 'layer') {
                                    this.layers = c.editorSDK.layerset.list
                                } else if (pm == 'profile') {
                                    this.userprofile = $.extend({}, c.UserProfile);
                                }
                            }
                            if (this.library) {
                                this.imageManager = c.editorSDK.myimg;
                                this.shapesManager = c.editorSDK.shapes;
                                this.svgManager = c.editorSDK.mysvg;
                            }
                        }
                        this.registerEvents = function (cb) {
                            if (typeof cb !== 'function') return false;
                            Events.on('screen.*.' + uid, 'after', cb);
                            Events.on('obj.*.' + uid, 'after', cb);
                            Events.on('workspace.*.' + uid, 'after', cb);
                            return true;
                        }
                        this.dispatchEvent = function (n, o) {
                            n = $.trim(n);
                            if (typeof n == 'string' && n.length > 2) {
                                n = n[0].toUpperCase() + n.substr(1)
                                notify('plugMan:' + uid + '.after.' + n, o);
                            }
                        }
                        this.subscribeEvent = function (n, cb) {
                            if (!c.pluginManagerSetup[n]) return false;
                            if (typeof cb !== 'function') return false;
                            Events.off('plugMan:' + n + '.*.' + uid);
                            Events.one('plugMan:' + n + '.*.' + uid, cb);
                            return true;
                        }
                        this.getArg = function () {
                            return c.pluginManager[uid].arguement;
                        }
                    }
                    ui = function (u) {
                        var md = u;
                        this.resize = function (w, h, o, i) {
                            o = {};
                            if (typeof w == 'number') {
                                o.width = w;
                            }
                            if (typeof h == 'number') {
                                o.height = h;
                            }
                            i = md.body.find(' > iframe:first');
                            if (o.width || o.height) {
                                i.css(o);
                            }
                            return {'width': i.width(), 'height': i.height()}
                        }
                        this.Updatestatus = function (s, i) {
                            i = typeof s;
                            if (i == 'string' || (i == 'number' && !isNaN(s))) {
                                md.setfooter('<p class="m-0">' + s + '</p>')
                            }
                        }
                        this.minimize = function () {
                            md.minimize();
                            c.pluginManagerSetup[md.uid].state = -1;
                        }
                        this.maximize = function () {
                            md.maximize();
                            c.pluginManagerSetup[md.uid].state = 1;
                        }
                        this.fullscreen = function () {
                            if (c.pluginManagerSetup[md.uid].state === -1) this.minimize();
                            if (c.pluginManagerSetup[md.uid].fullscreen) {
                                if (!c.pluginManagerSetup[md.uid].position) c.pluginManagerSetup[md.uid].position = {
                                    'left': 0,
                                    'top': 0
                                }
                                md.md.parent().removeClass('h-100 w-100').css(c.pluginManagerSetup[md.uid].position).css('zIndex', '').draggable('enable');
                                md.md.removeClass('h-100 w-100').css('maxWidth', '');
                                md.body.removeClass('h-100 w-100').parent().removeClass('h-100 w-100')
                                md.body.find(' > iframe:first').removeClass('w-100')
                                c.pluginManagerSetup[md.uid].fullscreen = false;
                            } else {
                                md.md.parent().addClass('h-100 w-100').css({
                                    'zIndex': 20000,
                                    'top': 0,
                                    'left': 0
                                }).draggable('disable');
                                md.md.addClass('h-100 w-100').css('maxWidth', '100%');
                                md.body.addClass('h-100 w-100').parent().addClass('h-100 w-100')
                                md.body.find(' > iframe:first').addClass('w-100')
                                c.pluginManagerSetup[md.uid].fullscreen = true;
                            }
                            return c.pluginManagerSetup[md.uid].fullscreen;
                        }
                        this.openWindow = function (name, cb, w) {
                            if (md.win[name]) {
                                md.win[name].destroy();
                            }
                            w = md.openWindow(name, cb);
                            this.win = md.win;
                            return w;
                        }
                        this.close = function () {
                            c.pluginManagerSetup[md.uid].state = 0;
                            md.close();
                        }
                    }
                    if (typeof cb == 'function') {
                        this.SdkPluginGui.plugGui = new ui(this.SdkPluginGui);
                        cb(new sdk(this.SdkPluginGui.uid), this.SdkPluginGui.plugGui, jQuery, location);
                        if (typeof this.SdkPluginGui.plugGui.onload == 'function') {
                            this.SdkPluginGui.plugGui.onload();
                        }
                    }
                    delete this.SdkPluginGui;
                    return null;
                }
                this.__win.waiting = this.__win.setTimeout(function () {
                    e = alertMessage('error', 'Plugin(' + c.pluginManagerSetup[this.SdkPluginGui.uid].name + ') taking longer to initialize. Shutting down..');
                    e.SdkPluginGui = this.SdkPluginGui;
                    e.onhide = function () {
                        this.SdkPluginGui.close();
                    }
                }, 10000)
            }
            this.oninit = function () {
                c.pluginManager[this.uid] = this;
                this.body = $(this.target + ' .modal-body').addClass('bg-faded fancyscroll');
                this.head = this.body.prev();
                this.md = this.body.parent().parent().addClass('m-0')
                this.position = {'left': 0, 'top': 0};
                if (c.pluginManagerSetup[this.uid].position) {
                    this.position = c.pluginManagerSetup[this.uid].position;
                }
                this.body.parents('.modal').data('c', this).draggable({
                    'handle': this.head, 'stop': function (e, u) {
                        e = $(this).data('c');
                        c.pluginManagerSetup[e.uid].position = u.position;
                    }
                }).css({
                    'position': 'absolute',
                    'overflow': 'hidden',
                    'right': 'auto',
                    'bottom': 'auto',
                    'left': this.position.left,
                    'top': this.position.top
                })
                this.head.on('click', {'c': this}, function (e) {
                    e.data.c.focus();
                })
                this.body.parent().css('boxShadow', 'none');
                this.body.css({'height': 520, 'width': 760, 'overflow': 'auto'}).next().empty();
                this.settitle('<p class="m-0">' + this.title + '</p>');
                this.head.addClass('py-2 px-1').append('<div class="btn-group px-3">' + ('<a href="#" class="btn btn-sm"><span></span></a>').repeat(2) + '</div>');
                this.e = this.head.find('> div:last a span');
                this.e.first().addClass('fa fa-minus').parent().on('click', {'c': this}, function (e) {
                    e.data.c.minimize();
                    c.pluginManagerSetup[e.data.c.uid].state = -1;
                    notify('plugMan:' + e.data.c.uid + '.afterGuiClose')
                })
                this.e.last().addClass('fa fa-close').parent().on('click', {'c': this}, function (e) {
                    e.data.c.close();
                })
                e = this;
                this.openWindow('pluginInvokeAccess', function () {
                    this.size = 'small';
                    this.parent = e;
                    this.title = 'Invoke Permission';
                    this.perm = ['profile', 'stage', 'layer', 'library', 'history', 'timeline'];
                    this.displayMode = 0;
                    this.onhide = function () {
                        c.pluginManager[this.parent.uid].close();
                        this.destroy();
                    }
                    this.prepare = function () {
                        this.body = $(this.target + ' .modal-body');
                        this.body.append('<div class="row"></div>');
                        e = this.body.find('.row:first');
                        for (i = 0; this.perm.length > i; i++) {
                            e.append('<div class="form-group col-12"><h6>' + this.perm[i] + '</h5><label title="Grant access to ' + this.perm[i] + ' API" class="w-100"> <input value="' + this.perm[i] + '" name="' + this.perm[i] + '" type="checkbox" /></label></div>')
                        }
                        e = e.find('input');
                        if (c.pluginManagerSetup[this.parent.uid].config.permissions === undefined) {
                            e.attr('checked', true)
                        } else if (c.pluginManagerSetup[this.parent.uid].config.permissions.length > 0) {
                            $.each(c.pluginManagerSetup[this.parent.uid].config.permissions, function (i) {
                                e.filter('[name="' + i + '"]').attr('checked', true)
                            })
                        }
                        e.switch();
                        e = this.body.next().append('<button class="btn btn-success btn-block">Continue</button>').find('button');
                        e.first().removeClass('btn-sm')
                        e.last().on('click', {'c': this}, function (e, o, i) {
                            o = [];
                            e.data.c.body.find('.form-group input[type=checkbox][name]').each(function (n) {
                                n = this.getAttribute('name');
                                if (e.data.c.perm.indexOf(n) === -1) return;
                                if ($(this).prop('checked')) {
                                    o.push(n);
                                }
                            })
                            i = e.data.c.parent;
                            e.data.c.destroy();
                            i.startPlug(o);
                        })
                    }
                    this.oninit = function (i, e, o) {
                        if (c.pluginManagerSetup[this.parent.uid].host) {
                            this.prepare();
                            this.maximize();
                        } else {
                            o = this.perm;
                            i = this.parent;
                            this.destroy();
                            i.startPlug(o)
                        }
                    }
                })
            }
            this.onshow = function () {
                c.pluginManagerSetup[this.uid].state = 1;
            }
            this.onhide = function () {
                if (this.plugGui && typeof this.plugGui.beforeUnload == 'function') {
                    this.plugGui.beforeUnload();
                }
                c.pluginManagerSetup[this.uid].state = 0;
                c.pluginManagerSetup[this.uid].fullscreen = false;
                Events.on('screen.*.' + this.uid, 'after');
                Events.on('obj.*.' + this.uid, 'after');
                Events.on('workspace.*.' + this.uid, 'after');
                delete c.pluginManager[this.uid]
                this.destroy();
            }
        })
    }
    c.docInfo = function (e) {
        mdDialog(function (i) {
            this.title = c.language('editor_ui_info_doch');
            this.onhide = function () {
                this.destroy();
            }
            this.onshow = function () {
                metaEditor = this;
                $(this.target + ' .modal-body input').each(function (i, e) {
                    if (!c.IDmeta) return;
                    i = this.getAttribute('name');
                    $(this).val(c.IDmeta[i])
                })
                $(this.target + ' .modal-footer > button:first').click(function () {
                    if (typeof c.IDmeta !== 'object') {
                        c.IDmeta = {};
                    }
                    $(metaEditor.target + ' .modal-body input').each(function (i, e) {
                        e = safe_text($(this).val());
                        e = $.trim(e);
                        i = this.getAttribute('name');
                        if (e.length == 0) {
                            $(this).focus();
                            return;
                        }
                        c.IDmeta[i] = e;
                    })
                    metaEditor.close();
                })
            }
            this.metaKey = ['Title', 'Author', 'Organisation', 'Tags'];
            this.content = '';
            for (i = 0; this.metaKey.length > i; i++) {
                e = this.metaKey[i];
                if (i == 0) {
                    e = c.language('editor_ui_info_title')
                } else if (i == 1) {
                    e = c.language('editor_ui_info_author')
                } else if (i == 2) {
                    e = c.language('editor_ui_info_org');
                } else {
                    e = c.language('editor_ui_info_tags');
                }
                this.content += '<div class="form-group"><label>' + e + '</label><input name="' + this.metaKey[i].toLowerCase() + '" class="mac w-100" /></div>';
            }
            this.footer = '<button class="btn btn-success btn-sm">Save</button>';
            return this;
        })
    }
    custom_prompt = function (cb) {
        if (typeof cb !== 'function')
            cb = $.noop;
        return mdDialog(function () {
            this.footer = '<button class="btn btn-lg btn-success">Yes</button>';
            this.title = c.language('editor_ui_msg_confirm');
            this.content = '';
            this.cb = cb;
            this.onshow = function (e) {
                prompt_dialog = this;
                e = $(this.target).css('zIndex', '99999');
                $(this.target + ' .modal-body').hide(0);
                $(this.target + ' .modal-footer > button:first').on('click', {'c': this}, function (e, b) {
                    b = $(this);
                    b.find('span').remove();
                    b.prepend('<span class="fa fa-spinner fa-spin"></span>');
                    e.data.c.cb(b);
                }).next().removeClass('btn-secondary btn-sm d-none').addClass('btn-danger btn-lg').text('No');
            }
            this.onhide = function () {
                this.destroy();
            }
            return this;
        })
    }
    c.downloadList = function () {
        if (c.downloadList_dialog) return;
        return mdDialog(function () {
            this.content = loader;
            this.listArr = [];
            this.request = false;
            this.title = c.language('editor_ui_dwmwin_head');
            this.errmsg = '<div class="card-block"><center><p><i class="fa fa-exclamation-triangle fa-2x"></i></p><h5 class="text-warning">' + c.language('editor_ui_dwmwin_noinfo') + '</h5></center></div>';
            this.clearList = function () {
                $.get(location.origin + '/printer/clear/all', function () {
                    c.downloadList_dialog.body.html(c.downloadList_dialog.errmsg);
                    c.downloadList_dialog.listArr = [];
                })
            }
            this.fetchList = function () {
                this.trigger.first().find('i.fa:first').removeClass('fa-spin').addClass('fa-spin');
                this.request = $.get(location.origin + '/printer/status/all', function (r) {
                    if (c.downloadList_dialog) c.downloadList_dialog.listArr = r;
                }, 'json').always(function () {
                    c.downloadList_dialog.trigger.first().find('i.fa:first').removeClass('fa-spin')
                    c.downloadList_dialog.renderList();
                })
            }
            this.renderList = function (w, d) {
                if (this.listArr.length == 0) {
                    this.body.html(this.errmsg);
                    return;
                } else {
                    this.body.html('<div class="card-block"></div>')
                }
                w = this.body.find('.card-block:first');
                for (i = 0; this.listArr.length > i; i++) {
                    d = '';
                    if (this.listArr[i].status >= 1) {
                        d = '<a target="_blank" href="' + location.origin + '/printer/status/' + this.listArr[i].token + '?token=' + this.listArr[i].token + '" class="btn btn-sm btn-outline-primary"><i class="fa fa-cloud-download"></i></a>';
                    }
                    e = $('<div class="row px-0 py-2 mb-1 justify-content-between"><div class="col-8"><div class="progress"><div class="progress-bar" style="width:' + ((100 / 1) * this.listArr[i].status) + '%"></div></div></div><div class="col-auto"><span class="mr-2">' + this.listArr[i].media + '</span>' + d + '</div></div>');
                    w.append(e);
                }
                if (w.is(':empty')) {
                    this.body.html(this.errmsg)
                } else {
                    w.find('.row a').on('click', {'p': w}, function (e) {
                        $(this).parents('.row').remove();
                        if (e.data.p.is(':empty')) e.data.p.html(c.downloadList_dialog.errmsg)
                    })
                }
            }
            this.onhide = function () {
                if (this.request) this.request.abort();
                delete c.downloadList_dialog;
                this.destroy();
            }
            this.oninit = function () {
                this.modal = $(this.target);
                this.modal.find('.modal-dialog').addClass('bg-current')
                this.body = this.modal.find('.modal-body').addClass('bg-faded').css({
                    'boxShadow': 'none',
                    'background': 'none'
                });
                this.trigger = this.body.prev('.modal-header').append('<div class="btn-group"><a class="btn" data-id="refresh" href="#"><i class="fa fa-refresh"></i></a><a class="btn" data-id="clear" href="#"><i class="fa fa-trash"></i></a></div>').find('a').click(function (i) {
                    i = $(this).data('id');
                    if (i == 'refresh') {
                        c.downloadList_dialog.fetchList();
                    } else {
                        c.downloadList_dialog.clearList();
                    }
                })
                c.downloadList_dialog = this;
                this.fetchList();
            }
            return this;
        });
    }
    c.transformation = function () {
        var ele, scope, obj, config = {};
        config.drag = {
            'cursor': 'move', 'snap': false, 'snapTolerance': 5, 'helper': function (e, u) {
                ele[0].style.transform = '';
                u = ele.clone();
                u.offset = ele.offset();
                u.offset.width = ele.width();
                u.offset.height = ele.height();
                u.css(u.offset);
                u[0].style.transform = 'rotate(' + (scope.prop.r | 0) + 'deg)';
                return u[0];
            }, 'start': function (e, u) {
                u.selc = [];
                $.each(c.currentSelection, function (i, e) {
                    u.selc.push(i)
                    e.addClass('focus');
                })
                ele[0].style.transform = 'rotate(' + (scope.prop.r | 0) + 'deg)';
                c.transformHandler.i = c.domCanvas.offset()
                e = c.domCanvas.children('div:visible:first').get(0).getBoundingClientRect();
                c.transformHandler.bd = e;
                c.transformHandler.org = {
                    'left': u.offset.left - c.transformHandler.i.left,
                    'top': u.offset.top - c.transformHandler.i.top
                };
                c.domDocBody.addClass('guiding drag');
                guideBoxinfoSetup(obj);
                if (!notify('obj.beforeMove', {'obj': u.selc})) return;
            }, 'drag': function (e, u) {
                ele.css(u.offset)
                c.transformHandler.bd.org = u.position;
                interactiveGuide(u.helper.get(0), c.transformHandler.bd, 'drag');
            }, 'stop': function (e, u) {
                c.domDocBody.removeClass('guiding drag');
                $.each(c.currentSelection, function (i, e) {
                    e.removeClass('focus');
                })
                u.kleft = u.offset.left - c.transformHandler.i.left;
                u.ktop = u.offset.top - c.transformHandler.i.top;
                u.dst = {};
                if (c.transformHandler.org.top >= u.ktop) {
                    u.dst.top = (c.transformHandler.org.top - u.ktop);
                } else {
                    u.dst.top = (u.ktop - c.transformHandler.org.top)
                    u.dst.topadd = true;
                }
                if (c.transformHandler.org.left >= u.kleft) {
                    u.dst.left = (c.transformHandler.org.left - u.kleft)
                } else {
                    u.dst.left = (u.kleft - c.transformHandler.org.left)
                    u.dst.leftadd = true;
                }
                u.selc = [];
                u.a = c.domCanvas;
                $.each(c.currentSelection, function (id, e, b, d, t, i) {
                    t = e;
                    i = t.attr('scope');
                    if (c.slides[0].elements[i].locked == true) return;
                    u.selc.push(i);
                    e = real_offset(t, u.a);
                    if (u.dst.leftadd === true) {
                        e.left = (e.left + u.dst.left)
                    } else {
                        e.left = (e.left - u.dst.left)
                    }
                    if (u.dst.topadd === true) {
                        e.top = (e.top + u.dst.top)
                    } else {
                        e.top = (e.top - u.dst.top)
                    }
                    b = ((e.left) / c.stageWidth) * 100;
                    d = ((e.top) / c.stageHeight) * 100;
                    t.css({'left': b + '%', 'top': d + '%'});
                    c.slides[0].elements[i].prop.left = e.left;
                    c.slides[0].elements[i].prop.top = e.top;
                })
                c.transformHandler.reposition();
                notify('obj.afterMove', {'obj': u.selc});
            }
        }
        config.resize = {
            'handles': 'all', 'aspectRatio': false, 'start': function (e, u) {
                u.selc = [];
                $.each(c.currentSelection, function (i, e) {
                    u.selc.push(i)
                    e.addClass('focus');
                })
                notify('obj.beforeResize', {'obj': u.selc});
                e = c.domCanvas.children('div:visible:first').get(0).getBoundingClientRect();
                c.transformHandler.i = c.domCanvas.offset()
                c.transformHandler.bd = e;
                c.transformHandler.org = {
                    'left': u.position.left - c.transformHandler.i.left,
                    'top': u.position.top - c.transformHandler.i.top
                };
                c.domDocBody.addClass('guiding resize');
                guideBoxinfoSetup();
            }, 'resize': function (e, u) {
                ele[0].style.transform = '';
                interactiveGuide(u.element.get(0), c.transformHandler.bd, 'scale');
            }, 'stop': function (e, u) {
                u.t = 0;
                $.each(c.currentSelection, function (i, e) {
                    e.removeClass('focus');
                    u.t++;
                })
                u.dst = {};
                ele[0].style.transform = '';
                u.size.width = ele.width();
                u.size.height = ele.height();
                u.kleft = u.position.left;
                u.ktop = u.position.top;
                if (u.originalSize.height > u.size.height) {
                    u.dst.height = (u.originalSize.height - u.size.height);
                } else if (u.originalSize.height < u.size.height) {
                    u.dst.height = (u.size.height - u.originalSize.height)
                    u.dst.yadd = true;
                } else {
                    u.dst.height = 0;
                }
                if (u.originalSize.width > u.size.width) {
                    u.dst.width = (u.originalSize.width - u.size.width)
                } else if (u.originalSize.width < u.size.width) {
                    u.dst.width = (u.size.width - u.originalSize.width)
                    u.dst.xadd = true;
                } else {
                    u.dst.width = 0;
                }
                if (u.originalPosition.top > u.ktop) {
                    u.dst.top = (u.originalPosition.top - u.ktop);
                } else {
                    u.dst.top = (u.ktop - u.originalPosition.top)
                    u.dst.topadd = true;
                }
                if (u.originalPosition.left >= u.kleft) {
                    u.dst.left = (u.originalPosition.left - u.kleft)
                } else {
                    u.dst.left = (u.kleft - u.originalPosition.left)
                    u.dst.leftadd = true;
                }
                u.selc = [];
                u.a = c.domCanvas;
                u.pd_t = 0;
                u.pd_l = 0;
                $.each(c.currentSelection, function (id, e, b, d, t, i) {
                    t = e;
                    i = t.attr('scope');
                    if (c.slides[0].elements[i].locked == true) return;
                    u.selc.push(id);
                    e = real_offset(t, u.a);
                    e.width = t.outerWidth();
                    e.height = t.outerHeight();
                    if (u.dst.xadd === true) {
                        e.width = (e.width + u.dst.width);
                    } else {
                        e.width = (e.width - u.dst.width)
                    }
                    if (u.dst.yadd === true) {
                        e.height = (e.height + u.dst.height);
                    } else {
                        e.height = (e.height - u.dst.height)
                    }
                    if (u.dst.leftadd === true) {
                        e.left = (e.left + u.dst.left)
                    } else {
                        e.left = (e.left - u.dst.left)
                    }
                    if (u.dst.topadd === true) {
                        e.top = (e.top + u.dst.top);
                    } else {
                        e.top = (e.top - u.dst.top)
                    }
                    b = ((e.width) / c.stageWidth) * 100;
                    d = ((e.height) / c.stageHeight) * 100;
                    u.pd_t++;
                    u.pd_l++;
                    t.css({
                        'width': b + '%',
                        'height': d + '%',
                        'left': (e.left / c.stageWidth) * 100 + '%',
                        'top': (e.top / c.stageHeight) * 100 + '%'
                    });
                    c.slides[0].elements[i].prop.w = e.width;
                    c.slides[0].elements[i].prop.h = e.height;
                    c.slides[0].elements[i].prop.left = e.left;
                    c.slides[0].elements[i].prop.top = e.top;
                })
                c.transformHandler.reposition();
                c.domDocBody.removeClass('guiding resize');
                notify('obj.afterResize', {'obj': u.selc});
            }
        }
        this.init = function () {
            ele = document.body.appendChild(document.createElement('div'));
            ele.setAttribute('class', 'd-none transformer');
            ele.style.border = '1px dotted rgb(95, 97, 99)';
            ele = $(ele).resizable(config.resize).rotate({
                'rotate': function (o, i, s) {
                    i = (o.angle.current / Math.PI * 180);
                    if (c.transformHandler.rtL == 1) {
                        s = obj.attr('scope')
                        c.slides[0].elements[s].prop.r = i;
                        obj[0].style.transform = 'rotate(' + i + 'deg)';
                        return true;
                    }
                    $.each(c.currentSelection, function (id, e, l, r, o) {
                        e.removeClass('focus');
                        r = e.data('orgRotate');
                        if (i + r > r) {
                            l = (i + r) - r;
                            o = (r + l);
                        } else {
                            l = r - (i + r);
                            o = (r - l);
                        }
                        if (o >= 360) o = o - 360;
                        e[0].style.transform = 'rotate(' + o + 'deg)';
                        c.slides[0].elements[id].prop.r = o;
                    })
                }, 'start': function (o, i) {
                    c.transformHandler.rtL = 0;
                    $.each(c.currentSelection, function (i, e) {
                        e.addClass('focus');
                        e.data('orgRotate', (c.slides[0].elements[i].prop.r || 0));
                        c.transformHandler.rtL++;
                    })
                    i = Object.keys(c.currentSelection);
                    notify('obj.beforeRotate', {'obj': i});
                }, 'stop': function (i, o) {
                    $.each(c.currentSelection, function (id, e, l, r, o) {
                        e.removeClass('focus');
                    })
                    i = Object.keys(c.currentSelection);
                    notify('obj.afterRotate', {'obj': i});
                }
            }).draggable(config.drag).off('click.rp').on('click.rp', function (i) {
            }).on('dblclick', function () {
                if (scope && scope.prop.sym && ['button', 'text'].indexOf(scope.prop.sym) !== -1) {
                    obj.find('svg g:first').trigger('dblclick')
                }
            });
        }
        this.enable = function (el, sc, o) {
            sc = c.slides[0].elements[el.attr('scope')];
            if (sc == undefined) {
                this.disable();
                return;
            }
            if (sc.locked == true || sc.locked == 'true') return;
            el.off('click.rp').on('click.rp', function (i) {
                if (c.transformHandler.scope == null && c.currentActive) {
                    c.transformHandler.enable(c.currentActive);
                } else {
                    c.transformHandler.reposition();
                }
            })
            obj = el;
            scope = sc;
            this.reposition();
            ele.removeClass('d-none')
        }
        this.lock = function () {
            ele.addClass('d-none');
        }
        this.unlock = function () {
            ele.removeClass('d-none')
        }
        this.getCurrent = function () {
            return obj;
        }
        this.reposition = function (o, i, k) {
            if (!obj) return;
            i = false;
            if (c.currentSelection && Object.keys(c.currentSelection).length > 1) {
                o = real_boundary(c.currentSelection);
                i = true;
                ele.css('transform', '');
                ele.data('uiRotate').update(0);
            } else {
                obj.css('transform', '');
                o = obj.offset();
                o.width = obj.width();
                o.height = obj.height();
                o.r = obj[0]._gsTransform;
                if (o.r && o.r.rotation !== undefined) {
                    o.transform = 'rotate(' + (o.r.rotation) + 'deg)';
                    o.r = o.r.rotation;
                } else {
                    o.transform = 'rotate(' + (scope.prop.r | 0) + 'deg)';
                    o.r = scope.prop.r | 0;
                }
            }
            o.width = ((o.width / c.docWidth) * 100) + '%';
            o.height = ((o.height / c.docHeight) * 100) + '%';
            o.position = 'absolute';
            if (i == false) {
                obj.css('transform', o.transform)
                ele.data('uiRotate').update(o.r);
                delete o.r;
            }
            o.cursor = 'move';
            ele.css(o)
        }
        this.lockGrid = function () {
            if (c.obj_snapGrid == true) {
                config.drag.snap = '#viewport_stage_wrapper .objectBox';
            } else {
                config.drag.snap = false;
            }
            ele.draggable('destroy').draggable(config.drag);
        }
        this.lockAspect = function () {
            if (c.obj_lock == true) {
                config.resize.aspectRatio = true;
            } else {
                config.resize.aspectRatio = false;
            }
            ele.resizable('destroy').resizable(config.resize);
        }
        this.isHidden = function () {
            return (scope === null || scope === undefined)
        }
        this.disable = function () {
            ele.addClass('d-none');
            scope = null;
            obj = null;
        }
        this.init();
    }
    c.pushDownload = function (id, type, e) {
        e = parseInt(id);
        if ((isNaN(e) == false && typeof e == 'number') == false) {
            alertMessage('error', c.language('editor_ui_msg_saveall'));
            return;
        }
        if (!notify('workspace.beforeExport', {'ref': type})) return;
        workstate_export_progress = mdDialog(function (e, f) {
            this.footer = false;
            this.size = 'medium';
            this.status = null;
            this.title = '';
            this.content = '<h5>Exporting..</h5><div class="progress"><div aria-valuemax="100" aria-valuemin="0" aria-valuenow="1" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%;height:24px"></div></div>';
            this.onshow = function (e) {
                this.body = $(this.target + ' .modal-content').css('border', 'solid 3px #289bef').find('.modal-body')
                f = $(this.target + ' .modal-dialog').outerHeight();
                $(this.target).attr('id', 'workstate-export-progress').css({'overflow-y': 'hidden', 'z-index': 10001});
                this.body.prev().find('h4').after('<a href="#"><span class="fa fa-minus d-block w-100 text-right"></span></a>').next().click(function (e) {
                    e.preventDefault();
                    workstate_export_progress.close();
                })
            }
            this.onhide = function () {
                this.destroy();
                workstate_export_progress = undefined;
            }
            return this;
        })
        $.get(location.origin + '/print/' + btoa(id) + '.' + type, function (r) {
            if (workstate_export_progress) workstate_export_progress.body.find('.progress-bar').addClass('bg-success');
            window.setTimeout(function (e) {
                if (workstate_export_progress) workstate_export_progress.close();
                e = r.download;
                notify('workspace.afterExport', {'data': r});
                location.href = e;
            }, 500)
        }, 'json').fail(function (x, e, s) {
            if (x.responseJSON) {
                s = x.responseJSON;
            } else {
                s = {'err': c.language('editor_ui_msg_dataloaderr')};
            }
            if (workstate_export_progress) workstate_export_progress.close();
            if (s.err) {
                toastr['error'](s.err);
            } else if (s.info) {
                toastr['info'](s.info);
            }
        })
    }
    c.saveWork = function (e, cb, i, o) {
        if (!e) e = 'none';
        if (typeof cb !== 'function') {
            cb = $.noop;
        }
        if (!notify('workspace.beforeCompile')) return;
        o = {};
        o.d = [];
        o.f = {};
        o.type = e;
        o.w = c.domCanvas.width();
        o.h = c.domCanvas.height();
        o.df = c.domCanvas.children('div:visible:first').index();
        if (typeof workstate_save_progress == 'object' && workstate_save_progress.destroy) {
            workstate_save_progress.destroy();
            workstate_save_progress
        }
        workstate_save_progress = mdDialog(function (e, f) {
            this.footer = false;
            this.size = 'small';
            this.status = null;
            this.callback = cb;
            this.content = '<h5>Saving project..</h5><div class="progress"><div aria-valuemax="100" aria-valuemin="0" aria-valuenow="1" class="progress-bar progress-bar-striped" role="progressbar" style="width: 1%"></div></div>';
            this.onshow = function (e) {
                $(this.target + ' .modal-content').css('border', 'solid 3px #289bef')
                e = $(this.target + ' .modal-dialog').addClass('m-0').outerWidth();
                f = $(this.target + ' .modal-dialog').outerHeight();
                $(this.target).attr('id', 'workstate-save-progress').css({
                    'width': e,
                    'position': 'absolute',
                    'bottom': 'auto',
                    'right': 'auto',
                    'height': f,
                    'overflow-y': 'hidden',
                    'top': c.domEditorSubHeader.position().top,
                    'left': c.domSidebarToggle.width() * 2
                });
            }
            this.onhide = function () {
                this.callback(workstate_save_progress.status);
                this.destroy();
                workstate_save_progress = undefined;
            }
            return this;
        })
        o.tween = c.TL.exportAll();
        for (i = 0; c.slides.length > i; i++) {
            o.b = {};
            o.b.bg = $.extend(true, {}, c.slides[i].background);
            o.b.e = [];
            if (o.b.bg.gradient !== undefined) {
                o.e = o.b.bg.gradient;
                if (typeof o.e !== 'object') {
                    o.b.bg.gradient = c.bg_gradients_native[o.b.bg.gradient];
                    o.b.bg.gradient.ref = o.e;
                }
            }
            c.domCanvas.children().hide(0);
            o.pr = c.domCanvas.children('div:eq(' + i + ')').show(0)[0].getBoundingClientRect();
            o.ps = c.domSlidesWrapper.find('.view_slide_item:eq(' + i + ') > .card-block > .row > div[scope]');
            o.po = c.slides[i].elements;
            o.lt = Object.values(o.po).length;
            o.ps.each(function (id, ii, e, p, eb) {
                id = $(this).attr('scope');
                e = $.extend(true, {}, o.po[id]);
                ii = $(this).index();
                o.a = c.domCanvas.children('div:eq("' + i + '")').find('div.objectBox[scope="' + e.id + '"]')
                o.ab = o.a.find('> .object');
                if (o.a.length == 0) return;
                if (e.svgfxOb) {
                    delete e.svgfxOb;
                }
                if (o.a.hasClass('invisible')) {
                    e.noshow = 1;
                } else {
                    e.noshow = 0;
                }
                e.nouse = 0;
                e.prop.z = (o.lt - ii);
                delete e.tween;
                if (c.idCache[e.prop.uid]) {
                    e.prop.fxPriority = c.idCache[e.prop.uid].fx.toArray();
                } else {
                    delete e.prop.fxPriority;
                }
                eb = o.a[0].getBoundingClientRect();
                e.bounded = Number((eb.right >= o.pr.left && eb.left <= o.pr.right) && (eb.bottom >= o.pr.top && eb.top <= o.pr.bottom));
                if (typeof o.tween[e.id] == 'object') {
                    e.tween = o.tween[e.id];
                }
                if (e.bounded == false || e.noshow == true) {
                    e.nouse = 1;
                }
                if (e.tween) {
                    e.nouse = 0;
                }
                p = real_offset(o.a, c.domCanvas.children('div:eq("' + i + '"):visible'));
                e.prop.left = p.leftab;
                e.prop.top = p.topab;
                e.prop.w = p.widthab;
                e.prop.h = p.heightab;
                o.x_op = o.a.find('.object > svg').css('opacity');
                o.x_op = parseFloat(o.x_op);
                if (!isNaN(o.x_op)) {
                    e.prop.opacity = (10 / 1) * o.x_op;
                }
                o.x_gtfm = o.a[0]._gsTransform;
                if (o.x_gtfm && o.x_gtfm.rotation !== undefined) {
                    e.prop.r = o.x_gtfm.rotation;
                }
                o.x_gtfm = o.ab[0]._gsTransform;
                if (o.x_gtfm && o.x_gtfm.scaleX !== undefined) {
                    e.prop.qsc = o.x_gtfm.scaleX;
                } else {
                    delete e.prop.qsc;
                }
                if (e.prop.r) {
                    p = o.ab.get(0).getBoundingClientRect();
                    e.prop.rw = {'height': p.height, 'width': p.width, 'x': p.x, 'y': p.y};
                }
                if (e.alias == 'texts') {
                    o.f[e.prop.font + '_' + e.prop.type] = 1;
                }
                if (e.alias == 'buttons') {
                    o.f[e.prop.text.font + '_' + e.prop.text.type] = 1;
                }
                o.b.e.push(e);
            })
            o.d.push(o.b);
        }
        o.d = {'s': o.d, 'f': o.f}
        c.domCanvas.children('div:eq(' + o.df + ')').show(0).siblings().hide(0);
        if (c.IDmeta) {
            o.d.meta = c.IDmeta;
        }
        if (c.ID && c.ID > 0) {
            o.d.ref = c.ID;
        }
        o.b = {};
        o.b.param = {'s': c.width + 'x' + c.height};
        o.b.param = $.param(o.b.param);
        o.d.s = JSON.stringify(o.d.s);
        if (!notify('workspace.afterCompile', {'data': o.d})) {
            workstate_save_progress.destroy();
            return o.d;
        }
        if (!notify('workspace.beforeSave', {'ref': e})) return;
        $.ajax({
            'type': 'POST',
            'url': location.origin + '/compile/compile.php?' + o.b.param + '&t=' + o.type,
            'dataType': 'json',
            'data': o.d,
            'ex_type': o.type
        }).done(function (r, s, x) {
            $(workstate_save_progress.target + ' .modal-body .progress > .progress-bar').addClass('bg-success').css('width', '100%');
            s = parseInt(r.ID);
            if (s !== c.ID) {
                window.history.replaceState('', '', '/edit?q=' + s)
            }
            c.ID = s;
            x = this;
            c.sessionKey = c.LastSaveStamp;
            workstate_save_progress.status = true;
            if (!r.response) return;
        }).fail(function (x) {
            if (c.IDmeta && c.ID === -1) {
            }
            if (x.responseJSON) {
                s = x.responseJSON;
            } else {
                s = {'error': {'message': c.language('editor_ui_msg_failedop')}};
            }
            if (s.error) {
                toastr.error(s.error.message);
            } else {
                toastr.error(c.language('editor_ui_msg_savepaused'));
            }
            workstate_save_progress.status = false;
        }).always(function (x, s) {
            notify('workspace.afterSave', {'status': s});
            $(workstate_save_progress.target).fadeOut(500, function () {
                workstate_save_progress.close();
            })
        })
    }
    c.buildObject = function (type, ref, a) {
        a = c.domCanvas.children('div:visible:first');
        $('<div style="width:10px;height:10px"></div>').css({'position': 'absolute'}).appendTo(a);
        s = a.children(':last').data({'object': type, 'object-ref': ref})
        s.position({'my': 'top left', 'at': 'center center', 'of': a});
        return s;
    }
    c.getConnection = function () {
        $.post(location.origin + '/connection.html?v1=1').always(function (e, s, x) {
            s = c.netWorkStatus;
            if (x.status == undefined || s == 'error') {
                c.netWorkStatus = false;
            } else {
                c.netWorkStatus = true;
                c.getConnection();
            }
            if (c.netWorkStatus === s && c.netWorkStatus !== false) {
                return;
            }
            if (c.netWorkStatus == false) {
                c.domStatusNetworkState.removeClass('text-success').addClass('text-danger')
            } else {
                c.domStatusNetworkState.removeClass('text-danger').addClass('text-success')
            }
            notify('net.afterCheck');
        })
    }
    c.injectElement = function (obj, cb, p, opt, o, r) {
        o = {};
        o.svg = document.createElement('div');
        o.g = o.svg.appendChild(document.createElement('div'))
        if (obj.prop.r !== undefined) {
            o.svg.style.transform = 'rotate(' + obj.prop.r + 'deg)';
        }
        if (obj.prop.flip !== undefined) {
            applyPropertyOption(o.g, {'flip': obj.prop.flip});
        }
        obj.prop.opacity = 10;
        if (obj.prop.sym) {
            if (obj.prop.sym == 'mysvgshapes') {
                $.ajax({
                    'url': obj.prop.ref + '.svg?' + Math.random(),
                    'type': 'GET',
                    'opt': obj,
                    'dataType': 'html',
                    'el': o.svg,
                    'cb': cb
                }).done(function (r, fx) {
                    r = $(r).filter('svg').first();
                    r.attr('preserveAspectRatio', 'none').css({'width': '100%', 'height': '100%'})
                    $(this.el).find('> div:last').empty().append(r);
                    fx = new c.svgFxOb;
                    fx.init(r);
                    fx.loadAll(this.opt.prop);
                    fx.applyAll();
                    if (typeof this.cb == 'function') this.cb(this.el);
                })
            } else {
                r = smartDrawing(obj.prop);
            }
        } else if (obj.alias == 'images') {
            r = new Image;
            r.el = o.g;
            r.cb = cb;
            r.onload = function (e, s) {
                e = $(this.el);
                e.find('image').attr({'xlink:href': this.src})
                s = e.parent().get(0);
                if (typeof this.cb == 'function') this.cb(s);
            }
            r.src = obj.prop.src;
            r = '<svg width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><image width="100%" height="100%" preserveAspectRatio="none" xlink:href="assets/img/loader.gif"   /><rect class="layer" y="0" x="0" width="100%" height="100%" fill="none" /></svg>';
        } else {
            o.sr = obj.prop.src.split('/');
            $.ajax({
                'url': c.policySetup.PUBLIC_SHAPE_REPO + '/library/shapes/' + o.sr[0] + '/svg/' + o.sr[1] + '.svg',
                'dataType': 'html',
                'el': o.g,
                'opt': obj,
                'cb': cb
            }).done(function (r, fx, s) {
                r = $(r).filter('svg').first();
                r.attr('preserveAspectRatio', 'none').css({'width': '100%', 'height': '100%'})
                s = $(this.el).empty().append(r).parent();
                fx = new c.svgFxOb;
                fx.init(r);
                fx.loadAll(this.opt.prop);
                fx.applyAll();
                if (typeof this.cb == 'function') this.cb(s);
            })
        }
        if (p) {
            $(p).append(o.svg);
        }
        if (typeof opt == 'object') $(o.svg).data('data-heap', opt);
        if (r) {
            r = $(r).filter('svg').first();
            $(o.g).append(r);
            fx = new c.svgFxOb;
            fx.init(r);
            fx.loadAll(obj.prop);
            fx.applyAll();
            if (obj.alias !== 'images' && typeof cb == 'function') {
                cb(o.svg);
            }
        }
        return o.svg;
    }
    c.connectDropbox = function (cb, o) {
        o = localStorage.getItem('oauth_dropkey');
        if (typeof o == 'string' && o.length > 3) {
            if (typeof cb == 'function') {
                cb(o);
            }
            return;
        }
        c.dropbox_oauth = {};
        c.dropbox_oauth.i = 0;
        c.dropbox_oauth.cb = 'jbgetkey_' + ($.now());
        if (typeof cb == 'function') c.dropbox_oauth.successCallback = cb;
        window[c.dropbox_oauth.cb] = function (key, win) {
            delete window[c.dropbox_oauth.cb];
            win.close();
            $.get(location.origin + '/plugin/dropbox_capture/get.php?q=' + key, function (r) {
                if (r.key && r.key.length > 0 && r.key == key) {
                    localStorage.setItem('oauth_dropkey', r.key);
                    toastr.success(c.language('editor_ui_msg_conok'));
                    if (c.dropbox_oauth.successCallback) c.dropbox_oauth.successCallback(r.key)
                } else if (c.dropbox_oauth.successCallback) {
                    c.dropbox_oauth.successCallback(false)
                }
                delete c.dropbox_oauth;
            }, 'json').fail(function () {
                if (c.dropbox_oauth.successCallback) c.dropbox_oauth.successCallback(false);
                toastr.error(c.language('editor_ui_msg_conno'));
                delete c.dropbox_oauth;
            }).alway(function () {
                delete c.dropbox_oauth;
            })
        }
        window.open(location.origin + '/plugin/dropbox_capture/oauth.php?callback=' + c.dropbox_oauth.cb, 'dropbox_oauth', 'width=626,height=436,toolbar=0');
    }
    c.shareOption = function (id, e) {
        if (c.shareDialog) c.shareDialog.close();
        e = parseInt(id);
        if ((isNaN(e) == false && typeof e == 'number') == false) {
            alertMessage('error', c.language('editor_ui_msg_saveall'));
            return;
        }
        mdDialog(function () {
            this.size = 'medium';
            this.title = c.language('editor_ui_shrwin_head');
            this.id = id;
            this.selectUsers = function () {
                openContacts(function (r) {
                    if (r.length == 0) return;
                    c.shareDialog.btn.find('span.fa').remove();
                    c.shareDialog.btn.attr('disabled', true).append('<span class="fa fa-spin fa-spinner ml-1"></span>');
                    c.shareDialog.request = $.post(location.origin + '/editor/project.php?t=share', {
                        'n': c.shareDialog.id,
                        'o': r
                    }, function (r) {
                        c.shareDialog.refreshList(r)
                    }, 'json').always(function () {
                        c.shareDialog.btn.find('span.fa').remove();
                        c.shareDialog.btn.removeAttr('disabled');
                    });
                })
            }
            this.refreshList = function (r, e) {
                e = this.box.empty();
                if (r.length == 0) {
                    e.html('<div class="alert alert-info col-12"><p>' + c.language('editor_ui_shrwin_noinfo') + '</p></div>');
                    return;
                }
                $.each(r, function (i) {
                    i = $('<div class="col-11 item card-header bg-faded"><span class="title">' + this.name + '</span><span class="fa fa-close float-right" style="cursor:pointer"></span></div>');
                    e.append(i);
                    i.data('id', this.id);
                })
            }
            this.oninit = function () {
                this.body = $(this.target + ' .modal-body');
                this.body.parents('.modal-dialog:first').addClass('bg-current');
                this.body.parents('.modal').css('zIndex', '99999');
                c.shareDialog = this;
                this.body.append('<div class="card-block p-0"><p class="m-0 p-0 d-inline"><span class="fa fa-stack fa-folder fa-2x" style="width:auto"></span> <span class="ml-2">Project ' + this.id + '</span></p><button disabled class="btn btn-outline-primary float-right">' + c.language('editor_ui_shrwin_selbtn') + ' <span class="fa fa-plus"></span></button></div>')
                this.body.append('<div class="card-block"><div class="row fancyscroll scroll-y">' + loader + '</div></div>');
                this.box = this.body.find('> div.card-block:last > .row:last').css('maxHeight', '400px').on('click', '.item > span.fa-close', function (e) {
                    e = $(this);
                    e.removeClass('fa-close').addClass('fa-spin fa-spinner');
                    i = e.parent().data('id')
                    c.shareDialog.request = $.ajax({
                        'url': location.origin + '/editor/project.php?t=unshare',
                        'type': 'POST',
                        'data': {'n': c.shareDialog.id, 'o': [i]},
                        'el': e
                    }).done(function (i) {
                        i = this.el.parent().siblings('.item')
                        i.filter(this.el.parent()).remove();
                        if (i.length == 0) {
                            c.shareDialog.box.html('<div class="alert alert-info col-12"><p>' + c.language('editor_ui_shrwin_noinfo') + '</p></div>');
                        }
                    }).always(function () {
                        this.el.removeClass('fa-spin fa-spinner').addClass('fa-close')
                    })
                })
                this.btn = this.body.find('> div.card-block:first > button:last').on('click', function () {
                    c.shareDialog.selectUsers();
                })
                this.request = $.get(location.origin + '/editor/project.php?t=sharing&n=' + this.id, function (r, e, o) {
                    if (r.length == 0) {
                        c.shareDialog.box.html('<div class="alert alert-info col-12"><p>' + c.language('editor_ui_shrwin_noinfo') + '</p></div>');
                    } else {
                        c.shareDialog.refreshList(r)
                    }
                }, 'json').fail(function () {
                    c.shareDialog.box.html('<div class="alert alert-danger col-12"><p>' + c.language('editor_ui_nodata') + '</p></div>');
                }).always(function () {
                    c.shareDialog.btn.removeAttr('disabled');
                })
            }
            this.onhide = function () {
                delete c.shareDialog;
                this.request.abort();
                this.destroy();
            }
            return this;
        })
    }
    c.teamOption = function () {
        if (c.teamDialog) c.teamDialog.destroy();
        if ((c.UserProfile.membership.permit.indexOf('22') !== -1 && c.UserProfile.membership.permit.indexOf('24') !== -1) == false) {
            c.editorSDK.gui.alert(c.language('editor_ui_msg_permlock'));
            return;
        }
        mdDialog(function () {
            this.title = 'Manage outsource team';
            this.size = 'medium';
            this.onhide = function () {
                if (this.request) this.request.abort();
                this.destroy();
                delete c.teamDialog;
            }
            this.renderList = function (r, e) {
                this.list = r;
                if (r.length == 0) {
                    c.teamDialog.box.html('<div class="alert alert-danger col-12"><p>' + c.language('editor_ui_msg_dataloadempty') + '</p></div>');
                    return;
                }
                this.box.empty();
                $.each(r, function (i) {
                    i = $('<div class="col-11 item card-header bg-faded"><span class="title">' + this.email + '</span><span class="fa fa-close float-right" style="cursor:pointer"></span></div>');
                    c.teamDialog.box.append(i);
                    i.data('id', this.id);
                })
            }
            this.oninit = function () {
                c.teamDialog = this;
                this.body = $(this.target + ' .modal-body');
                this.body.parents('.modal-dialog:first').addClass('bg-current');
                this.body.parents('.modal').css('zIndex', '99999');
                this.body.append('<div class="text-right"><button class="btn btn-primary">Add outsourcer</button></div><div class="card-block"><div class="row fancyscroll scroll-y">' + loader + '</div></div>');
                this.box = this.body.find('.row:last').css('maxHeight', '400px').on('click', '.item > span.fa-close', function () {
                    e = $(this);
                    e.removeClass('fa-close').addClass('fa-spin fa-spinner');
                    i = e.parent().data('id')
                    c.teamDialog.request = $.ajax({
                        'url': location.origin + '/editor/team.php?t=unlink',
                        'type': 'POST',
                        'data': {'o': i},
                        'el': e
                    }).done(function (i) {
                        i = this.el.parent().siblings('.item')
                        i.filter(this.el.parent()).remove();
                        if (i.length == 0) {
                            c.teamDialog.box.html('<div class="alert alert-info col-12"><p>' + c.language('editor_ui_msg_dataloadempty') + '</p></div>');
                        }
                    }).fail(function () {
                        toastr.error(c.language('editor_ui_msg_failedop'));
                    }).always(function () {
                        this.el.removeClass('fa-spin fa-spinner').addClass('fa-close')
                    })
                })
                this.body.find('button:first').click(function () {
                    c.editorSDK.gui.prompt(c.language('editor_ui_msg_emailconf'), function (v) {
                        c.loading = c.editorSDK.gui.loading();
                        c.teamDialog.request = $.post(location.origin + '/plugin/sharer/invite.php', {
                            'r': v,
                            'q': 1
                        }, function () {
                            toastr.info(c.language('editor_ui_msg_ivok'))
                        }).fail(function () {
                            toastr.error(c.language('editor_ui_msg_failedop'));
                        }).always(function () {
                            c.loading.close();
                            delete c.loading;
                        })
                    })
                })
                this.request = $.get(location.origin + '/editor/team.php', function (r) {
                    c.teamDialog.renderList(r);
                }, 'json').fail(function () {
                    c.teamDialog.box.html('<div class="alert alert-danger col-12"><p>' + c.language('editor_ui_nodata') + '</p></div>');
                }).always(function () {
                    delete c.teamDialog.request;
                });
            }
            return this;
        })
    }
    openContacts = function (cb, selection, f) {
        f = function () {
            this.title = c.language('editor_ui_shrwin_selhead');
            this.size = 'medium';
            this.selected = [];
            this.callback = cb;
            if (selection) {
                this.pre = selection;
            }
            this.onhide = function () {
                if (typeof this.callback == 'function') {
                    this.callback((this.selected));
                }
                this.destroy();
            }
            this.oninit = function () {
                this.md = $(this.target).css('zIndex', 99999);
                c.contactsWin = this;
                this.body = this.md.find('.modal-body:first').addClass('bg-faded').css({'maxHeight': 400}).addClass('fancyscroll scroll-y')
                this.body.next().find('button').removeClass('d-none btn-secondary btn-sm').addClass('btn-primary btn-block').text(c.language('editor_ui_shrwin_save'))
                this.body.on('click', '.card-header', function (e, id) {
                    e = $(this);
                    id = e.data('id');
                    if (e.data('selected')) {
                        e.css('background', '#fff').removeData('selected');
                        c.contactsWin.selected.splice(gui.win['contacts'].selected.indexOf(id), 1)
                    } else {
                        e.css('background', '#93c8ff').data('selected', true);
                        c.contactsWin.selected.push(id)
                    }
                })
            }
            this.onshow = function (e, i) {
                for (i = 0; c.contacts.length > i; i++) {
                    e = $('<div style="cursor:pointer;border-bottom:solid 1px #afabab;background:#fff" class="card-header py-1 mb-1"><p class="m-0 d-inline-block"><span class="fa fa-stack"><i class="fa fa-caret-right fa-2x"></i></span><span class="title">' + c.contacts[i].name + '</span><br><span class="text-current ml-4">' + c.contacts[i].email + '</span></p><p class="m-0 ml-4 text-danger">' + c.contacts[i].t + ' projects</p></div>')
                    this.body.append(e);
                    e.data('id', c.contacts[i].id);
                    if (this.pre && this.pre.indexOf(c.contacts[i].id) != -1) {
                        e.css('background', '#93c8ff').data('selected', true);
                        this.selected.push(c.contacts[i].id);
                    }
                }
            }
        }
        $.ajax({
            'url': location.origin + '/plugin/sharer/load.php',
            'dataType': 'json',
            'cb': f,
            'loader': bigloader()
        }).done(function (r) {
            c.contacts = r;
            mdDialog(this.cb)
        }).always(function () {
            this.loader.close();
        })
    }
    c.language = function (n) {
        if (c.languageConf[n] !== undefined) return c.languageConf[n];
        return n;
    }

    function doPrinterCron() {
        return;
        window.setTimeout(function () {
            $.ajax({
                'url': location.origin + '/exec/print.php',
                'timeout': 1000,
                'dataType': 'json'
            }).always(function () {
                doPrinterCron();
            })
        }, 30000)
    }

    function timeline() {
        var storage = {};
        storage.self = this;
        this.init = function () {
            storage.dom = {};
            storage.dom.timeline = c.domTimeline;
            storage.dom.playtools = storage.dom.timeline.find('> .timecode .playtools:first');
            storage.dom.timecode = storage.dom.playtools.next('.timestamp:first').find('input:first');
            storage.dom.duration = storage.dom.timecode.next('input');
            storage.dom.toolbar = storage.dom.playtools.nextAll('.cuetools:first').find('button[data-timeline-cmd]')
            storage.dom.actionbar = storage.dom.playtools.nextAll('.action:first').find('button');
            storage.dom.playtools = storage.dom.playtools.find('.btn-group > button.btn[data-timeline-cmd]');
            storage.dom.layers = storage.dom.timeline.find('> .sequence .layers:first');
            storage.dom.info = storage.dom.layers.next('.info');
            storage.dom.sequence_w = storage.dom.info.next('.timestamp');
            storage.dom.sequence = storage.dom.sequence_w.find('div:last');
            storage.dom.progress = storage.dom.sequence.prev('.playhead');
            storage.dom.zoomtool = storage.dom.timeline.find('> .timecode .scale:first');
            storage.zoomscale = 1;
            storage.sequenceWidth = storage.fakeWidth = storage.dom.sequence[0].scrollWidth
            storage.playHead = 0;
            storage.state = 0;
            storage.gcbin = {};
            storage.TweenBin = {};
            storage.updated = storage.isReady = false;
            storage.tick = 0;
            storage.maxTime = parseFloat(c.policySetup.MAX_MOTION_TIME) / 1000;
            storage.animator = new TimelineMax({
                'paused': true, 'useFrames': false, 'onUpdate': function (n) {
                    n = storage.animator.time();
                    if (n >= storage.maxTime) storage.self.stop()
                    storage.self.progress(n);
                }, 'onStart': function (data, i) {
                    data = (storage.animator.getChildren());
                    if (data.length > 0) {
                        for (i = 0; data.length > i; i++) {
                            if (data[i].data && data[i].data.type === 'path') {
                                data[i].data.el.removeAttribute('d');
                            } else if (data[i].data && data[i].data.type == 'typo') {
                                $(data[i].data.el).children('tspan').css('opacity', 0).addClass('ned')
                            }
                        }
                    }
                    c.transformHandler.disable();
                    notify('timeline.afterPlay');
                }, 'onComplete': function () {
                    storage.self.stop();
                    notify('timeline.afterStop');
                }, 'onReverseComplete': function () {
                    storage.self.stop();
                }
            })
            Events.on('shortcutevents.32', 'after', function (u, play) {
                if (event) {
                    event.preventDefault();
                }
                play = false;
                if (Math.round(storage.playHead) >= Math.round(storage.self.getTotalTime())) {
                    storage.self.seek(0);
                    play = true;
                }
                if (storage.animator.paused()) {
                    play = true;
                } else {
                    storage.self.pause();
                }
                if (play == true) {
                    bigloader();
                    notify('timeline.beforePlay');
                    window.setTimeout(function () {
                        c.bigSpinnrer.close();
                        storage.self.play();
                    }, 500)
                }
            })
            Events.on('workspace.objectselect.timeline', 'after', function (e) {
                if (c.currentActive == undefined) return;
                e = c.currentActive.attr('id');
                if (!e) return;
                e = e.substr(2);
                storage.self.selectLayer(e);
            })
            Events.on('editor.resize.timeline', 'after', function () {
                c.domTimeline.css('width', (c.domWindow.width() - c.domSidebarWrapper.outerWidth() - c.domSidebarToggle.outerWidth() - 90));
                storage.sequenceWidth = storage.dom.sequence[0].scrollWidth;
                storage.fakeWidth = storage.sequenceWidth;
                storage.self.progress(storage.playHead);
            })
            Events.on('workspace.objectdeselect.timeline', 'after', function () {
                storage.self.selectLayer();
            })
            Events.on('workspace.objectcreate.timeline', 'after', function (e) {
                if (storage.recording === true) {
                    storage.state = 0;
                }
                storage.self.createFromObject(e.obj);
                if (storage.recording === true) {
                    o = getCurrentValues(e.obj.id);
                    storage.recorderSessionVamp[e.obj.prop.uid] = o;
                    storage.state = -1;
                }
            })
            Events.on('obj.del.timeline', 'before', function (e, id) {
                storage.gcbin.tmdelobj = [];
                e = e.obj;
                if (typeof e !== 'object') {
                    e = [e]
                }
                $.each(e, function (i, e) {
                    id = e.substr(e.lastIndexOf('_') + 1);
                    e = c.slides[id].elements[e];
                    if (e.prop.locked == true) return;
                    storage.self.remove(e.prop.uid);
                })
            })
            Events.on('workspace.undo.timeline', 'after', function (scope, p) {
                p = scope.e + '.' + scope.ev;
                if (p == 'obj.del' || p == 'obj.create') {
                    storage.self.createFromScene();
                } else if (p == 'obj.rename') {
                    this.id = scope.before.param.id.substr(scope.before.param.id.lastIndexOf('_') + 1);
                    this.e = c.slides[this.id].elements[scope.before.param.id];
                    storage.self.createFromObject(this.e);
                }
            })
            Events.on('obj.*.timeline', 'after', function (e, p) {
                if (this.event == 'obj.del') {
                    return;
                } else if (this.event == 'obj.rename') {
                    for (i = 0; storage.sequence.length > i; i++) {
                        p = storage.sequence[i];
                        if (p.scope.getAttribute('scope') === e.obj) {
                            p = e.obj.substr(e.obj.lastIndexOf('_') + 1);
                            p = c.slides[p].elements[e.obj];
                            if (p.name && typeof p.name == 'string' && p.name.length > 0) {
                                storage.sequence[i].e.find('> span:first').text(p.name);
                            }
                            break;
                        }
                    }
                    return;
                }
                if (['obj.resize', 'obj.move', 'obj.rotate', 'obj.fx'].indexOf(this.event) === -1) return;
                if (this.event == 'obj.fx' && !(e.ref == 'opacity' || e.ref == 'border')) return;
                if (storage.recording === true) {
                    computeRecording(e);
                    return;
                }
                p = e;
                e = storage.self.getActiveCuePointTween();
                if (!e) {
                    p = p.obj;
                    if (typeof p !== 'object') p = [p];
                    $.each(storage.sequence, function (e) {
                        if (this.keys.length === 0) return;
                        e = this.scope.getAttribute('scope');
                        if (p.indexOf(e) === -1) return;
                        getLayerDefault(this.id, true)
                    })
                    return;
                }
                p = queryLayerObject(storage.self.cues[e.cueID].parent);
                if (this.event == 'obj.fx' && this.arguement.ref == 'border') {
                    storage.self.updateCuePointTween(e.cueID, e.point, {
                        'strokeWidth': p.prop.border.size,
                        'strokeDasharray': p.prop.border.offset
                    })
                } else if (this.event == 'obj.move') {
                    storage.self.updateCuePointTween(e.cueID, e.point, {'left': p.prop.left, 'top': p.prop.top})
                } else if (this.event == 'obj.resize') {
                    storage.self.updateCuePointTween(e.cueID, e.point, {
                        'left': p.prop.left,
                        'top': p.prop.top,
                        'width': p.prop.w,
                        'height': p.prop.h
                    })
                } else if (this.event == 'obj.fx' && this.arguement.ref == 'opacity') {
                    storage.self.updateCuePointTween(e.cueID, e.point, {'fillOpacity': p.prop.opacity})
                } else if (this.event == 'obj.rotate') {
                    storage.self.updateCuePointTween(e.cueID, e.point, {'rotation': p.prop.r})
                }
            })
            storage.dom.zoomtool.find('input:first').ionRangeSlider({
                'max': 100,
                'min': 0,
                'hide_min_max': true,
                'hide_from_to': true,
                'grid': false,
                'from': 1,
                'onChange': function (e) {
                    storage.zoomscale = 20 * e.from;
                    window.clearTimeout(storage.sliderVar);
                    storage.sliderVar = window.setTimeout(function (e) {
                        storage.sequenceWidth = storage.fakeWidth + storage.zoomscale;
                        storage.dom.info.css('width', storage.fakeWidth + storage.zoomscale);
                        storage.dom.sequence.css('width', storage.fakeWidth + storage.zoomscale)
                        storage.self.progress(storage.playHead);
                    }, 500)
                }
            });
            storage.dom.progress.draggable({
                'axis': 'x', 'drag': function (e, u) {
                    u.i = ((u.position.left) / storage.sequenceWidth) * 100;
                    storage.self.progress(u.i);
                    storage.self.seek(u.i)
                }, 'start': function () {
                }
            }).on('mouseup.grabing', function () {
                if (!storage.switches.grab_started) return;
                storage.dom.sequence.trigger('mouseup.grabbing')
            })
            storage.dom.sequence.on('mousedown.grabbing', function (e) {
                if (storage.switches.grab !== true) return;
                if (!storage.activeCueList && storage.self.activeCue) {
                    storage.activeCueList = [storage.self.activeCue];
                }
                if (!storage.activeCueList) return;
                if (storage.activeCueList.length == 0) return;
                e.stopPropagation();
                storage.switches.grab_moving = false;
                window.clearTimeout(storage.switches.grab_timer);
                storage.switches.grab_timer = window.setTimeout(function () {
                    storage.switches.grab_started = true;
                }, 100)
            })
            storage.dom.sequence.on('mousemove.grabbing', function (e, o, i) {
                if (storage.switches.grab !== true) return;
                if (!storage.switches.grab_started) return;
                if (storage.activeCueList.length == 0) return;
                storage.switches.grab_moving = true;
                o = {};
                o.x = e.pageX - storage.dom.sequence.offset().left;
                o.x = (o.x / storage.sequenceWidth) * 100;
                storage.self.progress(o.x);
                ph = storage.playHead;
                for (i = 0; storage.activeCueList.length > i; i++) {
                    o.e = storage.activeCueList[i];
                    if (!storage.self.cues[o.e]) continue;
                    o.t = ph;
                    storage.self.cues[o.e].e.css('left', o.t + '%');
                    if (storage.activeCueList[i + 1]) {
                        o.f = storage.activeCueList[i + 1];
                        o.i = storage.self.cues[o.f].cue - (storage.self.cues[o.e].cue)
                        ph += o.i;
                    }
                    storage.self.cues[o.e].cue = o.t;
                }
            }).on('mouseup.grabbing', function (i, e, o) {
                if (!storage.switches.grab_started) return;
                storage.switches.grab_started = false;
                storage.switches.grab_moving = false;
                updated();
            })
            storage.dom.sequence.on('click', '.cue', function (e) {
                e.preventDefault();
                e.stopPropagation();
                storage.self.selectCue(this.id);
                if (storage.self.activeCue == this.id) {
                    storage.self.selectCuePoint(this.id, 'in');
                }
            }).on('keydown', '.cue', function () {
            }).on('click', '> .layers', function (e, o) {
                if ($(e.target).hasClass('layers') == false) return;
                if (storage.switches.picker === true) return;
                $(this).children('.cue').each(function () {
                    $(this).removeClass('ui-selected')
                })
                o = {};
                o.x = e.pageX - storage.dom.sequence.offset().left;
                o.x = (o.x / storage.sequenceWidth) * 100;
                storage.self.addCue(this.id, o.x, 3);
            }).selectable({
                'filter': '.cue', 'delay': 5, 'disabled': true, 'start': function () {
                    storage.activeCueList = [];
                    if (storage.self.activeCue !== null) storage.activeCueList.push(storage.self.activeCue);
                }, 'selected': function (e, u) {
                    storage.activeCueList.push(u.selected.id);
                }, 'stop': function () {
                    if (!storage.activeCueList) return;
                    storage.activeCueList.sort(function (a, b) {
                        return storage.self.cues[a].cue > storage.self.cues[b].cue;
                    })
                }
            })
            storage.dom.layers.on('click', '.layer[id]', function () {
                storage.self.activate(this.id);
            })
            storage.dom.cuepallete = $('<span />');
            storage.g2 = [];
            for (i = 0; c.anime_types.length > i; i++) {
                storage.ii = c.anime_types[i];
                storage.g = $.map(storage.ii.items, function (e) {
                    return '<a href="#" class="border-0" label="' + e.title + '" value="' + e.key + '"> ' + e.title + '</a>';
                });
                storage.g2.push('<strong style="font-weight:bold" class="mb-2 d-block b-b">' + storage.ii.title + '</strong>' + storage.g.join(''));
            }
            storage.dom.cuepallete.menu({
                'items': storage.g2, 'init': function (e, u) {
                    u.menu.find('.menu ul > li').each(function () {
                        $(this).addClass('ml-3');
                    }).find('a[value]').click(function (e, v, i, k, b) {
                        e = $(this);
                        v = e.attr('value');
                        if (storage.dom.cuepallete.layers) {
                            e = storage.dom.cuepallete.layers
                        } else {
                            e = storage.dom.cuepallete.element.parents('div.layer[id]').attr('id');
                            e = [e]
                        }
                        b = [];
                        for (i = 0; e.length > i; i++) {
                            k = exppressAnimationLoop(v, e[i], e.length - i);
                            if (!k) continue;
                            b.push({'l': e[i], 'o': k})
                        }
                        storage.dom.cuepallete.hide();
                        if (storage.dom.cuepallete.layers) {
                            delete storage.dom.cuepallete.layers;
                        }
                        if (b.length > 0) {
                            storage.dom.cuepallete.apply(b)
                        }
                    })
                }
            })
            storage.dom.cuepallete = storage.dom.cuepallete.menu('widget');
            storage.dom.cuepallete.apply = function (o) {
                mdDialog(function () {
                    this.size = 'small';
                    this.o = o;
                    this.title = '';
                    this.content = '<div><label>Play reverse</label><input type="checkbox" id="reverse" /></div><div><label>Use opacity</label><input type="checkbox" id="opacity" /></div>';
                    this.displayMode = 0;
                    this.onhide = function () {
                        this.destroy();
                    }
                    this.applyTween = function (o, i) {
                        o = this.o;
                        for (i = 0; o.length > i; i++) {
                            if (this.opacity == true && !o[i].o.tween.loop) {
                                ;o[i].o.tween.fillOpacity = [0, prepareCuePointValue(o[i].o.scope.prop.opacity, 'fillOpacity')];
                            }
                            if (this.reverse === true && o[i].o.tween.loop) {
                                o[i].o.tween.loop = $.extend([], o[i].o.tween.loop);
                                o[i].o.tween.loop.reverse();
                            } else if (this.reverse == true) {
                                $.each(o[i].o.tween, function (k, e) {
                                    if (['left', 'top', 'rotation', 'scaleX', 'scaleY', 'fillOpacity', 'height', 'width'].indexOf(k) === -1) return;
                                    o[i].o.tween[k].reverse();
                                })
                            }
                            for (o.i = 0; o[i].o.tweenLoop > o.i; o.i++) {
                                if (o[i].o.tween.loop && o[i].o.tween.loop[o.i].duration !== undefined) {
                                    o.cueID = storage.self.addCue(o[i].l, o[i].o.start, o[i].o.tween.loop[o.i].duration);
                                    delete o[i].o.tween.loop[o.i].duration;
                                } else {
                                    o.cueID = storage.self.addCue(o[i].l, o[i].o.start, o[i].o.tweenLength);
                                }
                                if (!o.cueID) return false;
                                if (o[i].o.tween.loop) {
                                    storage.self.cues[o.cueID].fx = $.extend(storage.self.cues[o.cueID].fx, o[i].o.tween.loop[o.i]);
                                } else {
                                    storage.self.cues[o.cueID].fx = $.extend(storage.self.cues[o.cueID].fx, o[i].o.tween);
                                }
                                if (storage.self.cues[o.cueID].fx.fillOpacity && storage.self.cues[o.cueID].fx.fillOpacity[0] !== null) {
                                    o[i].o.scope.prop.opacity = parseFloat(storage.self.cues[o.cueID].fx.fillOpacity[1])
                                    o[i].o.scope.prop.opacity = (10 / 1) * o[i].o.scope.prop.opacity;
                                }
                                if (storage.self.cues[o.cueID].fx.rotation !== null) {
                                    o[i].o.scope.prop.r = storage.self.cues[o.cueID].fx.rotation[1];
                                }
                                o[i].o.start = storage.playHead + storage.self.cues[o.cueID].dur;
                            }
                        }
                        updated(false);
                    }
                    this.oninit = function () {
                        this.body = $(this.target + ' .modal-body');
                        this.reverse = false;
                        this.opacity = false;
                        if (this.o[0].o.tween.loop) {
                            this.applyTween();
                        } else {
                            this.maximize();
                        }
                        this.body.prev().find('h4').after('<span class="close os-icon os-icon-close" close></span>').next().on('click', {'e': this}, function (e) {
                            e.data.e.close()
                        })
                        this.body.parents('.modal-dialog').css('transform', 'translate(0,50%)')
                        this.body.next('.modal-footer').empty().append('<button class="btn btn-primary btn-block">Apply</button>').find('button.btn:first').on('click', {'o': this}, function (e) {
                            e.preventDefault();
                            e.data.o.applyTween();
                            e.data.o.close();
                        })
                        this.fields = this.body.find('input[id]').switch().on('update', {'o': this}, function (e) {
                            e.data.o[this.id] = $(this).prop('checked');
                        });
                    }
                })
            }
            storage.dom.cuepallete.init();
            storage.dom.layers.on('click', '.layer[id] span[data-trigger]', function (e, o) {
                e.preventDefault();
                e.stopPropagation();
                o = {};
                e = $(this);
                o.t = e.data('trigger');
                o.p = e.parents('.layer[id]').get(0);
                if (o.t == 'addcue') {
                    storage.dom.cuepallete.element = e;
                    storage.dom.cuepallete.show()
                } else if (o.t == 'removecue' && storage.self.activeCue !== null) {
                    storage.self.removeCue(storage.self.activeCue);
                } else if (o.t == 'removecue' && storage.self.activeCue == null) {
                    o.l = queryLayer(o.p.id);
                    if (o.l === false) return;
                    o.k = $.extend({}, storage.sequence[o.l].keys);
                    $.each(o.k, function () {
                        storage.self.removeCue(this.id)
                    })
                } else if (o.t == 'mutelayer') {
                    storage.self.muteLayer(o.p.id);
                }
            })
            e = storage.dom.playtools;
            storage.dom.playtools = {};
            e.each(function (e, i) {
                e = $(this);
                i = e.data('timeline-cmd');
                e.removeAttr('data-timeline-cmd');
                e.data('timeline-cmd', i);
                storage.dom.playtools[i] = e;
            })
            e.on('click', function (e, i) {
                e = $(this);
                i = e.data('timeline-cmd');
                if (i == 'play' && storage.animator.paused() === true) {
                    bigloader();
                    notify('timeline.beforePlay');
                    window.setTimeout(function () {
                        c.bigSpinnrer.close();
                        storage.self.play();
                    }, 500)
                } else if (i == 'play' || i == 'stop') {
                    storage.self.stop();
                } else if (i == 'back') {
                    storage.self.rewind();
                }
            })
            storage.switches = {};
            storage.dom.toolbar.on('click', function (e, i) {
                e = $(this);
                i = e.data('timeline-cmd');
                if (i == 'mark') {
                    storage.self.addMarker(storage.playHead);
                } else if (i == 'remove') {
                    if (storage.activeCueList && storage.activeCueList.length > 0) {
                        storage.self.removeCueArray(storage.activeCueList);
                    } else if (storage.self.activeCue !== null) {
                        storage.self.removeCueArray([storage.self.activeCue]);
                    } else {
                        storage.self.removeCueAll();
                    }
                } else if (i == 'select') {
                    if (storage.switches.picker === true) {
                        disablePicker();
                    } else {
                        enablePicker();
                    }
                } else if (i == 'move') {
                    if (storage.switches.grab == true) {
                        disableGrabber()
                    } else {
                        enableGrabber();
                    }
                } else if (i == 'copy') {
                    storage.cueBlipboard = [];
                    if (storage.activeCueList && storage.activeCueList.length > 0) {
                        storage.cueBlipboard = $.extend([], storage.activeCueList);
                    } else if (storage.self.activeCue !== null) {
                        storage.cueBlipboard = [storage.self.activeCue];
                    }
                    if (storage.cueBlipboard.length > 0) {
                        toastr.info('Animation layer copied');
                    }
                } else if (i == 'paste' && storage.cueBlipboard && storage.cueBlipboard.length > 0) {
                    mdDialog(function () {
                        this.title = '';
                        this.size = 'small';
                        this.content = '<div><label>Reverse</label><input type="checkbox" id="reverse" /></div><div class="mt-2"><label>Speed</label><input type="number" id="speed" /></div>';
                        this.reverse = false;
                        this.speed = 0;
                        this.apply = function (t, ph, s, k, e, i) {
                            t = storage.playHead;
                            ph = storage.playHead;
                            for (i = 0; storage.cueBlipboard.length > i; i++) {
                                e = storage.cueBlipboard[i];
                                if (!storage.self.cues[e]) continue;
                                t = (ph);
                                if (storage.cueBlipboard[i + 1]) {
                                    this.f = storage.cueBlipboard[i + 1];
                                    this.i = storage.self.cues[this.f].cue - (storage.self.cues[e].cue);
                                    ph += this.i;
                                }
                                s = (storage.self.cues[e].dur - ((storage.self.cues[e].dur / 10) * this.speed));
                                k = storage.self.addCue(storage.self.cues[e].parent, (t), s);
                                s = $.extend(true, {}, storage.self.cues[e].fx);
                                if (this.reverse == true) {
                                    $.each(s, function (k, e) {
                                        if (['left', 'top', 'rotation', 'scaleX', 'scaleY', 'fillOpacity', 'height', 'width'].indexOf(k) === -1) return;
                                        s[k].reverse();
                                    })
                                }
                                storage.self.cues[k].fx = s;
                            }
                            storage.cueBlipboard = null;
                            updated();
                        }
                        this.onhide = function () {
                            this.destroy();
                        }
                        this.oninit = function () {
                            storage.tmp_pastewin = this;
                            this.body = $(this.target + ' .modal-body')
                            this.body.prev().find('h4').after('<span class="close os-icon os-icon-close" close></span>').next().on('click', {'e': this}, function (e) {
                                e.data.e.close()
                            })
                            this.body.parents('.modal-dialog').css('transform', 'translate(0,50%)')
                            this.body.next('.modal-footer').empty().append('<button class="btn btn-primary btn-block">Apply</button>').find('button.btn:first').on('click', {'e': this}, function (e) {
                                e.data.e.apply();
                                e.data.e.close();
                            })
                            this.fields = this.body.find('input[id]');
                            this.fields.filter('#speed').ionRangeSlider({
                                'min': 0,
                                'step': 0.5,
                                'max': 9.5,
                                'onChange': function (e) {
                                    storage.tmp_pastewin.speed = e.from;
                                }
                            });
                            this.fields.filter('#reverse').switch().on('update', function (e, ui) {
                                storage.tmp_pastewin.reverse = ui.value;
                            });
                        }
                    });
                } else if (i == 'add') {
                    if (!c.currentSelection || Object.keys(c.currentSelection).length == 0) {
                        toastr.info('No object selected');
                        return;
                    }
                    k = [];
                    $.each(c.currentSelection, function (i, e) {
                        k.push(e.attr('id').substr(2))
                    })
                    storage.dom.cuepallete.element = e;
                    storage.dom.cuepallete.layers = k;
                    storage.dom.cuepallete.show()
                } else if (i == 'record') {
                    if (storage.recording) {
                        e.removeClass('bg-danger').find('span.fa').removeClass('text-white').addClass('text-danger');
                        storage.self.stopRecord();
                    } else {
                        bigloader();
                        window.setTimeout(function () {
                            storage.recorderSessionVamp = {};
                            $.each(c.slides[0].elements, function (o) {
                                o = getCurrentValues(this.id);
                                storage.recorderSessionVamp[this.prop.uid] = o;
                            })
                            storage.self.startRecord();
                            c.bigSpinnrer.close();
                        }, 1000)
                        e.addClass('bg-danger').find('span.fa').removeClass('text-danger').addClass('text-white')
                    }
                } else if (i == 'snap') {
                    storage.self.takeSnapshot();
                }
            })
            storage.dom.actionbar.removeAttr('title').on('click', function (e, i) {
                e = $(this);
                i = e.data('timeline-cmd');
                if (i == 'min' && storage.state === 0) {
                    storage.self.minimize();
                    e.find('span.fa').removeClass('fa-caret-down').addClass('fa-caret-up');
                } else if (i == 'min' && storage.state !== 0) {
                    storage.self.maximize();
                    e.find('span.fa').removeClass('fa-caret-up').addClass('fa-caret-down');
                } else if (i == 'exit') {
                    storage.self.close();
                }
                resizeEditor();
            })
            storage.dom.layers.on('scroll', function () {
                storage.dom.sequence_w.scrollTop(this.scrollTop)
            })
            storage.dom.sequence_w.on('scroll', function () {
                storage.dom.layers.scrollTop(this.scrollTop);
            })
            this.buildLayers();
            this.maximize();
        }

        function computeRecording(ev, obj, i) {
            if (typeof ev.obj == 'string') obj = [ev.obj]; else obj = ev.obj;
            for (i = 0; obj.length > i; i++) {
                ev.id = obj[i];
                ev.scope = c.slides[0].elements[ev.id];
                ev.id = ev.scope.prop.uid;
                ev.dom = c.domCanvas.find('.objectBox[scope="' + ev.scope.id + '"]')
                ev.off = real_offset(ev.dom);
                ev.o = {};
                ev.o.left = ev.off.leftab + '%';
                ev.o.top = ev.off.topab + '%';
                ev.o.width = ev.off.widthab + '%';
                ev.o.height = ev.off.heightab + '%';
                ev.o.rotation = ev.scope.prop.r | 0;
                ev.o.fillOpacity = prepareCuePointValue(ev.scope.prop.opacity, 'fillOpacity');
                ev.p = {};
                ev.p.left = [storage.recorderSessionVamp[ev.id].left, ev.o.left];
                ev.p.top = [storage.recorderSessionVamp[ev.id].top, ev.o.top];
                ev.p.width = [storage.recorderSessionVamp[ev.id].width, ev.o.width];
                ev.p.height = [storage.recorderSessionVamp[ev.id].height, ev.o.height];
                if (ev.o.fillOpacity !== storage.recorderSessionVamp[ev.id].fillOpacity) {
                    ev.p.fillOpacity = [storage.recorderSessionVamp[ev.id].fillOpacity, ev.o.fillOpacity];
                    storage.recorderSessionVamp[ev.id].fillOpacity = ev.o.fillOpacity;
                } else {
                    ev.p.fillOpacity = [storage.recorderSessionVamp[ev.id].fillOpacity, ev.o.fillOpacity];
                }
                if (ev.o.rotation !== storage.recorderSessionVamp[ev.id].rotation) {
                    ev.p.rotation = [storage.recorderSessionVamp[ev.id].rotation, ev.o.rotation];
                    storage.recorderSessionVamp[ev.id].rotation = ev.o.rotation;
                } else {
                    ev.p.rotation = [storage.recorderSessionVamp[ev.id].rotation, ev.o.rotation];
                }
                if (ev.off.left !== storage.recorderSessionVamp[ev.id].left) {
                    storage.recorderSessionVamp[ev.id].left = ev.o.left;
                }
                if (ev.off.top !== storage.recorderSessionVamp[ev.id].top) {
                    storage.recorderSessionVamp[ev.id].top = ev.o.top
                }
                if (ev.off.width !== storage.recorderSessionVamp[ev.id].width) {
                    storage.recorderSessionVamp[ev.id].width = ev.o.width;
                }
                if (ev.off.height !== storage.recorderSessionVamp[ev.id].height) {
                    storage.recorderSessionVamp[ev.id].height = ev.o.height;
                }
                storage.recorderSession.push({'p': ev.p, 't': storage.recordTime, 'i': ev.id})
            }
        }

        this.maximize = function () {
            storage.state = 0;
            storage.dom.timeline.removeClass('d-none').css({'bottom': '', 'height': ''})
            c.domFooterTools.css('bottom', '');
            c.domFooterTools.css('bottom', '+=' + storage.dom.timeline.height());
            this.progress(storage.playHead);
            storage.dom.actionbar.filter('[data-timeline-cmd=min]').attr('title', 'Minimize the timeline').find('span.fa').removeClass('fa-caret-up').addClass('fa-caret-down');
        }
        this.minimize = function () {
            storage.state = 1;
            storage.dom.timeline.removeClass('d-none').css({'bottom': 47, 'height': 47, 'overflow': 'hidden'})
            c.domFooterTools.css('bottom', storage.dom.timeline.height() + c.domEditorFooter.height() + 10);
            storage.dom.actionbar.filter('[data-timeline-cmd=min]').attr('title', 'Expand the timeline').find('span.fa').removeClass('fa-caret-down').addClass('fa-caret-up');
        }
        this.close = function () {
            storage.dom.timeline.addClass('d-none').css({'bottom': 47, 'height': 47, 'overflow': 'hidden'});
            c.domFooterTools.css('bottom', '');
            storage.state = -1;
        }
        this.takeSnapshot = function () {
            if (Object.keys(this.cues).length == 0) {
                toastr.error('No animation frame to be captured');
                return;
            }
            Events.one('workspace.compile.timeline', 'after', function (e) {
                if (!notify('timeline.beforeSnapshot')) return;
                toastr.info('Processing snapshot');
                $.post(location.origin + '/editor/snap.php', {'sz': [c.width, c.height], 'd': e.data}, function (r, e) {
                    toastr.info('Downloading..');
                    e = c.sessionKey
                    c.sessionKey = c.LastSaveStamp;
                    if (r.download) location.href = r.download;
                    toastr.clear();
                    Events.one('editor.close', 'before', function (e) {
                        c.sessionKey = this.data.stamp;
                    }, {'stamp': e})
                }, 'json').fail(function () {
                    toastr.error('Could not complete data download. Please try again');
                })
                throw'snapping';
            });
            c.saveWork()
        }
        this.startRecord = function () {
            storage.state = -1;
            storage.recording = true;
            storage.recordTime = storage.playHead;
            storage.recorderSession = [];
            storage.dom.duration.val(convertTime(180));
            storage.recordEv = window.setInterval(function () {
                storage.recordTime += (500 / 1000);
                if ((storage.recordTime - storage.playHead) > 180) storage.self.stopRecord();
                writeTimeStamp(storage.recordTime - storage.playHead);
            }, 500)
        }
        this.stopRecord = function (ph) {
            storage.state = 0;
            storage.recording = false;
            delete storage.recordTime;
            window.clearInterval(storage.recordEv);
            writeTimeStamp(storage.playHead);
            ph = convertTime(storage.animator.totalDuration());
            storage.dom.duration.val(ph);
            if (storage.recorderSession.length > 0) {
                bigloader();
                $.each(storage.recorderSession, function (t, cue, o) {
                    t = queryLayer(this.i);
                    if (t === false) return;
                    t = this.t;
                    cue = storage.self.addCue(this.i, parseFloat(t), 1);
                    o = $.extend(storage.self.cues[cue].fx, this.p);
                    storage.self.cues[cue].fx = o;
                })
                updated();
                c.bigSpinnrer.close();
            }
            storage.recorderSession = [];
            storage.recorderSessionVamp = null;
        }
        this.play = function () {
            if (storage.state == -1) return false;
            if (storage.animator.duration() > 0) {
                if (storage.playHead >= this.getTotalTime()) storage.playHead = 0;
                storage.dom.playtools.play.find('span.fa').removeClass('fa-play').addClass('fa-pause')
                storage.animator.play(storage.playHead);
                return true;
            }
            return false;
        }
        this.playCue = function (cueID) {
        }
        this.pause = function () {
            if (storage.state == -1) return false;
            storage.animator.pause();
            storage.dom.playtools.play.find('span.fa').removeClass('fa-pause').addClass('fa-play')
        }
        this.seek = function (time) {
            if (storage.state == -1) return false;
            if (time == null || time == undefined) time = storage.playHead;
            storage.animator.play();
            storage.animator.stop();
            time = (time);
            storage.animator.seek(time);
            if (c.transformHandler.isHidden() == false) {
                c.transformHandler.disable();
            }
            this.progress(time)
        }
        this.stop = function () {
            if (storage.state == -1) return false;
            storage.animator.stop();
            storage.dom.playtools.play.find('span.fa').removeClass('fa-pause').addClass('fa-play')
        }
        this.rewind = function () {
            if (storage.state == -1) return false;
            if (storage.animator.duration() > 0 && storage.playHead > 0) {
                storage.animator.reverse();
                storage.dom.playtools.play.find('span.fa').removeClass('fa-play').addClass('fa-pause')
                return true;
            }
            return false;
        }
        this.addMarker = function (i, time, e) {
            if (storage.state == -1) return false;
            time = parseFloat(i) - 0.2;
            e = {'t': i}
            e.id = 'm_' + $.now() + Math.random().toString();
            this.markers.push(e);
            e = $('<div class="marker" id="' + e.id + '"><i class="fa fa-map-pin fa-rotate-180"></i></div>');
            storage.dom.info.prepend(e);
            e.css('left', time + '%')
        }
        this.removeMarker = function (id, i, t) {
            if (storage.state == -1) return false;
            if (id === undefined || id === null) return false;
            t = false;
            if (typeof id === 'string') id = [id];
            for (i = 0; this.markers.length > i; i++) {
                if (id.indexOf(this.markers[i].id) !== -1) {
                    storage.dom.info.find('.marker#' + this.markers[i].id).remove();
                    this.markers.splice(i, 1);
                    t = true;
                }
            }
            return true;
        }
        this.moveMarker = function (id, time) {
            if (storage.state == -1) return false;
            for (i = 0; this.markers.length > i; i++) {
                if (id === this.markers[i].id) {
                    this.markers[i].t = time;
                    storage.dom.info.find('.marker#' + this.markers[i].id).css('left', (parseFloat(i) - 0.2) + '%');
                    return true;
                }
            }
            return false;
        }
        this.addCue = function (layerID, start, length, o) {
            if (storage.state == -1) return false;
            o = {};
            e = queryLayer(layerID);
            if (e === false) return;
            o.e = storage.dom.sequence.children('.layers[id="' + layerID + '"]')
            o.kfx = {};
            o.kfx.cue = parseFloat(start);
            o.kfx.dur = parseFloat(length);
            o.kfx.label = o.kfx.cue.toString();
            o.scope = queryLayerObject(layerID);
            o.el = c.domCanvas.find('div.objectBox[scope="' + o.scope.id + '"]');
            o.off = real_offset(o.el);
            o.kfx.updated = true;
            o.r = prepareCuePointValue(o.scope.prop.r, 'rotation');
            o.lf = prepareCuePointValue(o.off.left, 'left');
            o.tp = prepareCuePointValue(o.off.top, 'top');
            o.ht = prepareCuePointValue(o.off.height, 'height');
            o.wt = prepareCuePointValue(o.off.width, 'width');
            o.opa = prepareCuePointValue(o.scope.prop.opacity, 'fillOpacity');
            o.kfx.fx = {
                left: [o.lf, o.lf],
                top: [o.tp, o.tp],
                height: [o.ht, o.ht],
                width: [o.wt, o.wt],
                fillOpacity: [o.opa, o.opa],
                rotation: [o.r, o.r],
                strokeWidth: [0, 0],
                strokeDasharray: [0, 0],
                x: [null, null],
                y: [null, null],
                z: [null, null],
                scaleX: [null, null],
                scaleY: [null, null],
                toY: [null, null],
                toX: [null, null],
                data: [null, null]
            }
            if (o.scope.prop.border) {
                o.kfx.fx.strokeWidth = [o.scope.prop.border.size, o.scope.prop.border.size];
                o.bdx = o.scope.prop.border.offset | 0;
                o.kfx.fx.strokeDasharray = [o.bdx, o.bdx]
            }
            o.kfx.type = 'key';
            o.kfx.id = 'q_' + $.now() + Math.random().toString();
            o.kfx.parent = layerID;
            if (storage.sequence[e].keys.length === 0) {
                getLayerDefault(storage.sequence[e].id);
            }
            storage.sequence[e].keys.push(o.kfx);
            buildCue(o.e, o.kfx, storage.sequence[e]);
            this.cues[o.kfx.id] = o.kfx;
            o.l = storage.self.moveCue(o.kfx.id, o.kfx.cue);
            this.seek(storage.playHead);
            return o.kfx.id;
        }
        this.removeCue = function (cueID, l, i, u) {
            if (storage.state == -1) return false;
            if (this.cues[cueID] === undefined) return false;
            l = this.cues[cueID].parent;
            l = queryLayer(l);
            if (l === false) return false;
            u = 0;
            for (i = 0; storage.sequence[l].keys.length > i; i++) {
                if (storage.sequence[l].keys[i].id == cueID) {
                    storage.sequence[l].keys.splice(i, 1);
                    if (this.activeCue === cueID) this.activeCue = null;
                    this.cues[cueID].e.remove();
                    delete this.cues[cueID];
                    u++;
                    if (storage.sequence[l].keys.length == 0) {
                        this.restoreLayer(storage.sequence[l].id)
                    }
                    updated();
                    return true;
                }
            }
        }
        this.removeCueArray = function (id, i, o, e) {
            if (storage.state == -1) return false;
            if (typeof id !== 'object') return false;
            o = false;
            for (i = 0; storage.sequence.length > i; i++) {
                if (storage.sequence[i].keys.length == 0) continue;
                e = storage.sequence[i].keys;
                $.each(e, function (e) {
                    if (id.indexOf(this.id) === -1) return;
                    if (this.id === storage.self.activeCue) storage.self.activeCue = null;
                    this.e.remove();
                    delete storage.self.cues[this.id];
                    delete storage.sequence[i].keys[i];
                    o = true;
                })
                storage.sequence[i].keys = Object.values(storage.sequence[i].keys);
                if (storage.sequence[i].keys.length == 0) {
                    this.restoreLayer(storage.sequence[i].id)
                }
            }
            if (o == true) updated();
            return o;
        }
        this.removeCueAll = function (i) {
            if (storage.state == -1) return false;
            for (i = 0; storage.sequence.length > i; i++) {
                $.each(storage.sequence[i].keys, function (e) {
                    this.e.remove();
                    delete storage.self.cues[this.id];
                })
                storage.sequence[i].keys.splice();
                this.restoreLayer(storage.sequence[i].id)
            }
            this.activeCue = null;
            updated()
        }
        this.getActivateCues = function () {
            if (this.activeCue == null || !this.cues[this.activeCue]) return false;
            return this.cues[this.activeCue];
        }
        this.getActiveCuePointTween = function (e, i, o) {
            if (!this.activeCuePoint) return false;
            e = this.activeCuePoint.split('|');
            i = e[0];
            if (!this.cues[i]) return false;
            o = this.getCuePointTween(i, true);
            if (o !== false) {
                o.point = e[1];
                o.cueID = i;
            }
            return o;
        }
        this.getCuePointTween = function (cueID, active, o) {
            if (this.cues[cueID] === undefined) return false;
            o = {};
            o.fx = {'in': {}, 'out': {}, 'dur': 0, 'wait': 0}
            o.up = false;
            o.i = 0;
            $.each(this.cues[cueID].fx, function (k, v) {
                if ((v[0] == null && v[1] == null) || (v[1] === undefined)) return;
                o.fx.in[k] = (v[0]);
                o.fx.out[k] = (v[1]);
                o.i += 1;
                if (o.fx.out[k] == null && active !== true) {
                    delete o.fx.out[k];
                    delete o.fx.in[k];
                    o.i -= 1;
                }
                if (o.fx.in[k] !== null && o.fx.in[k] !== undefined) {
                    o.up = true;
                }
            })
            if (o.up !== true && o.i > 0) return false;
            o.fx.dur = this.cues[cueID].dur;
            o.fx.wait = this.cues[cueID].cue;
            return o.fx;
        }
        this.updateCuePointTween = function (cueID, point, vars, o) {
            if (storage.state == -1) return false;
            if (this.cues[cueID] === undefined) return false;
            if (point !== 'in' && point !== 'out') return false;
            o = {};
            o.fk = Object.keys(this.cues[cueID].fx);
            o.up = false;
            $.each(vars, function (k, v, e) {
                if (o.fk.indexOf(k) === -1) return;
                o.up = true;
                if (point == 'in') {
                    storage.self.cues[cueID].fx[k][0] = prepareCuePointValue(v, k)
                } else {
                    storage.self.cues[cueID].fx[k][1] = prepareCuePointValue(v, k)
                }
            })
            if (o.up == true) {
                this.cues[cueID].updated = true;
                updated();
            }
            return o.up;
        }
        this.selectCuePoint = function (cueID, point, e, i) {
            if (storage.state == -1) return false;
            if (point !== 'in' && point !== 'out') point = 'in';
            if (this.cues[cueID] === undefined) return false;
            if (this.activeCuePoint) {
                e = this.activeCuePoint.split('|');
                i = e[0];
                if (this.cues[i] && e[1] == 'in') {
                    this.cues[i].e.find('a.anchor:first').removeClass('active')
                } else if (this.cues[i] && e[1] == 'out') {
                    this.cues[i].e.find('a.anchor:last').removeClass('active')
                }
            }
            this.activeCuePoint = null;
            if (this.activeCue !== cueID) this.selectCue(cueID);
            if (point == 'out') {
                this.progress(this.cues[cueID].cue + this.cues[cueID].dur);
                this.cues[cueID].e.find('a.anchor:last').addClass('active')
            } else if (point == 'in') {
                this.cues[cueID].e.find('a.anchor:first').addClass('active')
                this.progress(this.cues[cueID].cue);
            }
            this.seek(storage.playHead);
            this.activeCuePoint = cueID + '|' + point;
            this.activate(this.cues[cueID].parent);
            return true;
        }
        this.selectCue = function (cueID, e) {
            if (storage.state == -1) return false;
            if (this.cues[cueID] === undefined) return false;
            e = this.cues[cueID].e.hasClass('ui-selected');
            storage.dom.sequence.find('.cue.ui-selected').removeClass('ui-selected').find('a.anchor.active').removeClass('active');
            this.activeCuePoint = null;
            storage.activeCueList = [];
            if (e) {
                this.activeCue = null;
                this.cues[cueID].e.removeClass('ui-selected').removeAttr('tabIndex')
            } else {
                this.activeCue = cueID;
                this.selectLayer(this.cues[cueID].parent)
                this.cues[cueID].e.attr('tabIndex', 0).addClass('ui-selected').focus();
            }
            return true;
        }
        this.readjust = function (cues, e, i) {
            if (typeof cues !== 'object') cues = Object.keys(this.cues);
            for (i = 0; cues.length > i; i++) {
                e = cues[i];
                if ((this.cues[e].cue + this.cues[e].dur) > storage.maxTime) {
                    this.cues[e].cue = storage.maxTime - this.cues[e].dur;
                    this.cues[e].e.css('left', this.cues[e].cue + '%');
                }
            }
        }
        this.moveCue = function (cueID, start) {
            if (storage.state == -1) return false;
            if (this.cues[cueID] === undefined) return false;
            if (typeof start !== 'number') return false;
            if (start < 0) start = 0;
            start = start.toString().substr(0, 4);
            start = parseFloat(start);
            this.cues[cueID].cue = start;
            this.cues[cueID].updated = true;
            this.cues[cueID].e.css('left', start + '%');
            updated();
            writeCueInfo(cueID);
            this.progress(start);
            return start;
        }
        this.resizeCue = function (cueID, length) {
            if (storage.state == -1) return false;
            if (this.cues[cueID] === undefined) return false;
            if (typeof length !== 'number') return false;
            if ((this.cues[cueID].cue + length) > storage.maxTime) {
                toastr.info('Cannot exceed (' + storage.maxTime + ') sec of maximum animation. Time adjusted');
                length = this.cues[cueID].dur;
            }
            length = length.toString().substr(0, 4);
            length = parseFloat(length);
            this.cues[cueID].dur = length;
            this.cues[cueID].e.css('width', length + '%');
            this.cues[cueID].updated = true;
            updated();
            writeCueInfo(cueID);
            this.progress(length + this.cues[cueID].cue);
            return length;
        }
        this.activate = function (layerID, e) {
            e = queryLayerElement(layerID);
            if (e === false) return false;
            e = e.getAttribute('scope');
            c.domCanvas.trigger('connectScope', [e])
        }
        this.renameLayer = function (id, n) {
            e = queryLayer(id);
            if (e === false) return false;
            storage.sequence[e].e.find('> span:first').text(n);
        }
        this.restoreLayer = function (id, e, el, o) {
            e = queryLayer(id);
            if (e === false) return false;
            if (!storage.sequence[e].default) return false;
            id = $(storage.sequence[e].scope).css({
                'left': storage.sequence[e].default.leftab + '%',
                'top': storage.sequence[e].default.topab + '%',
                'width': storage.sequence[e].default.widthab + '%',
                'height': storage.sequence[e].default.heightab + '%'
            });
            if (id.length == 0) return false;
            if (storage.sequence[e].default.rotation !== undefined) {
                applyPropertyOption(id, {'rotate': storage.sequence[e].default.rotation})
            }
            el = id.attr('scope');
            el = c.slides[0].elements[el];
            delete el.prop.tweenDefault;
            if (el && el.prop.sym && el.prop.cmd && el.prop.sym !== 'button') {
                o = 'm';
                o += el.prop.cmd.split(' ').join('L');
                if (el.prop.variant == 'polygon') o += 'Z';
                id.find('.object:first > svg path:first').attr('d', o);
            }
            if (el.prop.sym === 'text') {
                o = id.find('.object:first > svg g:first text').empty();
                $.each(el.prop.source, function (s) {
                    s = document.createElementNS(c.domSvgNs, 'tspan');
                    s.append(this.s)
                    s.setAttribute('x', this.x);
                    s.setAttribute('y', this.y);
                    o.append(s);
                })
            }
            el = id.find('.object:first');
            el.find('svg:first').css('transform', '');
            if (storage.sequence[e].default.stroke !== undefined || storage.sequence[e].default.opacity !== undefined) {
                id = id.attr('id').substr(2);
                if (!c.idCache[id]) return false;
                c.idCache[id].fx.init(el.find('svg:first'));
                if (storage.sequence[e].default.stroke) {
                    c.idCache[id].fx.load({'border': storage.sequence[e].default.stroke})
                }
                if (storage.sequence[e].default.opacity !== undefined) {
                    c.idCache[id].fx.load({'opacity': storage.sequence[e].default.opacity})
                }
                c.idCache[id].fx.applyAll('opacity', true)
                c.idCache[id].fx.applyAll('border', true)
            }
            return true;
        }
        this.muteLayer = function (id, e) {
            if (storage.state == -1) return false;
            e = queryLayer(id);
            if (e === false) return e;
            if (storage.sequence[e].mute === true) {
                storage.sequence[e].mute = false;
                storage.sequence[e].seq.removeAttr('disabled');
                storage.sequence[e].e.find('span[data-trigger=mutelayer]').removeClass('fa-eye fa-eye-slash').addClass('fa-eye');
            } else {
                storage.sequence[e].mute = true;
                storage.sequence[e].seq.attr('disabled', true);
                storage.sequence[e].e.find('span[data-trigger=mutelayer]').removeClass('fa-eye fa-eye-slash').addClass('fa-eye-slash');
            }
            updated();
        }
        this.selectLayer = function (id, e) {
            if (storage.state == -1) return false;
            if (this.activeLayer !== null && this.activeLayer !== undefined && this.activeLayer >= 0) {
                storage.sequence[this.activeLayer].e.removeClass('active');
                storage.sequence[this.activeLayer].seq.removeClass('active');
            }
            this.activeLayer = null;
            e = queryLayer(id);
            if (e === false) return e;
            this.activeLayer = e;
            id = storage.sequence[e].e[0].offsetTop - 10;
            storage.dom.layers.scrollTop(id);
            storage.dom.sequence_w.scrollTop(id);
            storage.sequence[e].e.addClass('active');
            storage.sequence[e].seq.addClass('active');
        }
        this.outlineLayer = function (id, e) {
            e = queryLayer(id);
            if (e === false) return e;
            storage.sequence[e].e.addClass('active');
            storage.sequence[e].seq.addClass('active');
        }
        this.buildLayers = function (i, e) {
            for (i = 0; 100 > i; i++) {
                storage.dom.sequence.append('<div unsigned class="layers"></div>');
                storage.dom.layers.append('<div unsigned class="layer"></div>');
            }
            storage.dom.sequence.children(':even').addClass('even')
            storage.dom.layers.children(':even').addClass('even');
            storage.dom.progress.css('height', storage.dom.sequence[0].scrollHeight)
        }
        this.getUnassignedLayer = function (e, i) {
            e = storage.dom.layers.find('> .layer[unsigned]:first');
            if (e.length == 0) {
                this.buildLayers();
                e = storage.dom.layers.find('> .layer[unsigned]:first')
            }
            return e;
        }
        this.create = function (layerID, layerType, e, el) {
            if (storage.state == -1) return false;
            if (storage.layerKeys[layerID]) {
                e = queryLayer(layerID);
                if (e === false) return false;
                storage.sequence[e].scope = c.domCanvas[0].querySelector('#g_' + layerID + '.objectBox');
                storage.sequence[e].e.find('> span:first').text(layerType)
                return true;
            }
            e = {};
            e.id = layerID;
            e.label = null;
            e.type = layerType;
            e.keys = [];
            storage.sequence.push(e);
            storage.layerKeys[layerID] = true;
            el = this.getUnassignedLayer();
            el.removeAttr('unsigned').attr('id', e.id).html('<i class="fa fa-caret-right ml-1"></i> <span class="ml-2">' + e.type + '</span><div class="float-right mr-3"><span title="Insert animation frame to this layer on the current position" data-trigger="addcue" class="fa fa-plus"></span><span title="Delete selected or all frames on this layer" class="fa fa-trash-o" data-trigger="removecue"></span><span title="Toggle all animation on this layer on/off" data-trigger="mutelayer" class="fa fa-eye"></span></div>')
            storage.sequence[storage.sequence.length - 1].e = el;
            el = storage.dom.sequence.children('.layers:eq(' + el.index() + ')').removeAttr('unsigned');
            el.attr('id', e.id);
            storage.sequence[storage.sequence.length - 1].seq = el;
            storage.sequence[storage.sequence.length - 1].scope = c.domCanvas[0].querySelector('#g_' + layerID + '.objectBox');
            return true;
        }
        this.createFromObject = function (scope, i) {
            if (storage.state == -1) return false;
            if (typeof scope !== 'object') return false;
            if ((scope.prop && scope.alias && scope.id) == false) return false;
            if (scope.name && scope.name.length > 0) {
                this.create(scope.prop.uid, scope.name)
            } else if (scope.alias == 'shape' && scope.prop.sym) {
                this.create(scope.prop.uid, scope.prop.sym)
            } else {
                this.create(scope.prop.uid, scope.alias)
            }
            i = queryLayer(scope.prop.uid);
            if (i !== false) {
                storage.sequence[i].seq.empty();
            }
            if (scope.tween) {
                $.each(scope.tween.tweens, function (id, o, f) {
                    id = storage.self.addCue(scope.prop.uid, parseFloat(this.wait), this.dur);
                    o = {};
                    f = this;
                    $.map(this.in, function (v, i) {
                        o[i] = [v, f.out[i]]
                    })
                    o = $.extend(true, storage.self.cues[id].fx, o);
                    if (o.data && o.data[1] !== null) {
                        if (o.data[0].type == 'typo') {
                            o.tmp = {'type': 'typo', 'var': scope.prop.source};
                            o.tmp.el = $(storage.sequence[i].scope).find('.object > svg g:first text:first').get(0)
                        } else {
                            o.tmp = {'type': 'path', 'var': scope.prop.cmd.split(' ')};
                            o.tmp.el = $(storage.sequence[i].scope).find('.object > svg path:first').get(0);
                        }
                        o.tmp.value = o.tmp.var.length;
                        if (o.data[1].value > 0) {
                            o.data[1] = o.tmp;
                        } else {
                            o.data[0] = o.tmp;
                        }
                        delete o.tmp;
                    }
                    storage.self.cues[id].fx = o;
                    storage.self.cues[id].updated = true;
                })
            }
            return true;
        }
        this.createFromScene = function (i, t, o) {
            if (storage.state == -1) return false;
            this.clear();
            t = c.slides.length;
            if (t == 0) return;
            storage.sequence = [];
            for (i = 0; t > i; i++) {
                o = Object.values(c.slides[i].elements);
                $.each(o, function (i, e) {
                    storage.self.createFromObject(this);
                })
            }
            buildUi();
            window.setTimeout(function () {
                updated(true);
                storage.animator.play();
                storage.animator.pause();
                storage.animator.play(storage.self.getTotalTime());
                storage.isReady = true;
            }, 50);
        }
        this.removeArray = function (layers, i, t) {
            if (storage.state == -1) return false;
            if (layers.length == 0 || layers.length == undefined) return false;
            if (storage.sequence.length == 0) return;
            t = 0;
            for (i = 0; storage.sequence.length > i; i++) {
                if (storage.sequence.indexOf(layers) !== -1) {
                    storage.sequence[i].seq.empty();
                    storage.sequence[i].e.remove();
                    $.each(storage.sequence[i].keys, function () {
                        delete storage.self.cues[this.id];
                    })
                    this.restoreLayer(storage.sequence[i].id)
                    delete storage.layerKeys[storage.sequence[i].id];
                    if (this.activeLayer === i) this.activeLayer = null;
                    storage.sequence.splice(i, 1);
                    t++;
                }
            }
            if (t > 0) updated();
            return t;
        }
        this.selectLayerCues = function (layerID) {
            l = queryLayer(layerID);
            if (l === false) return false;
            return storage.sequence[l].keys;
        }
        this.remove = function (layerID, cueID, i, l) {
            if (storage.state == -1) return false;
            l = queryLayer(layerID);
            if (l === false) return false;
            for (i = 0; storage.sequence[l].keys.length > i; i++) {
                cueID = storage.sequence[l].keys[i].id;
                storage.sequence[l].keys[i].e.remove();
                delete this.cues[cueID];
            }
            storage.sequence[l].keys = [];
            if (storage.sequence[l].keys.length == 0) {
                this.restoreLayer(storage.sequence[l].id);
            }
            delete storage.layerKeys[layerID];
            if (storage.sequence[l].seq) storage.sequence[l].seq.remove();
            if (storage.sequence[l].e) storage.sequence[l].e.remove();
            storage.sequence.splice(l, 1);
            if (this.activeLayer === l) this.activeLayer = null;
            updated();
        }
        this.clear = function (k) {
            if (storage.state == -1) return false;
            if (storage.layerKeys) {
                k = Object.keys(storage.layerKeys);
                this.removeArray(k);
            }
            storage.isReady = false;
            storage.dom.layers.empty();
            storage.dom.sequence.empty();
            storage.dom.info.empty();
            storage.sequence = [];
            this.cues = {};
            this.markers = [];
            storage.layerKeys = {};
            storage.playTime = 0;
            storage.playHead = 0;
            this.activeCue = null;
            this.activeCuePoint = null;
            storage.animator.clear(true);
            this.buildLayers();
            this.addMarker(storage.maxTime);
            updated();
        }
        this.exportAll = function (layerID, i, o) {
            if (storage.sequence.length == 0) return false;
            o = {};
            o.anime = {};
            o.up = false;
            for (i = 0; storage.sequence.length > i; i++) {
                if (storage.sequence[i].keys.length == 0) continue;
                e = queryLayerObject(storage.sequence[i].id);
                if (e === false) continue;
                o.el = storage.sequence[i].scope;
                o.id = o.el.getAttribute('scope');
                if (storage.sequence[i].default) {
                    c.slides[0].elements[o.id].prop.tweenDefault = {
                        'f': (storage.sequence[i].default.flip || null),
                        'r': storage.sequence[i].default.rotation,
                        'v': storage.sequence[i].default.opacity,
                        'b': storage.sequence[i].default.stroke || null,
                        'l': storage.sequence[i].default.leftab,
                        't': storage.sequence[i].default.topab,
                        'w': storage.sequence[i].default.widthab,
                        'h': storage.sequence[i].default.heightab
                    };
                }
                if ((layerID !== null && layerID !== undefined) && layerID !== storage.sequence[i].id) continue;
                $.each(storage.sequence[i].keys, function (tween) {
                    tween = storage.self.getCuePointTween(this.id);
                    if (!tween) return;
                    if (!o.anime[e.id]) {
                        o.anime[e.id] = {'tweens': [], 'props': {}};
                    }
                    if (tween.out.data) {
                        tween.out.data = {'type': tween.in.data.type, 'value': tween.out.data.value}
                        tween.in.data = {'type': tween.in.data.type, 'value': tween.in.data.value}
                    }
                    o.anime[e.id].tweens.push(tween);
                    o.up = true;
                })
            }
            if (o.up == false) return false;
            return o.anime;
        }
        this.exportToObject = function () {
            this.exportAll(true);
        }
        this.getTotalTime = function () {
            return storage.animator.totalDuration();
        }
        this.isReady = function () {
            return storage.isReady;
        }
        this.progress = function (start, i) {
            if (storage.state == -1) return false;
            if ((start >= 0) == false) return storage.playHead;
            i = (storage.sequenceWidth / 100) * start;
            i += storage.dom.sequence[0].scrollLeft
            if (storage.state === 0) {
                storage.dom.progress.css('left', i);
            }
            start = ((i) / storage.sequenceWidth) * 100;
            storage.playHead = (start);
            writeTimeStamp(storage.playHead);
        }
        this.destroy = function () {
            this.close();
            this.clear();
            storage.dom.timeline.remove();
            storage.dom.cuepallete.destroy();
            Events.off('workspace.*.timeline');
            Events.off('obj.*.timeline');
            Events.off('editor.*.timeline');
            resizeEditor();
        }
        this.render = function (id) {
            if (storage.state == -1) return false;
            if (typeof id !== 'string') return false;
            storage.updated = true;
            exportTweens(id);
            storage.updated = false;
            return true;
        }

        function enablePicker() {
            storage.dom.toolbar.filter('button[data-timeline-cmd=select]').addClass('bg-primary text-white');
            storage.switches.picker = true;
            storage.dom.sequence.selectable('enable');
        }

        function enableGrabber() {
            storage.dom.toolbar.filter('button[data-timeline-cmd=move]').addClass('bg-primary text-white');
            $.each(storage.self.cues, function () {
                this.e.resizable('disable')
                this.e.draggable('disable')
            })
            storage.switches.grab = true;
            disablePicker();
        }

        function disablePicker() {
            storage.dom.toolbar.filter('button[data-timeline-cmd=select]').removeClass('bg-primary text-white');
            storage.switches.picker = false;
            storage.dom.sequence.selectable('disable');
        }

        function disableGrabber() {
            storage.dom.toolbar.filter('button[data-timeline-cmd=move]').removeClass('bg-primary text-white');
            $.each(storage.self.cues, function () {
                this.e.resizable('enable')
                this.e.draggable('enable')
            })
            storage.switches.grab = false;
        }

        function getAbsUnit(n, i) {
            i = ((storage.sequenceWidth) / 100) * n;
            i += storage.zoomscale;
            i = ((i) / storage.sequenceWidth) * 100
            return i;
        }

        function getLayerDefault(id, purge, t, o, e) {
            e = queryLayer(id);
            if (e === false) return false;
            e = storage.sequence[e];
            id = e.scope.getAttribute('scope');
            o = id.substr(id.lastIndexOf('_') + 1);
            o = c.slides[o].elements[id];
            if (purge === true) delete o.prop.tweenDefault;
            if (o.prop.tweenDefault) {
                e.default = {
                    'leftab': o.prop.tweenDefault.l,
                    'topab': o.prop.tweenDefault.t,
                    'widthab': o.prop.tweenDefault.w,
                    'heightab': o.prop.tweenDefault.h,
                    'flip': o.prop.tweenDefault.f,
                    'stroke': o.prop.tweenDefault.b,
                    'opacity': o.prop.tweenDefault.v,
                    'rotation': o.prop.tweenDefault.r
                }
                return true
            }
            e.default = real_offset(e.scope);
            e.default.flip = o.prop.flip;
            e.default.rotation = o.prop.r | 0;
            e.default.opacity = o.prop.opacity | 10;
            e.default.stroke = o.prop.border;
            if (o.prop.opacity === undefined) {
                e.default.opacity = 10;
            }
            return true;
        }

        function updated(start) {
            if (storage.state == -1) return false;
            storage.updated = true;
            exportTweens();
            storage.updated = false;
            notify('timeline.afterUpdate');
        }

        function exportTweens(layerID) {
            if (storage.updated !== true) return false;
            storage.animator.stop();
            storage.animator.clear(true);
            $.each(storage.self.cues, function (id, a, b, o) {
                a = storage.self.getCuePointTween(id);
                if (a == false) return;
                b = queryLayer(this.parent);
                if (b === false) return;
                if (storage.sequence[b].mute === true) return;
                b = storage.sequence[b].scope;
                a.in.ease = 'Linear.eaeNone';
                a.out.ease = 'Linear.eaeNone';
                a.out.onStartParams = [b, b.querySelector('svg')]
                if (storage.TweenBin[b.id]) {
                }
                storage.TweenBin[b.id] = [];
                o = {'i': {}, 'o': {}};
                if (a.in.fillOpacity !== undefined) {
                    o.i = {'fill-opacity': a.in.fillOpacity, 'attr': {'opacity': a.in.fillOpacity}};
                    o.o = {'fill-opacity': a.out.fillOpacity, 'attr': {'opacity': a.out.fillOpacity}};
                }
                if (a.in.strokeWidth !== undefined) {
                    o.i.strokeWidth = a.in.strokeWidth;
                    o.o.strokeWidth = a.out.strokeWidth
                }
                if (a.in.strokeDasharray !== undefined) {
                    o.i.strokeDasharray = a.in.strokeDasharray;
                    o.o.strokeDasharray = a.out.strokeDasharray;
                }
                if (o.i.attr || o.i.strokeWidth !== undefined || o.i.strokeDasharray !== undefined) {
                    o.i.overwrite = false;
                    o.o.overwrite = false;
                    o.ep = TweenMax.fromTo('.objectBox#' + a.out.onStartParams[0].id + ' > .object > svg[id]', a.dur, o.i, o.o);
                    storage.TweenBin[a.out.onStartParams[0].id].push(o.ep);
                    storage.animator.add(o.ep, a.wait);
                    delete o.ep;
                    delete a.in.strokeWidth;
                    delete a.out.strokeWidth;
                    delete a.out.strokeDasharray;
                    delete a.in.strokeDasharray;
                    delete a.in.fillOpacity;
                    delete a.out.fillOpacity;
                }
                o.i = {};
                o.o = {};
                o.tw = false;
                if (a.in.scaleX !== undefined) {
                    o.i.scaleX = a.in.scaleX;
                    o.o.scaleX = a.out.scaleX;
                    o.tw = true;
                }
                if (a.in.scaleY !== undefined) {
                    o.i.scaleY = a.in.scaleY;
                    o.o.scaleY = a.out.scaleY;
                    o.tw = true;
                }
                if (a.in.x !== undefined) {
                    o.i.x = a.in.x;
                    o.o.x = a.out.x;
                    o.tw = true;
                }
                if (a.in.y !== undefined) {
                    o.i.y = a.in.y;
                    o.o.y = a.out.y;
                    o.tw = true;
                }
                if (a.in.z !== undefined) {
                    o.i.z = a.in.z;
                    o.o.z = a.out.z;
                    o.tw = true;
                }
                if (a.in.toX !== undefined) {
                    o.i.transformOriginX = a.in.toX;
                    o.o.transformOriginX = a.out.toX;
                    o.tw = true;
                }
                if (a.in.toY !== undefined) {
                    o.i.transformOriginY = a.in.toY;
                    o.o.transformOriginY = a.out.toY;
                    o.tw = true;
                }
                if (o.tw === true && (o.i.transformOriginY !== undefined || o.i.transformOriginX !== undefined)) {
                    o.i.transformOrigin = o.i.transformOriginX + ' ' + o.i.transformOriginY
                    o.o.transformOrigin = o.o.transformOriginX + ' ' + o.o.transformOriginY
                }
                if (o.tw === true) {
                    o.i.overwrite = false;
                    o.o.overwrite = false;
                    o.ep = TweenMax.fromTo(a.out.onStartParams[1], a.dur, o.i, o.o);
                    storage.animator.add(o.ep, a.wait);
                    storage.TweenBin[a.out.onStartParams[0].id].push(o.ep);
                    delete o.ep;
                    delete a.in.scaleX;
                    delete a.out.scaleX;
                    delete a.in.scaleY;
                    delete a.out.scaleY;
                    delete a.in.x;
                    delete a.out.x;
                    delete a.in.y;
                    delete a.out.y;
                    delete a.in.toY;
                    delete a.in.toX;
                    delete a.out.toX;
                    delete a.out.toY;
                }
                a.out.onStart = function (element, svg) {
                }
                a.out.onCompleteParams = a.out.onStartParams;
                a.out.onStartScope = this;
                a.out.onComplete = function (element, svg, o) {
                    return;
                    o = (queryLayerObject(this.parent));
                    if (o == false) return;
                }
                if (a.out.data) {
                    o = {};
                    if (a.out.data.value) {
                        o = $.extend({}, a.out.data);
                    } else if (a.in.data.value) {
                        o = $.extend({}, a.in.data);
                    }
                    o.value = a.in.data.value;
                    o.i = b.getAttribute('scope');
                    o.p = o.var.slice(0, a.in.data.value);
                    if (o.p.length == 0) {
                        if (o.type == 'path') {
                            o.el.removeAttribute('d');
                        } else if (o.type == 'typo') {
                            $(o.el).children('tspan').css('opacity', 0).addClass('ned')
                        }
                    } else {
                        if (o.type == 'path') {
                            o.p = 'M' + o.p.join('L');
                            if (c.slides[0].elements[o.i].prop.variant == 'polygon') {
                                o.p += 'z';
                            }
                            o.el.setAttribute('d', o.p);
                        } else {
                        }
                    }
                    delete o.p;
                    id = TweenMax.fromTo(o, a.dur, {'value': a.in.data.value, 'ease': 'Linear.eaeNone'}, {
                        'onUpdateScope': this,
                        'ease': 'Linear.eaeNone',
                        'data': o,
                        'value': a.out.data.value,
                        'onStartParams': [o],
                        'onStart': function (data) {
                            if (data.type == 'path') {
                                data.el.removeAttribute('d');
                            } else if (data.type == 'typo') {
                                $(o.el).children('tspan').css('opacity', 0).addClass('ned')
                                data.pos = -1;
                            }
                        },
                        'onUpdateParams': ['{self}', o, o.i],
                        'onUpdate': function (tween, data, scopeID, e) {
                            if (!tween) return;
                            e = {};
                            if (data.type == 'path' && (data.value === 'undefined' || data.value < 1)) {
                                data.el.removeAttribute('d')
                                return;
                            }
                            if (data.type == 'path') {
                                e.step = parseInt(data.value);
                                e.t = Math.floor(e.step);
                                e.p = 'M';
                                e.p += data.var.slice(0, e.t).join('L');
                                if (e.t === data.var.length && c.slides[0].elements[scopeID].prop.variant == 'polygon') e.p += 'z';
                                data.el.setAttribute('d', e.p)
                            } else if (data.type == 'typo') {
                                e.step = parseInt(data.value);
                                if (data.var[e.step] && e.step > data.pos) {
                                    $(data.el).children('tspan').filter(function (i, t) {
                                        t = data.pos + 1;
                                        if (i <= t) return true;
                                        return false;
                                    }).css('opacity', '').removeClass('ned')
                                    data.pos++;
                                }
                            }
                        }
                    })
                    storage.TweenBin[a.out.onStartParams[0].id].push(id);
                    storage.animator.add(id, a.wait);
                    delete a.out.data;
                    delete a.in.data;
                }
                a.in.overwrite = false;
                a.in.paused = true;
                a.out.overwrite = false;
                a.out.onCompleteScope = this;
                id = TweenMax.fromTo(b, a.dur, a.in, a.out);
                storage.TweenBin[a.out.onStartParams[0].id].push(id);
                storage.animator.add(id, a.wait);
                if (this.updated === true) this.updated = false;
            })
            if (storage.state !== -1) {
                e = convertTime(storage.animator.totalDuration());
                storage.dom.duration.val(e);
                storage.self.seek(storage.playHead);
            }
            return true;
        }

        function queryLayer(id, i, t) {
            t = storage.sequence.length;
            for (i = 0; t > i; i++) {
                if (storage.sequence[i].id === id) return i;
            }
            return false;
        }

        function queryLayerElement(id, e) {
            e = queryLayer(id);
            if (e === false) return e;
            e = storage.sequence[e].scope;
            return e;
        }

        function queryLayerObject(id, e) {
            e = queryLayerElement(id);
            if (e === false) return false;
            e = e.getAttribute('scope');
            id = e.substr(e.lastIndexOf('_') + 1);
            e = c.slides[id].elements[e];
            if (typeof e == 'object') return e;
            return false;
        }

        function getCurrentValues(scope, o, p, e) {
            if (!c.slides[0].elements[scope]) return false;
            scope = c.slides[0].elements[scope];
            o = {};
            e = c.domCanvas.find('.objectBox[scope="' + scope.id + '"]:first')
            p = real_offset(e);
            o = {'fillOpacity': 1, 'rotation': 0};
            if (scope.prop.r !== undefined) o.rotation = scope.prop.r;
            if (scope.prop.opacity !== undefined) o.fillOpacity = prepareCuePointValue(scope.prop.opacity, 'fillOpacity');
            o.left = p.leftab + '%';
            o.top = p.topab + '%'
            o.width = p.widthab + '%';
            o.height = p.heightab + '%';
            return o;
        }

        function prepareCuePointValue(value, key, i) {
            if (value !== null && value !== undefined) {
                value = value.toString();
                if ((i = value.indexOf('%')) && i !== -1) {
                    value = value.substr(0, i);
                }
            }
            value = parseFloat(value);
            if (!isNaN(value) && (key === 'left' || key == 'width' || key == 'top' || key == "height")) {
                if (i > 0) {
                    return (value + '%');
                }
                if (key == 'left' || key == 'width') {
                    value = (value / c.stageWidth) * 100
                } else {
                    value = (value / c.stageHeight) * 100
                }
                value += '%';
            }
            if (isNaN(value)) {
                if (key == 'rotation') return 0;
                if (key == 'fillOpacity') return 1;
            } else if (key == 'fillOpacity') {
                value = (1 / 10) * value;
            }
            return value;
        }

        function writeTimeStamp(s, o) {
            if (storage.state === -1 && storage.recording !== true) return;
            storage.dom.timecode.val(convertTime(s))
        }

        function writeCueInfo(cueID, t) {
            if (storage.state === -1) return;
            if (storage.self.cues[cueID] === undefined) return false;
            t = (storage.self.cues[cueID].dur + storage.self.cues[cueID].cue)
            storage.self.cues[cueID].e.data('title', 'Start : ' + (storage.self.cues[cueID].cue) + ' \\n ' + ' End : ' + (t).toString().substr(0, 3) + '\\n Duration : ' + (t - storage.self.cues[cueID].cue).toString().substr(0, 3))
        }

        function convertTime(s, o) {
            o = {};
            o.h = Math.floor(s / 3600)
            o.m = Math.floor(s / 60)
            o.s = ((60 / 100) * ((s / 60) - o.m)).toString()
            if (o.s.indexOf('.') > 0) o.s = o.s.split('.')[1].substr(0, 2)
            return (o.h + ' : ' + o.m + ' : ' + o.s);
        }

        function buildCue(w, o, p, s) {
            s = {};
            s.t = convertTime(o.cue);
            s.e = $('<div title data-layer-id="' + p.id + '" id="' + o.id + '" class="cue" style="left:' + (o.cue) + '%;width:' + (o.dur) + '%"><a class="anchor"></a><a class="anchor"></a></div>');
            w.append(s.e);
            s.e.draggable({
                'axis': 'x', 'snap': false, 'containment': false, 'start': function (e, u) {
                    storage.draggingCue = e.pageX;
                    storage.draggingCue_n = e.pageX;
                    storage.self.progress(u.l);
                    storage.nullOffset = storage.dom.sequence.offset().left;
                }, 'drag': function (e, u, i) {
                    u.forward = true;
                    if (u.originalPosition.left >= u.position.left) {
                        u.forward = false;
                    }
                    u.e = storage.self.cues[this.id];
                    if (u.forward) {
                        u.l = (u.position.left / storage.sequenceWidth) * 100;
                        u.l += u.e.dur;
                    } else {
                        u.l = (u.position.left / storage.sequenceWidth) * 100;
                    }
                    storage.self.progress(u.l);
                }, 'stop': function (e, u) {
                    if (u.position.left < 0) {
                        storage.self.moveCue(this.id, 0);
                    } else {
                        u.l = (u.position.left / storage.sequenceWidth) * 100;
                        storage.self.moveCue(this.id, u.l);
                    }
                }
            }).resizable({
                'handles': 'e', 'cancel': '.noresize', 'minWidth': 1, 'stop': function (e, u) {
                    storage.self.resizeCue(this.id, ((u.size.width) / storage.sequenceWidth) * 100);
                },
            })
            if (storage.switches.grab === true) {
                s.e.resizable('disable')
            }
            s.e.find(' > a.anchor').on('click', function (e, i, l) {
                e.preventDefault();
                e.stopPropagation();
                e = $(this);
                i = e.index();
                l = e.parent().get(0).id
                if (i == 0) {
                    storage.self.selectCuePoint(l);
                } else if (i == 1) {
                    storage.self.selectCuePoint(l, 'out');
                }
            })
            o.e = s.e;
        }

        function exppressAnimationLoop(name, layerID, tt, o) {
            o = {}
            o.scope = queryLayerObject(layerID);
            o.el = c.domCanvas.find('div.objectBox[scope="' + o.scope.id + '"]');
            o.xy = real_offset(o.el);
            o.tween = {};
            o.tweenLength = 3;
            o.tweenLoop = 1;
            o.p = prepareCuePointValue(o.scope.prop.opacity, 'fillOpacity');
            o.tween.fillOpacity = [o.p, o.p];
            o.r = prepareCuePointValue(o.scope.prop.r, 'rotation');
            o.tween.rotation = [o.r, o.r];
            switch (name) {
                case'slide':
                case'slide_right':
                case'slide_top':
                case'slide_bottom':
                    o.tween.left = [o.xy.leftab + '%', o.xy.leftab + '%'];
                    o.tween.top = [o.xy.topab + '%', o.xy.topab + '%'];
                    o.tween.left[1] = prepareCuePointValue(o.xy.left, 'left');
                    if (name == 'slide') {
                        o.tween.left[0] = prepareCuePointValue(-(o.xy.width + 10), 'left');
                    } else if (name == 'slide_right') {
                        o.tween.left[0] = prepareCuePointValue(c.stageWidth + 10, 'left')
                    } else if (name == 'slide_top') {
                        o.tween.top[0] = prepareCuePointValue(-(o.xy.height + 10), 'top');
                        o.tween.top[1] = prepareCuePointValue(o.xy.top, 'top');
                    } else {
                        o.tween.top[0] = prepareCuePointValue((c.stageHeight + 10), 'top');
                        o.tween.top[1] = prepareCuePointValue(o.xy.top, 'top');
                    }
                    break;
                case'zoom_fade':
                    o.tween.scaleX = [1, 2];
                    o.tween.scaleY = [1, 2];
                    o.tween.fillOpacity = [1, 0];
                    break;
                case'zoom':
                case'entrance':
                    if (name == 'zoom') {
                        o.tween.scaleX = [0, 1];
                        o.tween.scaleY = [0, 1];
                    } else {
                        o.tween.scaleX = [10, 1];
                        o.tween.scaleY = [10, 1];
                    }
                    break;
                case'fade':
                    o.tween.fillOpacity = [0, o.p]
                    break;
                case'grow':
                    o.tween.top = [(o.xy.topab + o.xy.heightab) + '%', o.xy.topab + '%'];
                    o.tween.height = [0, o.xy.heightab + '%'];
                    o.tweenLength = 0.5;
                    break;
                case'swoop':
                    o.tween.loop = [];
                    o.tween.loop.push({
                        scaleX: [0, 0.8],
                        scaleY: [0, 0.8],
                        left: [(o.xy.leftab + 50) + '%', o.xy.leftab - 50 + '%']
                    })
                    o.tween.loop.push({
                        scaleX: [0.8, 1],
                        scaleY: [0.8, 1],
                        left: [(o.xy.leftab - 50) + '%', o.xy.leftab + '%']
                    })
                    break;
                case'newsflash':
                    o.tween.scaleX = [0, 1];
                    o.tween.scaleY = [0, 1];
                    o.r = o.scope.prop.r | 0;
                    if (o.r == 0) {
                        o.r = 360;
                    }
                    o.tween.rotation = [360, -o.r];
                    break;
                case'stagger':
                case'buzz':
                    o.tween.loop = [];
                    if (name == 'buzz') {
                        o.tween.loop.push({'left': [(o.xy.leftab + 11) + '%', (o.xy.leftab - 11) + '%'],})
                        o.tween.loop.push({'left': [(o.xy.leftab - 11) + '%', (o.xy.leftab + 11) + '%'],})
                        o.tween.loop.push({'left': [(o.xy.leftab + 11) + '%', (o.xy.leftab - 11) + '%'],})
                        o.tween.loop.push({'left': [(o.xy.leftab - 11) + '%', (o.xy.leftab + 11) + '%'],})
                        o.tween.loop.push({'left': [(o.xy.leftab + 11) + '%', (o.xy.leftab - 11) + '%'],})
                        o.tween.loop.push({'left': [(o.xy.leftab - 11) + '%', (o.xy.leftab + 11) + '%'],})
                        o.tween.loop.push({'left': [(o.xy.leftab + 11) + '%', (o.xy.leftab - 11) + '%'],})
                        o.tween.loop.push({'left': [(o.xy.leftab - 11) + '%', o.xy.leftab + '%'],})
                    } else {
                        o.tween.loop.push({
                            'rotation': [0, 10],
                            'left': [(o.xy.leftab - 11) + '%', (o.xy.leftab + 11) + '%']
                        })
                        o.tween.loop.push({
                            'left': [(o.xy.leftab + 11) + '%', (o.xy.leftab) + '%'],
                            'rotation': [10, 0]
                        })
                    }
                    o.tweenLength = 0.2;
                    break;
                case'bounce':
                    o.tweenLength = 0.2;
                    o.tween.loop = [];
                    o.tween.loop.push({'top': [(o.xy.topab + '%'), (o.xy.topab - 11) + '%'],})
                    o.tween.loop.push({'top': [(o.xy.topab - 11) + '%', (o.xy.topab + 11) + '%'],})
                    o.tween.loop.push({'top': [(o.xy.topab + 11) + '%', (o.xy.topab - 11) + '%'],})
                    o.tween.loop.push({'top': [(o.xy.topab - 11) + '%', (o.xy.topab + 11) + '%'],})
                    o.tween.loop.push({'top': [(o.xy.topab + 11) + '%', (o.xy.topab - 11) + '%'],})
                    o.tween.loop.push({'top': [(o.xy.topab - 11) + '%', (o.xy.topab + 11) + '%'],})
                    o.tween.loop.push({'top': [(o.xy.topab + 11) + '%', (o.xy.topab - 11) + '%'],})
                    o.tween.loop.push({'top': [(o.xy.topab - 11) + '%', (o.xy.topab + 11) + '%'],})
                    o.tween.loop.push({'top': [(o.xy.topab + 11) + '%', (o.xy.topab - 11) + '%'],})
                    o.tween.loop.push({'top': [(o.xy.topab - 11) + '%', o.xy.topab + '%'],})
                    break;
                case'roll':
                    o.tween.left = [prepareCuePointValue(-(o.xy.width + 10), 'left'), prepareCuePointValue(o.xy.left, 'left')];
                    o.tween.top = [o.xy.topab + '%', o.xy.topab + '%'];
                    o.r = o.scope.prop.r | 0;
                    if (o.r == 0) {
                        o.r = 360;
                    }
                    o.tween.rotation = [360, -o.r];
                    break;
                case'rise':
                    o.tween.loop = [];
                    o.tween.loop.push({
                        'top': [prepareCuePointValue((c.stageHeight + 10), 'top'), prepareCuePointValue(o.xy.top, 'top')],
                        'left': [o.xy.leftab + '%', o.xy.leftab + '%'],
                        'duration': 0.8
                    })
                    o.tp = o.tween.loop[0].top[1];
                    o.tween.loop.push({'duration': 1, 'top': [o.tp, (o.xy.topab + 10) + '%']})
                    o.tween.loop.push({'duration': 3, 'top': [(o.xy.topab + 10) + '%', (o.xy.topab) + '%']})
                    break;
                case'flash':
                    o.tween.loop = [];
                    o.tween.loop.push({'fillOpacity': [1, 0]})
                    o.tween.loop.push({'fillOpacity': [1, 0]})
                    o.tween.loop.push({'fillOpacity': [1, 1]})
                    o.tweenLength = 0.5;
                    break;
                case'wheel':
                    o.r = o.scope.prop.r | 0;
                    if (o.r == 0) {
                        o.r = 360;
                    }
                    o.tween.rotation = [360, -o.r];
                    o.tweenLength = 0.8;
                    o.tweenLoop = 1;
                    break;
                case'pulse':
                case'push':
                    o.tween.loop = [];
                    if (name == 'push') {
                        o.tween.loop.push({'scaleX': [1, .8], 'scaleY': [1, .8],})
                        o.tween.loop.push({'scaleX': [.8, 1], 'scaleY': [.8, 1],})
                    } else {
                        o.tween.loop.push({'scaleX': [1, 0.8], 'scaleY': [1, 0.8],})
                        o.tween.loop.push({'scaleX': [.8, 1], 'scaleY': [.8, 1],})
                        o.tween.loop.push({'scaleX': [1, .8], 'scaleY': [1, .8],})
                        o.tween.loop.push({'scaleX': [.8, 1], 'scaleY': [.8, 1],})
                    }
                    o.tweenLength = 0.8;
                    break;
                case'glow':
                    o.tween.loop = []
                    o.tween.loop.push({
                        'strokeWidth': [0, 4],
                        'strokeDasharray': [0, 0],
                        'scaleX': [1, 1.2],
                        'scaleY': [1, 1.2],
                    })
                    o.tween.loop.push({'strokeWidth': [4, 0], 'scaleX': [1.2, 1], 'scaleY': [1.2, 1],})
                    o.tweenLoop = 2;
                    o.tweenLength = 1;
                    break;
                case'path.drawing':
                case'path.eraser':
                    if (o.scope.prop.cmd === undefined) {
                        alertMessage('error', 'Only path elements are supported for animation');
                        return false;
                    }
                    o.cmd = o.scope.prop.cmd.split(' ');
                    o.path = o.el.find('.object > svg path:first').get(0);
                    o.cmd = {'type': 'path', 'var': o.cmd, 'value': o.cmd.length, 'el': o.path};
                    if (name == 'path.drawing') {
                        o.tween.loop = [{'data': [{'value': 0, 'type': o.cmd.type}, o.cmd]}]
                    } else {
                        o.tween.loop = [{'data': [o.cmd, {'value': 0, 'type': o.cmd.type}]}]
                    }
                    delete o.cmd;
                    delete o.path;
                    break;
                case'typo.typing':
                case'typo.eraser':
                    if (o.scope.prop.sym !== 'text') {
                        alertMessage('error', 'Supported for only text elements');
                        return false;
                    }
                    o.g = o.el.find('.object > svg g:first text:first').get(0);
                    o.cmd = {
                        'type': 'typo',
                        'var': o.scope.prop.source,
                        'value': o.scope.prop.source.length,
                        'el': o.g
                    };
                    o.tween.loop = [{'data': [{'value': 0, 'type': o.cmd.type}, o.cmd]}]
                    break;
            }
            if (o.tween.loop) {
                o.tweenLoop = o.tween.loop.length;
            }
            o.start = storage.playHead;
            return o;
        }

        function buildUi(i, t, e) {
        }
    }

    function loadLib(lib, libin) {
        lib = Object.keys(c.libs);
        if (libin === undefined) libin = 0;
        if (libin === lib.length) {
            c.editor_loading = window.setInterval(function () {
                if (c.libs.bg_colors === false) return;
                if (c.libs.bg_gradients === false) return;
                if (c.libs.fonts === false) return;
                if (c.libs.texts === false) return;
                if (c.libs.buttons === false) return;
                if (c.libs.shapes === false) return;
                if (Object.keys(c.bg_textures_string).length < c.libs.bg_textures) {
                    return;
                }
                if (c.isRoller === true && typeof c.rollerTPL !== 'object') return;
                if (typeof c.libs.shapes !== 'object') return;
                if (typeof c.libs.tpl !== 'object') return;
                if (c.fontsLoaded !== true) return;
                if (c.sceneReadyInit !== true) return;
                clearInterval(c.editor_loading);
                c.domEditorBase.hide(0).removeClass('d-none').fadeIn(0).trigger('ready');
            }, 200)
            a = [];
            c.fonts_string = [];
            c.fontMax = 50;
            c.fontMin = 0;
            c.defaultConfig.maxDimensionLimit = [parseFloat(c.policySetup.MAX_WIDTH), parseFloat(c.policySetup.MAX_HEIGHT)];
            if (c.policySetup.PUBLIC_FONT_REPO == "") c.policySetup.PUBLIC_FONT_REPO = location.origin; else c.policySetup.PUBLIC_FONT_REPO = location.protocol + '//' + c.policySetup.PUBLIC_FONT_REPO;
            if (c.policySetup.PUBLIC_SHAPE_REPO == "") c.policySetup.PUBLIC_SHAPE_REPO = location.origin; else c.policySetup.PUBLIC_SHAPE_REPO = location.protocol + '//' + c.policySetup.PUBLIC_SHAPE_REPO;
            if (c.policySetup.PUBLIC_IMAGE_REPO == "") c.policySetup.PUBLIC_IMAGE_REPO = location.origin; else c.policySetup.PUBLIC_IMAGE_REPO = location.protocol + '//' + c.policySetup.PUBLIC_IMAGE_REPO;
            j.each(c.libs.fonts, function (i, e, f, ii) {
                f = Object.values(e);
                for (ii = 0; f.length > ii; ii++) {
                    if (f[ii] == 0) continue;
                    a.push('@font-face{font-family:"' + f[ii] + '";src: url("' + c.policySetup.PUBLIC_FONT_REPO + '/library/fonts/' + i + '/' + f[ii] + '.ttf")}');
                    if (c.fontMax === 0 || c.fontMax > c.fontMin) {
                        ff = c.domDocBody.append('<div class="font-test inactive" data-font="' + f[ii] + '" style="font-family:Comic Sans;font-size:250px">Fonts</div>').children(':last');
                        ff.attr('data-fontWidth', ff.outerWidth())
                    }
                    c.fontMin++;
                }
                c.fonts_string.push('<option style="font-family:' + e.normal + '" ref="' + e.normal + '" value="' + i + '">' + i.toUpperCase() + '</option>');
            });
            if (a.length > 0) {
                i = document.createElement('style');
                i.appendChild(document.createTextNode(a.join("\n")));
                document.head.appendChild(i);
                c.fontTesting = function (f) {
                    f = c.domDocBody.find('div.font-test.inactive');
                    if (f.length == 0) {
                        clearInterval(c.fontTester);
                        c.fontsLoaded = true;
                        c.domEditorBase.trigger('fontLoaded');
                        return;
                    }
                    if (f.length > 0 && c.fontsLoaded >= 50) {
                        clearInterval(c.fontTester);
                        c.fontsLoaded = true;
                        c.domEditorBase.trigger('fontLoaded');
                        return;
                    }
                    if (c.fontsLoaded) {
                        c.fontsLoaded++;
                    } else {
                        c.fontsLoaded = 1;
                    }
                    f.each(function (w, w2, i, f) {
                        w = $(this).attr('data-fontWidth');
                        f = $(this).data('font');
                        this.style.fontFamily = '"' + f + '","Comic Sans"'
                        w = parseFloat(w);
                        w2 = $(this).outerWidth();
                        i = $(this).attr('testLength');
                        if (i) {
                            $(this).attr('testLength', parseInt(i) + 1);
                        } else {
                            $(this).attr('testLength', 1);
                        }
                        if (w !== w2) {
                            $(this).remove();
                        }
                    })
                }
                c.fontTestDone = 0;
                c.fontTester = setInterval(function () {
                    c.loaderTextHelper.text('Loading Fonts');
                    c.fontTesting();
                    c.fontTestDone++;
                }, 200)
            }
            c.domEditorBase.on('fontLoaded', function (e) {
                c.fontsLoaded = false;
                c.loaderTextHelper.text('Loading Filters');
                e = new Image;
                e.src = 'assets/img/oval.svg';
                $.ajax({
                    'url': location.origin + '/library/filters.svg?' + Math.random(),
                    'dataType': 'html',
                }).done(function (r) {
                    e = $(r).find('defs > filter[id]');
                    if (e.length == 0) return;
                    c.filters = {};
                    c.filterMap = {};
                    for (i = 0; e.length > i; i++) {
                        label = e[i].getAttribute('inkscape:label');
                        group = e[i].getAttribute('inkscape:menu');
                        info = e[i].getAttribute('inkscape:menu-tooltip');
                        id = e[i].id;
                        if (!group) continue;
                        if (!label) continue;
                        if (!c.filters[group]) c.filters[group] = {'name': group, 'items': []};
                        x = $(e[i]).children();
                        c.filters[group].items.push({'name': label, 'title': info, 'filters': x, 'id': id});
                        c.filterMap[id] = {'g': group, 'i': (c.filters[group].items.length - 1)}
                        svgObList['fx2' + id] = svgObList.customFx;
                        c.svgEffectsList['fx2' + id] = {};
                    }
                    a = $('#objectpack_effects > div.p-1').addClass('w-100 fancyscroll');
                    $.each(c.filters, function (i, f) {
                        f = '';
                        for (i = 0; this.items.length > i; i++) {
                            f += '<li title="' + this.items[i].title + '" data-id="' + this.items[i].id + '"><a href="#"><span class="text-current">' + this.items[i].name + '</span></a></li>';
                        }
                        a.append('<div class="card"><div class="card-header p-0 text-current" title="' + this.name + '">' + this.name + '</div><div class="card-block d-none text-current bg-current"><ul class="p-3">' + f + '</ul></div></div>')
                    })
                    a.find('.card').on('click', 'li[data-id]', function (e) {
                        e.preventDefault();
                        e = $(this).data('id')
                    }).find('.card-header').on('click', function (e) {
                        e = $(this);
                        if (e.hasClass('active')) {
                            e.removeClass('active');
                            e.next().addClass('d-none')
                        } else {
                            e.addClass('active');
                            e.next().removeClass('d-none')
                        }
                    }).next().find('ul li').on('click', function (e, id, main, p) {
                        e = $(this).data('id');
                        if (!svgObList['fx2' + e]) return;
                        if (!c.currentActive) {
                            alertMessage('error', c.language('editor_ui_msg_effectnolayer'))
                            return;
                        }
                        id = c.currentActive.attr('scope');
                        main = c.idCache[c.slides[0].elements[id].prop.uid].fx;
                        p = {};
                        p['fx2' + e] = c.svgEffectsList['fx2' + e];
                        notify('obj.beforeFx', {'obj': id, 'ref': 'fx2' + e});
                        main.load(p);
                        main.applyAll('fx2' + id, true);
                        c.slides[0].elements[id].prop['fx2' + e] = main.fx['fx2' + e].options;
                        notify('obj.afterFx', {'obj': id, 'ref': 'fx2' + e});
                        if (c.isPerpertyOpen && c.isPerpertyTab == 'fx' && main.onActivate) {
                            main.activeFx = 'fx2' + e;
                            main.onActivate();
                        }
                    })
                }).always(function () {
                    c.loaderTextHelper.text('Loading Plugins');
                    c.pluginManagerSetup = {
                        'estore_browser': {
                            'host': null,
                            'config': {},
                            'id': 'estore_browser',
                            'state': 0,
                            'name': 'App store'
                        }
                    };
                    c.pluginManagerSetup['sharer'] = {
                        'host': null,
                        'config': {},
                        'id': 'sharer',
                        'state': 0,
                        'name': 'Share project'
                    };
                    $.get(location.origin + '/editor/loadext.php', function (r, o, i) {
                        o = {};
                        c.pluginManager = {};
                        i = {};
                        $.each(r, function (e, n) {
                            e = {};
                            n = this.name.replace(/\s/g, '_').toLowerCase()
                            if (i[n]) {
                                i[n]++;
                            } else {
                                i[n] = 1;
                            }
                            if (i[n] > 1) {
                                n = n + i[n];
                                this.name = this.name + ' ' + i[n]
                            }
                            o['ext.run.' + n] = {'name': this.name, 'items': e}
                            this.id = n;
                            this.state = 0;
                            c.pluginManagerSetup[n] = this;
                        })
                        c.contextBuild.app.ext.items = o;
                    }, 'json').always(function () {
                        c.loaderTextHelper.text('Loading assets folders');
                        $.get(location.origin + '/editor/loadfolder.php', function (r) {
                            c.assetsList = r;
                        }, 'json').always(function () {
                            c.fontsLoaded = true;
                            c.domEditorBase.trigger('lastLoaded');
                        })
                    })
                })
            })
            a = $('#objectpack_texts > div.p-1');
            j.each(c.libs.texts, function (ref, e, p) {
                p = parseTemplates('texts', e.text);
                if (e.sd) {
                    p.shadow = parseTemplates('shadow', e.sd);
                }
                if (e.t) {
                    p.opacity = parseTemplates('transparency', e.t);
                }
                if (e.b) {
                    p.blur = parseTemplates('blur', e.b);
                }
                if (e.bd) {
                    p.border = parseTemplates('border', e.bd);
                }
                a.append('<div  class="card d-flex m-0 loaded object" draggable data-object="texts" data-object-ref="' + ref + '"><div class="card-block p-0 pt-2" data-object-ref="texts"><span>This is just text. That\'s it</span></div></div>');
                e = a.children('div.card[data-object-ref="' + ref + '"]').find('span');
                applyPropertyOption(e, {'text': p});
                applyPropertyOption(e, p);
                e.css('color', '')
            });
            a.addClass('loaded');
            a = c.domLibraryContainers.filter('#objectpack_emoji').find('.tab-content .tab-pane').append('<div class="p-2 row m-0 fancyscroll scroll-y" />').find('.row').css('max-height', 500);
            $.each(c.libs.emoji, function (k) {
                a.last().append('<div data-object="sprite" data-object-ref="' + k + '" class="loaded loaded object drag"><img src="' + location.origin + '/library/emoji/preview/' + k + '.gif" class="img-fluid" /></div>');
                a.first().append('<div data-object="sticker" data-object-ref="' + k + '" class="loaded loaded object drag"><img src="' + location.origin + '/library/emoji/frames/' + k + '/frame_' + this.end + '.svg" class="img-fluid" /></div>');
            })
            a.addClass('loaded');
            a = c.domLibraryContainers.filter('#objectpack_bg').find('.tab-content > #editor_material_color .row:first > div.col-12:first');
            k = $('<div class="row ml-3"></div>');
            k.appendTo(a);
            d = 0;
            j.each(Object.keys(c.libs.bg_colors), function (hu, hx) {
                if (d == 7) {
                    k = $('<div class="row ml-3"></div>');
                    k.appendTo(a);
                    d = 0;
                }
                d++;
                k.append('<div data-object="bg_colors" data-object-ref="' + hx + '" class="card col-1 loaded object" data-lib-link="' + hx + '" style="background-color: #' + hx + ';margin-bottom:0;margin-top:2px;margin-left:5px"></div>');
                if (hx == '00000000') {
                    k.children().last().css('background', 'url(library/bg_textures/tmb/transparency.jpg)')
                    delete c.libs.bg_colors[hx];
                }
            })
            a.nextAll('div').css('flex-wrap', 'wrap')
            a.parent().addClass('loaded fancyscroll').prevAll('.pick_color:first').colorGold().on('colorupdate', function (e, cl) {
                if (!notify('screen.beforePaint', {'ref': 'colors'})) return;
                this.style.backgroundColor = cl.color;
                e = c.domCanvas.children('div:visible:first');
                e.css('background', cl.color);
                c.slides[e.index()].background = {'color': cl.color};
                notify('screen.afterPaint');
            })
            a = $('#objectpack_bg .tab-content > #editor_material_gradient > .row:last');
            k = Object.keys(c.libs.bg_gradients);
            d = Object.values(c.libs.bg_gradients);
            e = {};
            gradn = {};
            for (i = 0; k.length > i; i++) {
                b = k[i].split('-')[0];
                if (e[b] !== true) {
                    e[b] = true;
                    gradn[b] = {'deg': d[i].deg, 'stops': [], 'mode': d[i].type};
                    angle = d[i].deg.replace('deg', '');
                    angle = degToRad(angle);
                    angle = poa(angle);
                    gradn[b].degabs = angle;
                } else {
                    gradn[b].stops.push({'color': d[i].stop, 'offset': d[i].offset});
                }
            }
            k = Object.keys(gradn);
            for (i = 0; k.length > i; i++) {
                b = k[i];
                a.append('<div data-object="bg_gradients" data-object-ref="' + b + '" class="card object  col-3 loaded" style="margin-bottom:0;margin-top:5px;"></div>');
                grad = a.find('div[data-object]:last');
                gradl = [];
                $.each(gradn[b].stops, function () {
                    gradl.push('' + this.color + ' ' + this.offset);
                })
                if (gradn[b].mode == 'r') {
                    c.bg_gradients_string[b] = 'radial-gradient(' + gradn[b].deg + ',' + gradl.join(',') + ')';
                } else {
                    c.bg_gradients_string[b] = 'linear-gradient(' + gradn[b].deg + ',' + gradl.join(',') + ')';
                }
                grad.css('background', c.bg_gradients_string[b]);
            }
            c.bg_gradients_native = gradn;
            a.addClass('loaded fancyscroll');
            a.prevAll('.row').find('button:first').on('click', function (a, d, e, n) {
                a = $(this).parents('.row');
                d = $(this);
                if (d.hasClass('open')) {
                    d.next('.gradient_markup_wrapper').remove();
                    a.next('.row').show(0);
                    d.html('Customize').removeClass('open btn-link').addClass('btn')
                    return;
                }
                d.html('<span class="fa-lg os-icon os-icon-close"></span>').removeClass('btn');
                a.next('.row').hide(0);
                d.addClass('open btn-link');
                e = {};
                e.apply = function (e, u) {
                    if (!notify('screen.beforePaint', {'ref': 'gradient'})) return;
                    u = {};
                    u.stops = [];
                    u.deg = e.angle;
                    u.mode = e.type.substr(0, 1);
                    if (u.mode == 'l') {
                        u.deg += 'deg';
                    } else {
                        u.deg = 'center at ' + u.deg + '%';
                    }
                    $.each(e.items, function (i, t) {
                        t = $.trim(t);
                        t = t.split(' ');
                        u.stops.push({'color': t[0], 'offset': t[1]})
                    })
                    e.d = c.domCanvas.children('div:visible:first');
                    c.slides[e.d.index()].background = {'gradient': u};
                    e.d.css('background', e.colorMap);
                    notify('screen.afterPaint', {'ref': 'gradient'})
                };
                d = c.domCanvas.children('div:visible:first').index();
                if (!isNaN(parseInt(c.slides[d].background.gradient))) {
                    n = $.extend({}, false, c.bg_gradients_native[c.slides[d].background.gradient])
                } else if (typeof c.slides[d].background.gradient == 'object') {
                    n = $.extend({}, false, c.slides[d].background.gradient);
                }
                if (n) {
                    e.items = n.stops;
                    e.angle = n.deg;
                    e.type = n.mode;
                    if (e.type == 'l') {
                        e.type += 'inear';
                    } else {
                        e.type = 'radial';
                    }
                    e.angle = e.angle.replace(/[^\d.]/g, '');
                    if (e.angle == '') e.angle = 50;
                }
                a.addClass('d-block').gradientGold(e);
            })
            a = $('#objectpack_bg .tab-content > #editor_material_pattern .row:last');
            c.randomPatternPalette(a);
            a.addClass('fancyscroll');
            a = $('#objectpack_shapes').addClass('hasobject').find('.shape_wrapper:first').attr('id', 'objectpack_shapes_in').addClass('fancyscroll');
            j.each(c.libs.shapes, function (i, e) {
                a.append('<div class="p-1 row m-0"><h6 href="#shape_' + i + '" data-toggle="collapse" data-parent="#objectpack_shapes_in">' + i.toUpperCase() + '</h6><div class="row collapse"  id="shape_' + i + '" data-shape-ref="' + i + '"></div></div>');
                j.get(location.origin + '/library/shapes/' + i + '/' + i + '.cf', function (e) {
                    e = JSON.parse(e);
                    c.libs.shapes[i] = e;
                })
            })
            c.libs.tpl = {};
            a.parents('#objectpack_tpl').addClass('loaded pl-0 m-1').removeClass('p-4');
            $('#objectpack_shapes > #objectpack_shapes_in > .row > h6[href]').on('click', function (e, i) {
                e = $(this).parent();
                $('#objectpack_shapes > #objectpack_shapes_in > .row > .row.d-flex').removeClass('d-flex show').empty();
                b = '<div data-object="shape" class="col-3 m-0 object loading" draggable>' + loader + '</div>';
                i = $(this).next('div');
                e = Object.values(c.libs.shapes[i.attr('data-shape-ref')]).length;
                i.addClass('d-flex').append(b.repeat(e));
                updateLoadables('shapes');
                $('#objectpack_shapes > #objectpack_shapes_in').scrollTop($(this).position().top)
            })
            c.isTPL_launch = false;
            mdDialog(function () {
                this.title = '';
                this.size = 'large';
                this.footer = false;
                this.displayMode = 0;
                if (window.projects !== undefined) {
                    this.projectsAll = projects;
                    window.projects = null;
                }
                this.onhide = function () {
                    this.projectMenu.hide();
                    c.domEditorBase.css('filter', '')
                    this.modal.removeClass('bg-current').find('.modal-dialog:first').addClass('bg-current')
                    if (c.isRoller && Object.keys(c.rollerSizes).length > 0 || c.workSpaceReady) {
                        c.startpage.tab_panes.start_all_projects_row.empty();
                        return;
                    }
                    delete c.startpage;
                    this.destroy();
                    location.href = location.origin + '/front.php';
                }
                this.oninit = function () {
                    c.startpage = this;
                    this.modal = $(this.target);
                    this.body = this.modal.find('.modal-body').css('minHeight', $(window).height() / 2);
                    this.settitle('<div class="clearfix close" data-close><span class="fa fa-close float-right" style="cursor:pointer"></span></div>');
                    this.body.append('<div class="row"><div class="col-12 col-sm-12 col-md-4 col-xl-2"><div><a class="btn" href="#start_all_templates"><span class="fa fa-folder"></span> ' + c.language('editor_ui_strttab1') + '</a><a class="btn" href="#start_new_presets"><span class="fa fa-folder"></span> ' + c.language('editor_ui_strtcs') + '</a><a class="btn" href="#start_all_projects"><span class="fa fa-folder-open"></span> ' + c.language('editor_ui_strtbrws') + '</a></div></div><div class="col-xl-9 col-md-8 col-12"></div></div>')
                    $(this.target + ' .modal-header').find('div[data-close] span').click(function () {
                        if (c.isRoller === true && Object.keys(c.rollerSizes).length > 0 || c.workSpaceReady) {
                            c.startpage.projectMenu.hide();
                            c.startpage.tab_panes.start_all_projects_row.empty();
                            c.startpage.minimize();
                            c.domEditorBase.css('filter', '');
                            c.startpage.tab_panes.start_all_templates_row.empty();
                            c.startpage.tab_panes.start_all_templates_loader.addClass('d-none')
                            c.startpage.modal.removeClass('bg-current').find('.modal-dialog:first').addClass('bg-current')
                            return;
                        }
                        c.startpage.close();
                    });
                    this.rightBox = this.body.find('.row > div:last')
                    this.navLinks = this.body.find('.row > div:first a').on('click', function (e, i, a) {
                        e.preventDefault();
                        a = this.getAttribute('href').substr(1);
                        c.startpage.navLinks.removeClass('active').css('opacity', '0.5')
                        i = $(this).addClass('active').css('opacity', 1).index();
                        $.each(c.startpage.tab_panes, function (k, v) {
                            if (k == 'start_all_templates' || k == 'start_new_presets' || k == 'start_all_projects') {
                                v.addClass('d-none');
                            }
                        })
                        c.startpage.currentTarget = i;
                        c.startpage.tab_panes[a].removeClass('d-none');
                        c.startpage.tab_panes.start_all_templates_row.empty();
                        c.startpage.rightBox.prev().find('.catlist').remove();
                        if (a == 'start_all_projects') {
                            c.startpage.tab_panes.start_all_projects_row.masonry()
                        } else if (a == 'start_all_templates') {
                            c.startpage.tplNo = 0;
                            if (c.startpage.tab_panes.start_all_templates_row.hasClass('masi')) {
                                c.startpage.tab_panes.start_all_templates_row.masonry('destroy')
                            }
                            c.startpage.loadTPLCats();
                        }
                    });
                    this.navLinks.eq(1).addClass('active').css('opacity', '0.5');
                    this.projectMenu = $('<div></div>')
                    this.projectMenu.menu({
                        'items': $.map(['Edit', 'Share', 'png', 'mp4', 'gif', 'html', 'Delete'], function (e, i) {
                            i = e.toLowerCase();
                            if (i != 'edit' && i != 'delete' && i != 'share') {
                                e = c.language('editor_ui_dwn') + ' ' + e.toUpperCase();
                            }
                            if (i == 'edit') {
                                e = c.language('editor_ui_strtmenedit');
                            } else if (i == 'share') {
                                e = c.language('editor_ui_strtmenshr')
                            } else if (i == 'delete') {
                                e = c.language('editor_ui_del');
                            }
                            e = '<a href="#" data-value="' + i + '">' + e + '</a>';
                            return e;
                        }), 'init': function (e, u) {
                            u.menu.css('zIndex', 10000)
                            u.menu.find('.menu ul > li').addClass('ml-3').find('a[data-value]').on('click', function (id, e, t) {
                                id.preventDefault();
                                e = c.startpage.projectMenu.element.parents('.item');
                                id = e.data('id');
                                id = parseInt(id);
                                if ((!isNaN(id) && typeof id == 'number') == false) {
                                    return;
                                }
                                t = $(this).data('value');
                                if (t == 'edit') {
                                    location.href = location.origin + '/edit?q=' + id;
                                } else if (t == 'share') {
                                    c.shareOption(id);
                                } else if (t == 'delete') {
                                    custom_prompt(function () {
                                        $.ajax({
                                            'url': location.origin + '/editor/deljob.php?q=' + id,
                                            'dom': e
                                        }).done(function () {
                                            c.startpage.tab_panes.start_all_projects_row.masonry('remove', this.dom).masonry('layout')
                                        }).always(function () {
                                            prompt_dialog.destroy();
                                        })
                                    })
                                } else {
                                    c.pushDownload(id, t);
                                }
                                c.startpage.projectMenu.hide();
                            })
                        }
                    })
                    this.projectMenu = this.projectMenu.menu('widget');
                    this.projectMenu.init();
                    this.modal.on('scroll', function (f) {
                        if (c.startpage.currentTarget !== 2 && c.startpage.currentTarget !== 0) return;
                        f = c.startpage.modal.scrollTop() + c.startpage.modal.innerHeight();
                        if (f >= c.startpage.modal[0].scrollHeight) {
                            if (c.startpage.currentTarget == 2) {
                                c.startpage.loadProjects();
                            } else if (c.startpage.currentTarget == 0) {
                                c.startpage.loadTPL();
                            }
                        }
                    })
                    $(this.target + ' .modal-dialog').addClass('big').css({'max-width': '85%'}).parent().addClass('bg-current').find('.modal-content').css({
                        'boxShadow': 'none',
                        'background-color': 'transparent',
                        'border': 0
                    }).find('.modal-header').addClass('d-block').css({'border': 0}).nextAll('.modal-footer').css({'border': 0})
                    this.rightBox.append('<div class="w-100 d-none" id="start_all_templates"></div><div id="start_new_presets"></div><div id="start_all_projects" class="w-100 d-none"></div>')
                    this.tab_panes = {};
                    e = this.rightBox.children('#start_all_projects,#start_new_presets,#start_all_templates');
                    e.each(function () {
                        c.startpage.tab_panes[this.id] = $(this);
                    })
                    c.startpage.tab_panes.start_all_projects.append('<div class="row"></div><div><button class="btn btn-block">' + c.language('editor_ui_lazyload') + '</button></div>');
                    c.startpage.tab_panes.start_all_templates.append('<div class="alert alert-info"><p class="h4 center text-gray-dark">More templates coming</p></div><div class="row"></div><div><button class="btn btn-block">' + c.language('editor_ui_lazyload') + '</button></div>');
                    c.startpage.tab_panes.start_all_templates_row = c.startpage.tab_panes.start_all_templates.find('.row:first');
                    c.startpage.tab_panes.start_all_templates_loader = c.startpage.tab_panes.start_all_templates_row.next().find('button:first').click(function () {
                        c.startpage.loadTPL();
                    }).addClass('d-none')
                    c.startpage.tab_panes.start_all_projects_row = c.startpage.tab_panes.start_all_projects.find('div:first');
                    c.startpage.tab_panes.start_all_projects_loader = c.startpage.tab_panes.start_all_projects_row.next().find('button:first').click(function () {
                        c.startpage.loadProjects();
                    }).addClass('d-none');
                    c.startpage.tab_panes.start_all_projects_row.on('click', '.item .toolbar a', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        c.startpage.projectMenu.element = $(this);
                        if (c.startpage.projectMenu.menu.is(':visible')) {
                            c.startpage.projectMenu.reposition();
                        } else {
                            c.startpage.projectMenu.show();
                        }
                    })
                    c.startpage.tab_panes.start_all_projects_row.on('click', '.item', function (e) {
                        e.preventDefault();
                        e = $(this).data('id');
                        bigloader();
                        $.get(location.origin + '/editor/loadjob.php?q=' + e, function (r) {
                            c.bigSpinnrer.close();
                            c.startpage.apply([r.width, r.height]);
                            f = function (r) {
                                c.domCanvas.empty();
                                c.domSlidesWrapper.empty();
                                c.slides = [];
                                c.history = [];
                                c.idCache = {};
                                c.ID = r.ID;
                                c.IDmeta = r.meta;
                                c.idCache = {};
                                c.workSpaceReady = false;
                                c.domScreenAdd.trigger('click');
                                c.workSpaceReady = true;
                                if (c.TL) {
                                    c.TL.clear();
                                }
                                f = c.domCanvas.children(':first');
                                buildTPL(r.slides[0], f);
                                c.slides = r.slides;
                                notify('workspace.afterLoadSlides');
                                window.history.replaceState('', '', '/edit?q=' + r.ID);
                            }
                            if (c.workSpaceReady) {
                                f(r);
                                return;
                            }
                            Events.one('workspace.ready', 'after', function () {
                                this.data.callback(this.data.r)
                            }, {'callback': f, 'r': r})
                        }, 'json').fail(function () {
                            c.bigSpinnrer.close();
                            toastr.error(c.language('editor_ui_msg_prjloaderr'));
                        })
                    })
                    c.startpage.tab_panes.start_all_templates_row.on('click', '.item', function (e) {
                        e.preventDefault();
                        e = $(this).data('id');
                        if (!notify('workspace.beforeLoadTpl', {'id': e})) return;
                        bigloader();
                        $.get(location.origin + '/editor/loadtpl.php?type=data&q=' + e, function (r, f) {
                            c.bigSpinnrer.close();
                            c.startpage.apply([r.width, r.height]);
                            f = function (r) {
                                c.domCanvas.empty();
                                c.domSlidesWrapper.empty();
                                c.slides = [];
                                c.history = [];
                                c.idCache = {};
                                delete c.ID;
                                c.idCache = {};
                                c.workSpaceReady = false;
                                c.domScreenAdd.trigger('click');
                                c.workSpaceReady = true;
                                if (c.TL) {
                                    c.TL.clear();
                                }
                                f = c.domCanvas.children(':first');
                                buildTPL(r.slides[0], f);
                                c.slides = r.slides;
                                window.history.replaceState('', '', '/edit');
                                notify('workspace.afterLoadTpl');
                                c.startpage.tab_panes.start_all_templates_row.empty();
                                c.startpage.tab_panes.start_all_templates_loader.addClass('d-none')
                            }
                            if (c.workSpaceReady) {
                                f(r);
                                return;
                            }
                            Events.one('workspace.ready', 'after', function () {
                                this.data.callback(this.data.r)
                            }, {'callback': f, 'r': r})
                        }, 'json').fail(function () {
                            toastr.error(c.language('editor_ui_msg_tplloaderr'));
                            c.bigSpinnrer.close();
                        });
                    })
                    c.startpage.tab_panes.start_all_projects_row.masonry({
                        'items': '.item',
                        'gutter': 2,
                        'transitionDuration': 0
                    })
                    if (this.projectsAll && this.projectsAll.length > 0) {
                        this.loadProjects();
                    } else {
                        c.startpage.tab_panes.start_all_projects_row.html('<div class="card-block"><center><p><i class="fa fa-exclamation-triangle fa-2x"></i></p><h5 class="text-warning">' + c.language('editor_ui_noproject') + '</h5></center></div>')
                    }
                    e = $('<div class="element-wrapper text-current"><div class="element-header"><h3 class="text-current">' + c.language('editor_ui_csg') + '</h3></div><div class="p-3"><div class="d-flex"><span class="col-4"><p class="d-inline">' + c.language('editor_ui_w') + '</p><input class="form-control w-100 mac"></span><span>X</span><span class="col-4"><p class="d-inline">' + c.language('editor_ui_h') + '</p><input class="form-control mac w-100"></span><div class="col-4 text-right"><button class="button_x2 btn btn-rounded" style="background:#F200AF;box-shadow:none">' + c.language('editor_ui_crbtn') + '</button></div></div></div></div>');
                    e.find('button').on('click', function (e, w, h, v) {
                        e = $(this).parents('div.d-flex').find('input:lt(3)');
                        if (e.length == 0) return;
                        w = e.first();
                        h = e.last();
                        v = w.val().trim();
                        e = [];
                        if (v == "") {
                            w.focus();
                            return;
                        }
                        e.push(v);
                        v = h.val().trim();
                        if (v == "") {
                            h.focus();
                            return;
                        }
                        e.push(v);
                        c.startpage.apply(e);
                    });
                    e.appendTo(this.tab_panes.start_new_presets);
                    for (this.i = 0; c.size_preset_groups.length > this.i; this.i++) {
                        if (c.isRoller && c.size_preset_groups[this.i].title.toLowerCase() == 'social media') continue;
                        e = $('<div class="element-wrapper"><div class="element-header"><h5 class="text-current">' + c.language(c.size_preset_groups[this.i].title) + '</h5></div><div class="p-0"><div class="row"></div></div></div>');
                        e.appendTo(this.tab_panes.start_new_presets);
                        e = e.find('.row');
                        $.each(c.size_preset_groups[this.i].items, function (i, v) {
                            if (c.isRoller && !c.rollerTPL[v]) return;
                            e.append('<div data-size="' + v + '"></div>');
                        })
                    }
                    this.sizesOpt = c.domSizePresets.clone().addClass('d-none').removeClass('w-75').prependTo(this.body).on('change', function (e, f) {
                        e = $(this).val().split('x');
                        if (e.length !== 2) {
                            return;
                        }
                        f = $(c.startpage.target + ' .modal-body .tab-pane[id=c_blank] input[name]');
                        f.filter('[name=w]').val(e[0]);
                        f.filter('[name=h]').val(e[1]);
                    }).find('option');
                    this.sizesOpt.each(function (i, w, p, dz, sw, sh, title) {
                        dz = c.startpage.body.find('.row div[data-size="' + this.value + '"]');
                        w = this.value.split('x');
                        i = w.join('x');
                        sw = parseFloat(w[0]);
                        sh = parseFloat(w[1]);
                        if (sw > c.defaultConfig.maxDimensionLimit[0] || sh > c.defaultConfig.maxDimensionLimit[1]) {
                            dz.remove();
                            return;
                        }
                        title = this.innerText.split('-')[0];
                        i = $('<div title="' + title + '" class="col-6 col-md-6 col-xl-3 col-lg-4 p-0 mr-0"><div class="size_preset fade"><div style="width:' + w[0] + 'px;"><div class="thumb"><div></div><div></div><div></div></div></div></div><h5 class="">' + this.value + '</h5><h6 style="" class="w-50 d-none truncate text-right"><span>' + title + '</span></h6></div>')
                        dz.replaceWith(i);
                        i = i.find('.size_preset > div:first');
                        i.show(200, function () {
                            $(this).parent().addClass('in')
                        }).parent().data('size-opt', w)
                    });
                    c.startpage.body.find('.element-wrapper .row:empty').each(function () {
                        $(this).parents('.element-wrapper').remove();
                    })
                    this.sizeOpDom = this.tab_panes.start_new_presets.find('.size_preset').click(function (w, h, f) {
                        f = $(this).data('size-opt');
                        c.startpage.apply(f);
                    });
                    notify('startpage.beforeReady');
                }
                this.loadTPLCats = function () {
                    this.currentTarget = -1;
                    if (!this.templateCats) {
                        this.tab_panes.start_all_templates_row.html(loader);
                        $.get(location.origin + '/editor/loadtpl.php?type=category', function (r) {
                            c.startpage.templateCats = r;
                            c.startpage.loadTPLCats();
                        }, 'json')
                        return;
                    }
                    this.tab_panes.start_all_templates_row.empty();
                    a = c.startpage.body.find('.row > div:first').append('<div class="mt-3 catlist"><h4>' + c.language('editor_ui_cats') + '</h4></div>').find('> div:last')
                    $.each(this.templateCats, function (i, e) {
                        e = $('<div data-id="' + i + '" class="col-6 col-md-6 col-xl-3 col-lg-4 p-0 mr-0"><div style="cursor:pointer" class="card bg-none"><div class="card-image center" style="opacity:0.5"><img class="img-fluid" style="height:250px;width:auto" src="' + this.thumb + '" /></div><div style="background:#ffe70f;position:absolute;bottom:0" class="card-footer absolute w-100 justify-content-center d-flex"><p class="text-gray-dark text-center">' + this.title + '</p></div></div></div>');
                        c.startpage.tab_panes.start_all_templates_row.append(e);
                        a.append('<div style="cursor:pointer" class="card-header" data-id="' + i + '" data-name="' + this.name + '"><span>' + this.title + '</span><span class="badge badge-danger align-top ml-1">' + this.t + '</span></div>');
                    })
                    this.catLists = a.children('.card-header').on('click', function () {
                        e = $(this).data('id');
                        if (e == undefined) return;
                        e = c.startpage.templateCats[e];
                        c.startpage.searchTPL(e.name);
                    })
                    c.startpage.tab_panes.start_all_templates_row.children().on('click', function (e) {
                        e = $(this).data('id');
                        if (e == undefined) return;
                        e = c.startpage.templateCats[e];
                        c.startpage.searchTPL(e.name);
                    })
                }
                this.searchTPL = function (q) {
                    this.catLists.filter('.text-white').removeClass('text-white');
                    this.catLists.filter('[data-name="' + q + '"]').addClass('text-white');
                    this.tab_panes.start_all_templates_row.html(loader);
                    this.currentTarget = 0;
                    this.activeTPL = q;
                    $.get(location.origin + '/editor/loadtpl.php?search=' + q, function (r) {
                        c.startpage.templatesAll = r;
                        c.startpage.tab_panes.start_all_templates_row.addClass('w-100').empty();
                        c.startpage.tab_panes.start_all_templates_row.masonry({
                            'items': '.item',
                            gutter: 2,
                            'transitionDuration': 0,
                            'columnWidth': 250
                        }).addClass('masi');
                        c.startpage.tplNo = 0;
                        c.startpage.loadTPL();
                    }, 'json')
                }
                this.tplNo = 0;
                this.loadTPL = function (o) {
                    this.tab_panes.start_all_templates_loader.addClass('d-none')
                    if (!this.templatesAll) {
                        this.tab_panes.start_all_templates_row.html(loader);
                        return;
                    }
                    o = {};
                    this.tplLoaded = 0;
                    for (o.i = 0; this.templatesAll.all.length > o.i; o.i++) {
                        if (o.i > 10) break;
                        if (this.tplNo + 1 > this.templatesAll.all.length) {
                            this.tab_panes.start_all_templates_loader.addClass('d-none')
                            break;
                        }
                        o.e = $('<div style="width:250px;" class="item fade" data-id="' + this.templatesAll.all[this.tplNo] + '"><a href="' + location.origin + '/edit?tpl=' + this.templatesAll.all[this.tplNo] + '"><div><img class="img-fluid" /></div></a></div>');
                        this.tab_panes.start_all_templates_row.append(o.e);
                        o.m = o.e.find('img:first').get(0);
                        o.m.rel = o.e;
                        o.m.par = this.activeTPL;
                        o.m.onload = function () {
                            if (this.par != c.startpage.activeTPL) {
                                this.rel.remove();
                                return;
                            }
                            this.rel.addClass('in');
                            c.startpage.tplLoaded++;
                            if (c.startpage.tplNo < c.startpage.templatesAll.all.length && c.startpage.tplLoaded >= 10) {
                                c.startpage.tab_panes.start_all_templates_loader.removeClass('d-none')
                            }
                            c.startpage.tab_panes.start_all_templates_row.masonry('appended', this.rel)
                        }
                        o.m.onerror = function () {
                            c.startpage.tplLoaded++;
                            if (c.startpage.tplNo < c.startpage.templatesAll.all.length && c.startpage.tplLoaded >= 10) {
                                c.startpage.tab_panes.start_all_templates_loader.removeClass('d-none')
                            }
                            this.rel.remove();
                        }
                        o.m.src = location.origin + '/editor/loadtpl.php?type=thumb&q=' + this.templatesAll.all[this.tplNo];
                        this.tplNo++;
                    }
                }
                this.pageNo = 0;
                this.loadProjects = function (e, i, im) {
                    this.tab_panes.start_all_projects_loader.addClass('d-none')
                    for (i = 0; this.projectsAll.length > i; i++) {
                        if (i > 10) break;
                        if (this.pageNo + 1 > this.projectsAll.length) {
                            c.startpage.tab_panes.start_all_projects_loader.addClass('d-none')
                            break;
                        }
                        e = $('<div data-id="' + this.projectsAll[this.pageNo] + '" class="item fade p-0 mr-0"><div class="toolbar"><a><span class="fa fa-bars"></span></a></div><div class="size_preset" style="height:auto"><a href="edit?q=' + this.projectsAll[this.pageNo] + '"><img  /></a></div></div>');
                        c.startpage.tab_panes.start_all_projects_row.append(e);
                        im = e.find('img').get(0);
                        im.rel = e;
                        im.i = i;
                        im.onload = function (i) {
                            this.rel.addClass('in')
                            if (c.startpage.pageNo < c.startpage.projectsAll.length && this.i >= 10) {
                                c.startpage.tab_panes.start_all_projects_loader.removeClass('d-none')
                            }
                            c.startpage.tab_panes.start_all_projects_row.masonry('appended', this.rel)
                        }
                        im.onerror = function () {
                            if (c.startpage.pageNo < c.startpage.projectsAll.length && this.i >= 10) {
                                c.startpage.tab_panes.start_all_projects_loader.removeClass('d-none')
                            }
                            this.rel.remove();
                        }
                        im.src = location.origin + '/editor/getpreview.php?q=' + this.projectsAll[this.pageNo];
                        this.pageNo++;
                    }
                }
                this.apply = function (f, w, h) {
                    if (typeof f !== 'object') return;
                    if (f.length < 2) return;
                    w = $.trim(f[0]);
                    h = $.trim(f[1]);
                    if (w.length == 0 || /[^\d\.]/g.test(w) == true || (w = parseFloat(w)) && w == NaN) {
                        toastr['error'](c.language('editor_ui_msg_dimerr'));
                        return;
                    }
                    if (w.length == 0 || /[^\d\.]/g.test(h) == true || (h = parseFloat(h)) && h == NaN) {
                        toastr['error'](c.language('editor_ui_msg_dimerr'));
                        return;
                    }
                    if (w > c.defaultConfig.maxDimensionLimit[0] || h > c.defaultConfig.maxDimensionLimit[1]) {
                        t = c.language('editor_ui_msg_dimlimiterr');
                        toastr['error'](t + '(' + c.defaultConfig.maxDimensionLimit[0] + 'x' + c.defaultConfig.maxDimensionLimit[1] + ')');
                        return;
                    }
                    c.domSize.last().val(h);
                    c.domSize.first().val(w).trigger('mouseenter');
                    c.sceneReadyInit = true;
                    $('select#stage_general_config_sp').val(w + 'x' + h);
                    $.each(Object.values(c.startpage.win), function () {
                        this.close();
                    })
                    c.startpage.modal.removeClass('bg-current').find('.modal-dialog:first').addClass('bg-current')
                    c.startpage.minimize();
                    c.domEditorBase.css('filter', '')
                }
                this.onshow = function (e) {
                    this.modal.css('zIndex', 10000);
                    $(document.body).addClass('modal-open');
                    this.sz = (this.body.width() / 6) - 40;
                    this.sizeOpDom.each(function (i, e, w) {
                        e = $(this);
                        w = e.data('size-opt');
                        if (!w) return;
                        i = e.children(':first');
                        p = resizeByWidth(i, w, c.startpage.sz);
                        if (p.h > c.startpage.sz) {
                            p = resizeByHeight(i, [p.w, p.h], c.startpage.sz)
                        }
                    })
                    $(this.modal).css('opacity', '')
                }
                return this;
            })
            if (typeof sceneTPL === 'object') {
                c.startpage.modal.removeClass('bg-current').find('.modal-dialog:first').addClass('bg-current')
                c.domEditorBase.on('ready', function (i, t, s) {
                    resizeEditor();
                    $('input#stage_general_config_h').val(sceneTPL.height);
                    $('input#stage_general_config_w').val(sceneTPL.width).trigger('mouseenter');
                    $('select#stage_general_config_sp').val(sceneTPL.width + 'x' + sceneTPL.height);
                    c.ID = parseInt(sceneTPL.ID);
                    c.IDmeta = sceneTPL.IDmeta;
                    if (c.isRoller) {
                        c.setupGuiDom(sceneTPL.slides[0]);
                        for (i = 1; sceneTPL.szar.length > i; i++) {
                            s = sceneTPL.szar[i].split('x');
                            c.addRollerSize(s[0], s[1], sceneTPL.slides[i]);
                        }
                        return;
                    }
                    s = c.domCanvas.children('div:first');
                    e = buildTPL(sceneTPL.slides[0], s);
                    t = sceneTPL.slides.length;
                    for (i = 1; t > i; i++) {
                        c.domScreenAdd.trigger('click');
                        s = s.next().show(0);
                        buildTPL(sceneTPL.slides[i], s);
                    }
                    c.slides = sceneTPL.slides;
                    c.nomalizeSlides();
                    c.refreshDocColorPalette();
                    $('#wrapper_slide_groups .view_slide_item:eq(0) > .card-header').trigger('click');
                    sceneTPL = null;
                })
                c.sceneReadyInit = true;
            } else if (c.isTPL_launch === false) {
                c.domEditorBase.removeClass('d-none').hide(0).show(0, function () {
                    resizeEditor();
                    $(this).addClass('d-none').hide(0);
                })
                c.domEditorBase.on('lastLoaded', function () {
                    if (!c.isRoller || (c.isRoller && c.rollerTPL)) {
                        $('#start_loading').remove();
                    }
                    c.startpage.maximize();
                    notify('startpage.afterReady');
                })
            }
            c.domEditorBase.on('ready', function (a, p) {
                if (!notify('workspace.beforeReady')) return;
                c.workSpaceReady = true;
                if (c.domWindow.width() <= 1200) {
                    c.domSidebarWrapper.trigger('hide', [0]);
                }
                $('#start_loading').remove();
                $('#top-win-toolbar').removeClass('d-none');
                a = c.domCanvas;
                notify('workspace.afterReady');
                c.history = [];
            })
            return;
        }
        c.loaderTextHelper.text('Loading ' + lib[libin] + ' information');
        j.get(location.origin + '/library/' + lib[libin] + '.cf', function (e, i) {
            i = lib[libin];
            c.libs[i] = JSON.parse(e);
            libin++;
            loadLib(null, libin);
        })
    }

    c.domCanvas.on({
        'paint': function (e, type, ref) {
            type = type.substr(3);
            b = $(this).children();
            a = b.filter(':visible:first');
            c.domSlidesWrapper.find('.view_slide_item:eq(' + a.index() + ') > .card-block > .row .card[locked]:last > div:visible').addClass('d-none');
            if (a.length == 0) a = b.first();
            if (type == 'colors' && ref !== '') {
                if (!notify('screen.beforePaint', {'ref': type})) return;
                if (ref == '00000000') {
                    a.css('background-image', 'url(library/bg_textures/tmb/transparency.jpg)');
                } else {
                    a.css('background', '#' + ref);
                }
                c.slides[a.index()].background = {'color': '#' + ref};
                notify('screen.afterPaint');
            } else if (type == 'gradients' && c.bg_gradients_string[ref] !== undefined) {
                if (!notify('screen.beforePaint', {'ref': type})) return;
                a.css('background', c.bg_gradients_string[ref]);
                c.slides[a.index()].background = {'gradient': ref};
                notify('screen.afterPaint');
            } else if (type == 'pattern' && c.libs.bg_patterns[ref] !== undefined) {
                if (!notify('screen.beforePaint', {'ref': type})) return;
                c.applyPattern(a, c.libs.bg_patterns[ref]);
                c.slides[a.index()].background = {'pattern': c.libs.bg_patterns[ref],};
                notify('screen.afterPaint');
            } else if (type == 'images' && c.bg_images.items[ref] !== undefined) {
                if (!notify('screen.beforePaint', {'ref': type})) return;
                a.css('background-image', 'url(library/bg_textures/tmb/transparency.jpg)');
                k = new Image;
                k.onload = function (e) {
                    c.domCanvas.children('div:visible:first').css({
                        'background-image': 'url(' + this.src + ')',
                        'background-size': 'cover',
                        'background-position': '0 0'
                    });
                    if (this.hi_src) {
                        e = this.hi_src;
                        delete this.hi_src;
                        this.src = e;
                    }
                    notify('screen.afterPaint');
                }
                k.hi_src = c.bg_images.items[ref].u;
                k.src = c.bg_images.items[ref].l;
                c.slides[a.index()].background = {'image': c.bg_images.items[ref].u, 'zoom': 100, 'x': 0, 'y': 0};
            }
        }, 'delScreen': function (i, a, d, b, e) {
            if (d !== c.sessionKey) return;
            e = c.domCanvas.children();
            if (typeof a == 'number') {
                a = 'eq(' + a + ')';
            } else {
                a = 'visible';
            }
            a = e.filter('div:' + a);
            if (a.length == 0) return;
            i = a.index();
            d = c.domSlidesWrapper.find('.view_slide_item:eq(' + i + ')');
            if (!notify('screen.beforeDel', {'ref': i})) return;
            $.each(c.slides[i].elements, function (id, e) {
                if (c.idCache[e.prop.uid].fx) {
                    delete c.idCache[e.prop.uid];
                }
            })
            c.slides.splice(i, 1);
            d.remove();
            b = a.next('div');
            if (b.length == 0) b = a.prev('div');
            if (Object.keys(c.currentSelection).length > 0 && e.filter('div:visible').is(a) == true) {
                c.domCanvas.trigger('disconnectScope', ['.active,.ui-selected']);
            }
            a.remove();
            c.nomalizeSlides();
            if (b.length > 0 && e.filter('div:visible').is(b) == false) {
            }
            if (b.length > 0) {
                c.domCanvas.trigger('connectScreen', [b.index(), c.sessionKey])
            } else {
                c.domScreenAdd.trigger('click');
            }
            notify('screen.afterDel', {'ref': i})
        }, 'cloneScreen': function (i, a, b, e, d, f, o) {
            if (typeof a == 'number' && b == c.sessionKey) {
                e = c.domCanvas.children('div:eq(' + a + ')');
            } else return;
            if (!notify('screen.beforeCreate')) return;
            c.domCanvas.trigger('connectScreen', [a, c.sessionKey]);
            b = c.domSlidesWrapper.find('.view_slide_item:eq(' + a + ')');
            d = b.clone(true);
            d.find('span.fa-ellipsis-v').removeClass('context-menu-active');
            b = d.appendTo(b.parent());
            f = e;
            d = e.clone(true).empty();
            d.hide(0);
            e = d.appendTo(c.domCanvas);
            i = $.extend(true, {}, c.slides[a]);
            b = {};
            o = [];
            $.each(i.elements, function (k, l, p, nid) {
                l = f.find('.objectBox[scope="' + k + '"]');
                nid = 'layer_' + $.now() + '_' + Math.random().toString().replace('.', '');
                if (i.elements[k].prop.mask && i.elements[k].prop.mask.layer) {
                    o.push({'p': i.elements[k].prop.uid, 'pk': k, 'c': i.elements[k].prop.mask.layer});
                }
                b[i.elements[k].prop.uid] = nid;
                p = real_offset(l);
                i.elements[k].prop.w = p.widthab + '%';
                i.elements[k].prop.h = p.heightab + '%';
                i.elements[k].prop.left = p.leftab + '%';
                i.elements[k].prop.top = p.topab + '%';
                i.elements[k].prop.uid = nid;
            })
            if (o.length > 0) {
                $.each(o, function (k) {
                    k = b[this.c];
                    i.elements[this.pk].prop.mask.layer = k;
                })
            }
            buildTPL(i, d, true);
            c.slides.push(i);
            c.nomalizeSlides();
            c.domCanvas.trigger('stage_resize');
            notify('screen.afterCreate');
            c.domCanvas.trigger('connectScreen', [d.index(), c.sessionKey]);
        }, 'connectScreen': function (i, a, b, e) {
            if (typeof a == 'number' && b == c.sessionKey) {
                e = c.domCanvas.children('div:eq(' + a + ')');
            } else return;
            if (e.length == 0) return;
            b = c.domCanvas.children('div:visible:first').index();
            if (e.index() == b) {
                c.currentScreen = b;
                return;
            }
            b = c.domSlidesWrapper.find('.view_slide_item:eq(' + a + ') > .card-header');
            c.domSlidesWrapper.find('.view_slide_item > .card-header').not(b.get(0)).removeClass('active');
            if (Object.keys(c.currentSelection).length > 0) {
                c.domCanvas.trigger('disconnectScope', ['.active,.ui-selected']);
            }
            e.siblings('div').each(function () {
                $(this).hide(0).removeClass('in fade').css('display', 'none')
            });
            e.addClass('fade').show(0);
            setTimeout(function () {
                e.addClass('in')
            }, 20)
            b.addClass('active');
            e.css('display', 'block');
            c.currentScreen = e.index();
            notify('workspace.afterScreenSelect');
        }, 'addObject': function (e, type, pos, refid, prop, ref, a, b, i, d, s, ns) {
            ref = type.data('object-ref');
            a = type.data('object');
            ns = a;
            if (a == 'shape') {
                b = type.data('object-src');
                if (typeof b == 'object' && b.sym) {
                    prop = $.extend(true, {}, b);
                    i = smartDrawing(prop)
                } else {
                    d = c.libs.shapes;
                    d = Object.values(c.libs.shapes[ref]);
                    b = "" + b + "";
                    prop = {'src': ref + '/' + b, 'background': {'color': '#000'}};
                    b = d.indexOf(b);
                    d = d[b];
                    i = c.shapeBlob[ref][b];
                }
                s = 'fa-meh-o';
            }
            if (a === 'buttons') {
                d = c.libs.buttons[ref];
                p = parseTemplates('buttons', d);
                p.sym = 'button';
                s = 'fa-hand-pointer-o';
                p.radius = 0;
                if (p.border && !isNaN(p.border.corner)) {
                    p.radius = p.border.corner;
                }
                p.cmd = c.svgButtonNs;
                p = $.extend(false, p, p.text);
                delete p.text;
                i = smartDrawing_button(p);
            } else if (a == 'texts') {
                d = c.libs.texts[ref];
                p = parseTemplates('texts', d.text);
                if (d.sd) {
                    p.shadow = parseTemplates('shadow', d.sd);
                }
                if (d.t) {
                    p.opacity = parseTemplates('transparency', d.t);
                }
                if (d.b) {
                    p.blur = parseTemplates('blur', d.b);
                }
                if (d.bd) {
                    p.border = parseTemplates('border', d.bd);
                }
                s = 'fa-text-width';
                p.sym = 'text';
                p.background = {'color': p.color}
                i = smartDrawing_text(p);
            }
            if (a == 'texts' || a == 'buttons') {
                a = 'shape';
                prop = p;
                prop.source = [];
                prop.off = {'x': -1, 'y': -23, 'w': 110.14, 'h': 30}
                prop.source.push({'y': 0, 'x': 0, 's': 'T'})
                prop.source.push({'y': 0, 'x': 13.62, 's': 'e'})
                prop.source.push({'y': 0, 'x': 27.21, 's': 'x'})
                prop.source.push({'y': 0, 'x': 39.73, 's': 't'})
                prop.source.push({'y': 0, 'x': 49.65, 's': ' '})
                prop.source.push({'y': 0, 'x': 57.15, 's': 'h'})
                prop.source.push({'y': 0, 'x': 71.96, 's': 'e'})
                prop.source.push({'y': 0, 'x': 85.56, 's': 'r'})
                prop.source.push({'y': 0, 'x': 95.54, 's': 'e'})
            } else if (a === 'images') {
                if (typeof ref === 'object') {
                    i = ref
                } else {
                    i = c.images.items[ref];
                }
                prop = {'src': i.u};
                i.l = i.u;
                i = smartDrawing_image(i);
                s = 'fa-image';
            } else if (a == 'f-asset') {
                prop = type.data('heap');
                if (prop && typeof prop == 'object') {
                    prop = $.extend(true, {}, prop.d);
                    a = prop.alias;
                    prop = prop.prop;
                }
                if (prop.uid) {
                    i = type.find('svg:first').parent().html();
                    delete prop.uid;
                }
            } else if (a == 'sticker' || a == 'sprite') {
                prop = {'src': ref}
                if (c.libs.emoji[ref]) {
                    k = 'smartDrawing_' + a;
                    i = window[k](ref);
                }
            }
            if (i) {
                if (!notify('workspace.beforeObjectCreate', {'ref': a})) return;
                k = c.domCanvas.children('div:visible:first');
                d = k.index();
                if (!c.slides[d].elements) c.slides[d].elements = {};
                g = a + '_' + Date.now() + '_' + Object.keys(c.slides[d].elements).length + '_' + d;
                k.append('<div class="objectBox drag" data-object-ref="' + a + '" scope="' + (g) + '" style="width:' + (type.width() / c.width) * 100 + '%;height:' + (type.height() / c.height) * 100 + '%;position:absolute;display:block"><div class="object" style="width:100%;height:100%;">' + i + '</div></div>');
                c.slides[d].elements[g] = {'id': g, 'alias': a, 'prop': {'left': 0, 'top': 0, 'w': 0, 'h': 0}};
                if (!(i = type.data('uid'))) {
                    i = 'layer_' + $.now() + '_' + Math.random().toString().replace('.', '');
                }
                c.slides[d].elements[g].prop.uid = i;
                c.idCache[i] = {};
                c.idCache[i].fx = new c.svgFxOb;
                if (a == 'sprite') c.idCache[i].sprites = [];
                c.slides[d].elements[g].svgfxOb = c.idCache[i].fx;
                c.slides[d].elements[g].prop.z = c.domSlidesWrapper.find('.view_slide_item:eq(' + d + ') > .card-block > .row > div[scope]:first');
                i = a;
                if (a == 'shape' && prop.sym) {
                    i = prop.sym;
                }
                i = i.substr(0, 1).toUpperCase() + i.substr(1)
                b = c.domSlidesWrapper.find('.view_slide_item:eq(' + d + ') > .card-block > .row').prepend('<div scope="' + (g) + '" class="card col-12 d-block"><span class="fa-sort fa fa-stack"></span><span class="fa fa-folder-o fa-stack"></span><span class="title">' + (i) + '</span><span class="fa-lock fa fa-stack float-right" title="Lock object"></span><span class="fa-eye fa fa-stack float-right"></span></div>');
                b.trigger('addLayer');
                if (c.workSpaceReady) {
                    k = b.children(':first');
                    c.domDocBody.append('<div class="bg-info"></div>').children(':last').css({
                        'position': 'absolute',
                        'width': k.outerWidth(),
                        'height': k.height(),
                        'left': k.offset().left,
                        'top': k.offset().top,
                        'zIndex': 10000,
                        'opacity': 1
                    }).animate({'opacity': 0}, 500, function () {
                        $(this).remove();
                    });
                }
                k = c.domCanvas.children('div:visible:first').children('.objectBox:last');
                k.attr('id', 'g_' + c.slides[d].elements[g].prop.uid);
                if ((e = type.data('src-rotate')) && (e = parseFloat(e)) && typeof e == 'number') {
                    c.slides[d].elements[g].prop.r = e;
                } else {
                    c.slides[d].elements[g].prop.r = prop.r | 0;
                }
                k.css('transform', 'rotate(' + c.slides[d].elements[g].prop.r + 'deg)');
                if (typeof refid === 'object') {
                    refid.remove();
                }
                if (a === 'shape') {
                    k.find('svg').css({'width': '100%', 'height': '100%'}).attr('preserveAspectRatio', 'none');
                }
                if (ns == 'texts' || ns == 'buttons') {
                    prop.align = 'center';
                    c.slides[d].elements[g].alias = 'shape';
                    k.attr('data-object-shape-glyph', ns);
                }
                if (a == 'shape' && !c.isRoller && prop.sym && (prop.sym == 'text' || prop.sym == 'button')) {
                    k.append('<div class="viewbox-edit" title="Click To Edit Text"><span class="fa fa-text-width"></span></div>')
                    k.attr('data-object-shape-glyph', prop.sym);
                }
                c.slides[d].elements[g].svgfxOb.init(k.find('.object:first > svg:first').attr('id', c.slides[d].elements[g].prop.uid));
                if (ns == 'texts' || ns == 'buttons') {
                    renderTextType((prop.content || 'Double-click to edit text'), prop, c.slides[d].elements[g].svgfxOb.dom, function (source, d, scope) {
                        d.options.source = source;
                        d.options.off = d.off;
                        d.e = $(d.svg).parents('.objectBox[scope]')
                        if (d.options.sym == 'button') {
                            d.options.xy = d.xy;
                            prop.cmd = d.cmd;
                        } else {
                            d.e.css({'width': d.size.width + '%', 'height': d.size.height + '%'});
                        }
                        d.id = d.e.attr('scope');
                        d.s = d.id.substr(d.id.lastIndexOf('_') + 1);
                        scope = c.slides[d.s].elements[d.id];
                        scope.prop = $.extend(true, scope.prop, d.options);
                    })
                }
                if (typeof pos === 'object') {
                    b = c.domCanvas;
                    k.css({'left': (pos.left / b.width()) * 100 + '%', 'top': (pos.top / b.height()) * 100 + '%'});
                }
                c.slides[d].elements[g].prop.left = k.position().left;
                c.slides[d].elements[g].prop.top = k.position().top;
                c.slides[d].elements[g].prop.w = k.width();
                c.slides[d].elements[g].prop.h = k.height();
                if (c.slides[d].elements[g].prop.z.length == 0) {
                    c.slides[d].elements[g].prop.z = 1;
                } else {
                    c.slides[d].elements[g].prop.z = c.slides[d].elements[g].prop.z.attr('scope');
                    c.slides[d].elements[g].prop.z = c.domCanvas.children('div:visible:first').children('[scope="' + c.slides[d].elements[g].prop.z + '"]').get(0).style.zIndex;
                    c.slides[d].elements[g].prop.z = parseInt(c.slides[d].elements[g].prop.z) + 1;
                }
                k.css('zIndex', c.slides[d].elements[g].prop.z);
                c.slides[d].elements[g].prop = $.extend(c.slides[d].elements[g].prop, prop);
                try {
                    c.slides[d].elements[g].svgfxOb.loadAll(c.slides[d].elements[g].prop);
                    c.slides[d].elements[g].svgfxOb.applyAll();
                    if (c.slides[d].elements[g].svgfxOb.fx.background) {
                        c.slides[d].elements[g].prop.background = c.slides[d].elements[g].svgfxOb.fx.background.options;
                    }
                } catch (e) {
                }
                k.objectInteract();
                c.domCanvas.trigger('stage_resize');
                if (c.workSpaceReady) {
                    k.find('object').addClass('fade').delay(300).show(0, function () {
                        $(this).addClass('in')
                    })
                }
                notify('workspace.afterObjectCreate', {'obj': c.slides[d].elements[g]});
            }
        }, 'delObject': function (e, scope, a, i, b, d) {
            d = scope.substr(scope.lastIndexOf('_') + 1);
            i = c.domCanvas.children('div:eq(' + d + ')');
            a = c.domSlidesWrapper.find('.view_slide_item:eq(' + d + ') > .card-block > .row');
            e = c.slides[d].elements[scope];
            if (e.locked == true || e.locked == 'true') {
                toastr['error']('Object is locked');
                return;
            }
            if (!notify('workspace.beforeObjectDel', {'ref': e.alias, 'obj': e.id})) return;
            if (typeof e == 'object') {
                delete c.idCache[e.prop.uid];
                delete c.slides[d].elements[scope];
            }
            b = a.children('div.card[scope="' + scope + '"]');
            d = i.children('.objectBox[scope="' + scope + '"]');
            if (d.length > 0 && d.filter('.active').length > 0) {
                c.transformHandler.disable();
                logStatus({'type': 'text', 'text': 'Ready'});
                if (c.isPerpertyOpen) {
                    c.domPropToggler.removeData('scope');
                    c.domPropLinks.first().trigger('click');
                }
            } else {
            }
            if (b.length > 0 && typeof e.alias === 'string') {
                delete c.currentSelection[scope];
                b.remove();
                d.remove();
            }
            notify('workspace.afterObjectDel', {'obj': scope});
        }, 'cloneObject': function (e, scope, a, i, b, d, g, t) {
            i = c.domCanvas.children('div:visible:first');
            d = i.index();
            a = c.domSlidesWrapper.find('.view_slide_item:eq(' + d + ') > .card-block > .row');
            t = scope.substr(scope.lastIndexOf('_') + 1);
            if (!c.slides[t]) return;
            if (!c.slides[t].elements[scope]) return;
            e = $.extend(true, {}, c.slides[t].elements[scope]);
            if (!notify('workspace.beforeObjectCreate', {'ref': e.alias})) return;
            g = e.alias + '_' + Date.now() + '_' + Object.keys(c.slides[d].elements).length + '_' + d;
            c.slides[d].elements[g] = e;
            c.slides[d].elements[g].id = g;
            c.slides[d].elements[g].prop.uid = 'layer_' + $.now() + '_' + Math.random().toString().replace('.', '');
            if ((t = c.TL.exportAll(c.slides[d].elements[scope].prop.uid))) {
                c.slides[d].elements[g].tween = t[c.slides[d].elements[scope].id];
            }
            e = i.parent().find('.objectBox[scope="' + scope + '"]');
            t = e.clone(false).attr('scope', g).css({'top': '+=2%', 'left': '+=1%', 'zIndex': '+=1'}).appendTo(i);
            t.find('.ui-resizable-handle').remove();
            t.attr('id', 'g_' + c.slides[d].elements[g].prop.uid);
            b = c.slides[d].elements[g].prop.uid;
            c.idCache[b] = {};
            c.idCache[b].fx = new c.svgFxOb;
            c.slides[d].elements[g].svgfxOb = c.idCache[b].fx;
            b = t.find('svg:first').attr('id', c.slides[d].elements[g].prop.uid);
            b.find('defs .svgFxOb').remove();
            b.removeAttr('mask fill');
            try {
                c.slides[d].elements[g].svgfxOb.init(b);
                c.slides[d].elements[g].svgfxOb.loadAll(c.slides[d].elements[g].prop);
                c.slides[d].elements[g].svgfxOb.applyAll();
            } catch (e) {
            }
            t.objectInteract();
            if (['texts', 'buttons'].indexOf(c.slides[d].elements[g].alias) !== -1) {
                b = e.data('size');
                e.data('size', b);
            }
            b = c.domSlidesWrapper.find('div.card[scope="' + scope + '"]').clone(true).attr('scope', g).prependTo(a);
            if (b.find('span:eq(3)').hasClass('fa-unlcok')) {
                b.resizable('disable').draggable('disable').data('locked', true);
            }
            if (b.find('span:last').hasClass('fa-eye-slash')) {
                b.find('span:last').removeClass('fa-eye-slash').addClass('fa-eye');
                b.removeClass('invisible');
            }
            b = real_offset(e);
            c.slides[d].elements[g].left = b.left;
            c.slides[d].elements[g].top = b.top;
            notify('workspace.afterObjectCreate', {'obj': c.slides[d].elements[g]});
        }, 'connectScope': function (e, scope, i, d, a, b) {
            d = scope.substr(scope.lastIndexOf('_') + 1);
            i = c.domCanvas.children('div:eq(' + d + ')');
            if (i.is(':visible') == false) {
                c.domCanvas.trigger('connectScreen', [i.index(), c.sessionKey]);
            }
            a = c.domSlidesWrapper.find('.view_slide_item:eq(' + d + ') > .card-block > .row');
            b = a.children('div.card[scope="' + scope + '"]');
            if (b.length > 0) {
                b.parent().children('.card[scope].active').removeClass('active');
                b.addClass('active');
                c.domSlidesWrapper.scrollTop(b.get(0).offsetTop);
            }
            b = i.children('.objectBox[scope="' + scope + '"]');
            if (b.length > 0) {
                if (!notify('obj.beforeSelect')) return;
                b.parent().children('.objectBox[scope].active').removeClass('active').removeAttr('tabIndex');
                b.addClass('active').attr('tabIndex', 0);
                i = real_offset(b);
                c.currentActive = b;
                e = c.slides[d].elements[scope];
                a = {
                    'type': 'text',
                    'text': 'x:' + number_format(i.realLeft) + ' y:' + number_format(i.realTop) + ' w:' + number_format(i.realWidth) + ' h:' + number_format(i.realHeight) + ' rotate:' + (e.prop.r | 0)
                }
                c.transformHandler.enable(b, e)
                b.attr('id', 'g_' + e.prop.uid);
                if (e.locked == true || e.locked == 'true') {
                    a.text += ' Locked:Yes';
                } else {
                    a.text += ' Locked:No';
                }
                logStatus(a);
                inspector();
                c.currentSelection = {};
                c.currentSelection[scope] = b;
                notify('workspace.afterObjectSelect');
            }
        }, 'disconnectScope': function (e, scope, i, a) {
            i = c.domCanvas.children('div').children('.objectBox' + scope + '');
            d = i.last().parent().index();
            e = c.domSlidesWrapper.find('.view_slide_item:eq(' + d + ') > .card-block > .row');
            if (i.length > 0) {
                c.domDocBody.removeClass('inspect');
                c.domPropToggler.removeData('scope');
                c.domPropLinks.first().trigger('click');
                i.each(function (scope) {
                    scope = $(this).attr('scope');
                    a = e.children('[scope=' + scope + ']');
                    $(this).removeClass('active');
                    a.removeClass('active');
                });
                c.transformHandler.disable();
                c.currentSelection = {};
                c.currentActive = undefined;
                logStatus({'type': 'text', 'text': 'Ready'});
                notify('workspace.afterObjectDeSelect');
            }
        }
    })
    c.domSidebarToggleLinks.on('click', function () {
        if (c.currentActive && c.isPerpertyOpen !== true) {
            inspector();
        }
    })
    inspector = function (scopeID, scope, e) {
        if (c.Arcmode === 'f') {
            return false;
        }
        ;scope = {'isObjectScope': true};
        scopeID = c.currentActive.attr('scope');
        scope.currentStage = c.domCanvas.children('div:visible:first').index();
        scope.object = c.slides[scope.currentStage].elements[scopeID];
        scope.dom = c.currentActive;
        scope.domInner = scope.dom.find('.object:first');
        scope.layerDom = c.domSlidesWrapper.find('.view_slide_item:eq(' + scope.currentStage + ') > .card-block > .row > div.card[scope=' + scopeID + ']');
        scope.activeProps = '_layer,_anime,_action,_fx,_delete,_clone';
        if (scope.object.alias == 'texts') {
            scope.activeProps += ',_text,_save';
        } else if (scope.object.alias == 'images') {
            scope.activeProps += ',_image';
        } else if (scope.object.alias == 'buttons') {
            scope.activeProps += ',_background,_text,_save';
        } else if (scope.object.alias == 'shape') {
            scope.activeProps += ',_background';
        }
        c.domPropToggler.data('scope', scope);
        if ((c.domSidebarToggleLinks.hasClass('active')) == false) {
            c.domPropToggler.trigger('click');
        }
        c.domPropLinks.first().trigger('click');
    }
    c.domPropLinks = c.domHelpWrapper.find('ul > li > a[href]').on('click', function (e, scope) {
        e.preventDefault();
        if (c.Arcmode === 'f') {
            return false;
        }
        e = $(this);
        scope = c.domPropToggler.data('scope');
        c.domPropLinks.removeClass('active');
        e.addClass('active');
        e = (e.attr('href'));
        e = e.substr(e.lastIndexOf('_') + 1);
        if (!notify('inspector.beforeOpen', {'tab': e})) return;
        if ((typeof scope == 'object' && scope.object) == false) {
            c.domPropContent.html('<div class="card-block"><p>Select a layer first</p></div>');
            c.isPerpertyOpen = false;
            return;
        }
        c.isPerpertyOpen = true;
        c.isPerpertyTab = e;
        scope.svgfxOb = c.idCache[scope.object.prop.uid].fx;
        if (!scope.svgfxOb) {
            scope.svgfxOb = new c.svgFxOb;
        }
        scope.tab = e;
        c.domPropContent.empty();
        scope.Control = {};
        Events.one('workspace.objectdeselect.propE', 'after', function () {
            c.clearPropClean()
        });
        Events.one('inspector.open', 'before', function () {
            c.clearPropClean()
        })
        switch (e) {
            case'layer':
                e = $('<div class="card-block"><p>' + c.language('editor_ui_prop_lock') + '</p><div class="col-3"><input type="checkbox" /></div></div>')
                e.appendTo(c.domPropContent);
                scope.Control.lock = e.find('input[type="checkbox"]:first');
                e = $('<div class="row m-0 mt-2"><span id="see" title="' + c.language('editor_ui_tip_vison') + '" class="d-block fa fa-eye fa-lg col-2"></span><span id="copy" class="d-block fa fa-copy fa-lg col-2" title="' + c.language('editor_ui_tip_cp') + '"></span></div>');
                e.appendTo(c.domPropContent);
                scope.Control.layerProp = e.find('span[id]')
                if (scope.object.alias == 'images') {
                    e = $('<div class="card-block"><div class="p-0 center" id="property_image_select"><button class="btn btn-primary">' + c.language('editor_ui_prop_imgupd') + '</button></div></div>')
                    e.appendTo(c.domPropContent);
                    scope.Control.imgUpdate = e.find('#property_image_select > button:first')
                } else if (scope.object.alias == 'shape' && scope.object.prop.sym == 'text' || scope.object.prop.sym == 'button') {
                    scope.domSvg = scope.dom.find('svg:first').get(0);
                    scope.dom_g = scope.domSvg.querySelector('g');
                    if (scope.object.prop.sym == 'button') {
                        e = $('<div class="card-block pt-2"><p>Corner</p><input /></div>');
                        e.appendTo(c.domPropContent);
                        scope.Control.buttonCorner = e.find('input');
                        scope.domBtn = scope.domSvg.querySelector('path[d]')
                    }
                    scope.symFx = scope.svgfxOb;
                    if (scope.object.prop.sym == 'text' && scope.object.prop.background && scope.object.prop.background.color) scope.object.prop.color = scope.object.prop.background.color;
                    scope.symFx.load({
                        'textEdit': {
                            'sym': scope.object.prop.sym,
                            'font': scope.object.prop.font,
                            'color': scope.object.prop.color,
                            'type': scope.object.prop.type,
                            'align': scope.object.prop.align,
                            'size': scope.object.prop.size,
                            'line': scope.object.prop.line,
                            'text': scope.object.prop.source
                        }
                    });
                } else if (scope.object.alias == 'sprite') {
                    e = $('<div class="card-block"><p>' + c.language('editor_ui_prop_loopan') + '</p><div class="p-0 center col-3" id="property_sprite_loop"><input type="checkbox" checked /></div></div>')
                    e.appendTo(c.domPropContent);
                    scope.Control.loopSprite = e.find('input[type=checkbox]').prop('checked', true)
                }
                scope.ofx = real_offset(scope.dom);
                scope.cd = $('<div class="card-block"><p>Geometry(relative)</p><div class="row m-0 mt-1 mb-1"><div class="col-md-6"><span class="f-15 f-cs-m white">' + c.language('editor_ui_prop_dimension') + '</span><br><span><label class="f-15 f-cs-m white">W</label><input value="' + Math.round(scope.ofx.width) + '" id="w"  class="ml-1 form-control mac w-75" type="number"></span><br><span><label class="f-15 f-cs-m white">H</label><input id="h" value="' + Math.round(scope.ofx.height) + '" class="ml-1 form-control mac w-75" type="number"></span></div><div class="col-md-6"><span class="f-15 f-cs-m white">' + c.language('editor_ui_prop_pos') + '</span><br><span><label class="f-15 f-cs-m white">X</label><input id="x" value="' + Math.round(scope.ofx.left) + '" class="ml-1 form-control mac w-75" type="number"></span><br><span><label class="f-15 f-cs-m white">Y</label><input value="' + Math.round(scope.ofx.top) + '" id="y" class="ml-1 form-control mac w-75" type="number"></span></div></div>');
                scope.cd.appendTo(c.domPropContent);
                e = scope.cd.find('input');
                scope.Control.w = e.first();
                scope.Control.h = e.last();
                scope.Control.y = e.eq(2);
                scope.Control.x = e.eq(3);
                scope.Control.axisInput = $([scope.Control.w.get(0), scope.Control.h.get(0), scope.Control.x.get(0), scope.Control.y.get(0)])
                e = $('<div class="row mt-4 justify-content-center"><span title="' + c.language('editor_ui_tip_mv_left') + '" id="x0" class="d-block col-2"><img src="assets/img/icon/ui/align-4.png"></span><span title="' + c.language('editor_ui_tip_mv_top') + '" id="y0" class=" d-block col-2"><img src="assets/img/icon/ui/align-2.png"></span><span id="xy0" title="' + c.language('editor_ui_tip_mv_center') + '" class="d-block col-2"><img src="assets/img/icon/ui/align-6.png"></span><span title="' + c.language('editor_ui_tip_mv_bottom') + '" class="col-2 d-block" id="y1"><img src="assets/img/icon/ui/align-1.png"></span><span title="' + c.language('editor_ui_tip_mv_right') + '" id="x1" class="d-block col-3"><img src="assets/img/icon/ui/align-3.png"></span></div>')
                e.appendTo(scope.cd);
                scope.Control.posAxis = e.find('span[id]');
                e = $('<div class="row m-0 mt-1 mb-1"><div class="col-md-6"><span class="f-15 f-cs-m white">' + c.language('editor_ui_prop_rotate') + '</span><br><span id="r_gui" title="' + c.language('editor_ui_tip_rotate') + '"><img src="assets/img/icon/ui/rotate-ico.png"><input id="r" class="ml-1 mac form-control w-50" type="number" max="360"></span></div><div class="col-md-6"><span class="f-15 f-cs-m white">' + c.language('editor_ui_prop_flip') + '</span><br><span title="' + c.language('editor_ui_cntxt_flipv') + '" id="flipv"><img src="assets/img/icon/ui/flip-v.png" ></span><span id="fliph" ><img src="assets/img/icon/ui/flip-h.png" title="' + c.language('editor_ui_cntxt_fliph') + '"></span></div></div><div class="row m-0 mt-1 mb-1"><div class="col-md-12"><label class="pull-left f-15 f-cs-m white">' + c.language('editor_ui_prop_opacity') + '</label><span class="pull-right"><input id="opacity" type="number" style="width: 60px;height:27px;" max="1" min="0" step="0.2" class="form-control mac"></span></div><div class="col-md-12"><input id="opacity_gui" type="hidden"></div></div>');
                e.appendTo(c.domPropContent);
                scope.Control.abit = e.find('input[id],span[id]')
                e = $('<div class="row mt-4 justify-content-center"><div class="col-12"><p>' + c.language('editor_ui_prop_arrange') + '</p></div><span id="a-01" class="d-block col-2 fa fa-2x fa-angle-up" title="' + c.language('editor_ui_prop_arrang_forw') + '"></span><span title="' + c.language('editor_ui_prop_arrang_backw') + '" id="a-11" class="fa fa-2x fa-angle-down d-block col-2"></span><span title="' + c.language('editor_ui_prop_arrang_front') + '" id="a-0" class="d-block col-2 fa fa-2x fa-angle-double-up"></span><span class="col-2 d-block fa fa-2x fa-angle-double-down" id="a-1" title="' + c.language('editor_ui_prop_arrang_back') + '"></span></div>');
                e.appendTo(c.domPropContent);
                e = $('<div class="card-block"><button class="btn btn-danger btn-block btn-sm">' + c.language('editor_ui_del') + '</button></div>');
                e.appendTo(c.domPropContent);
                scope.Control.delete = e.find('button:first');
                scope.Control.delete.click(function () {
                    if (scope.object.locked == true) return;
                    if (!notify('obj.beforeDel', {'obj': scope.object.id})) return;
                    c.domCanvas.trigger('disconnectScope', ['.active']).trigger('delObject', [scope.object.id]);
                    notify('obj.afterDel', {'obj': scope.object.id});
                })
                scope.Control.lock.on('update', function (e, m) {
                    c.domSlidesWrapper.find('.view_slide_item:eq(' + scope.currentStage + ') > .card-block > .row .card[scope="' + scope.object.id + '"] > span:eq(3)').trigger('click');
                    if (m.value) {
                        scope.Control.axisInput.attr('disabled', true)
                    } else {
                        scope.Control.axisInput.removeAttr('disabled')
                    }
                })
                if (scope.Control.loopSprite) {
                    scope.Control.loopSprite.on('update', function (e, m) {
                        scope.object.prop.loop = m.value;
                    })
                }
                Events.on('obj.lock.inspector', 'after', function () {
                    if (!scope.Control.lock) {
                        Events.off('obj.*.inspector');
                        return;
                    }
                    if (scope.object.locked == true) {
                        scope.Control.lock.prop('checked', true).trigger('change')
                    } else {
                        scope.Control.lock.prop('checked', false).trigger('change')
                    }
                })
                Events.on('obj.visible.inspector', 'after', function () {
                    if (scope.dom.hasClass('invisible')) {
                        scope.Control.layerProp.filter('[id=see]').addClass('fa-eye-slash').removeClass('fa-eye')
                    } else {
                        scope.Control.layerProp.filter('[id=see]').addClass('fa-eye').removeClass('fa-eye-slash')
                    }
                })
                scope.Control.layerProp.on('click', function (e) {
                    if (this.id == 'see') {
                        c.domSlidesWrapper.find('.view_slide_item:first > .card-block > .row .card[scope="' + scope.object.id + '"] > span:last').trigger('click');
                    } else {
                        c.domCanvas.trigger('cloneObject', [scope.object.id]);
                    }
                })
                scope.Control.abit.filter('[id=fliph],[id=flipv]').on('click', function (e) {
                    e = {};
                    e.z = [1, 1];
                    if (!notify('obj.beforeFlip', {'obj': scope.object.id})) return;
                    if (scope.object.prop.flip) {
                        e.z = scope.object.prop.flip;
                    }
                    if (this.id == 'flipv' && e.z[0] == 1) {
                        e.z[0] = '-1'
                    } else if (this.id == 'flipv') {
                        e.z[0] = 1;
                    }
                    if (this.id == 'fliph' && e.z[1] == 1) {
                        e.z[1] = '-1';
                    } else if (this.id == 'fliph') {
                        e.z[1] = 1;
                    }
                    scope.object.prop.flip = e.z;
                    applyPropertyOption(scope.domInner, {'flip': e.z});
                    notify('obj.afterFlip', {'obj': scope.object.id})
                })
                scope.opa = scope.object.prop.opacity;
                if (scope.opa === undefined) scope.opa = 10;
                scope.Control.abit.filter('[id=opacity]').on('change', function (e) {
                    e = this.value;
                    if (e > 10) e = 10;
                    e = e * 10;
                    notify('obj.beforeFx', {'obj': scope.object.id, 'ref': 'opacity'})
                    scope.object.prop.opacity = e;
                    scope.svgfxOb.load({'opacity': e});
                    scope.svgfxOb.applyAll('opacity', true)
                    scope.opacitySlider.update({'from': e})
                    notify('obj.afterFx', {'obj': scope.object.id, 'ref': 'opacity'});
                }).val(scope.opa / 10)
                scope.Control.abit.filter('[id=r]').on('input', function () {
                    if (scope.rWatch) window.clearTimeout(scope.rWatch);
                    scope.rWatch = window.setTimeout(function (e, u) {
                        notify('obj.beforeRotate', {'obj': scope.object.id});
                        e = scope.Control.abit.filter('[id=r]').val()
                        e = parseFloat(e);
                        if (!(typeof e == 'number' && !isNaN(e))) e = 0;
                        applyPropertyOption(scope.dom, {'rotate': e});
                        scope.object.prop.r = e;
                        u = scope.Control.abit.filter('[id=r_gui]').data('uiRotatable');
                        u.elementStopAngle = e;
                        u.elementCurrentAngle = u.elementStopAngle;
                        u.element.find('img:first').css('transform', 'rotate(' + e + 'deg)');
                        notify('obj.afterRotate', {'obj': scope.object.id});
                        c.transformHandler.reposition();
                    }, 500)
                }).val(scope.object.prop.r | 0)
                scope.Control.posAxis.on('click', function (e) {
                    if (scope.object.locked == true) return;
                    e = $(this).attr('id');
                    pos = {};
                    if (!notify('obj.beforeMove', {'obj': scope.object.id})) return;
                    if (e == 'x0') {
                        scope.object.prop.left = applyPropertyOption(scope.dom, {'xy': 'x0'}).left;
                    } else if (e == 'x1') {
                        scope.object.prop.left = applyPropertyOption(scope.dom, {'xy': 'x1'}).left;
                    } else if (e == 'xy0') {
                        pos = applyPropertyOption(scope.dom, {'xy': 'xy0'});
                        scope.object.prop.left = pos.left;
                        scope.object.prop.top = pos.top;
                    } else if (e == 'y0') {
                        scope.object.prop.top = 0;
                        applyPropertyOption(scope.dom, {'xy': 'y0'});
                    } else if (e == 'y1') {
                        scope.object.prop.top = applyPropertyOption(scope.dom, {'xy': 'y1'}).top;
                    }
                    scope.object.prop.left = number_format(scope.object.prop.left);
                    scope.object.prop.top = number_format(scope.object.prop.top);
                    scope.Control.y.val(scope.object.prop.top)
                    scope.Control.x.val(scope.object.prop.left)
                    notify('obj.afterMove', {'obj': scope.object.id});
                })
                scope.Control.axisInput.on('input', function (e, v, t, pos) {
                    e = $(this);
                    pos = {};
                    if (scope.object.locked == true) return;
                    v = parseInt(e.val());
                    t = 1;
                    if (this.id == 'x' || this.id == 'y') {
                        t = 0;
                    }
                    if (t === 0 && !notify('obj.beforeMove', {'obj': scope.object.id})) {
                        return;
                    } else if (t === 1 && !notify('obj.beforeResize', {'obj': scope.object.id})) {
                        return;
                    }
                    if (t === 0 && this.id == 'x') {
                        pos.left = ((v / c.domCanvas.width()) * 100) + '%';
                        scope.object.prop.left = v;
                    } else if (t === 0 && this.id == 'y') {
                        pos.top = ((v / c.domCanvas.height()) * 100) + '%';
                        scope.object.prop.top = v;
                    } else if (t === 1 && this.id == 'w') {
                        scope.object.prop.w = v;
                        pos.width = ((v / c.domCanvas.width()) * 100) + '%';
                    } else if (t === 1 && this.id == 'h') {
                        scope.object.prop.h = v;
                        pos.height = ((v / c.domCanvas.height()) * 100) + '%';
                    }
                    scope.dom.css(pos)
                    if (t === 0) {
                        notify('obj.afterMove', {'obj': scope.object.id});
                    } else if (t === 1) {
                        notify('obj.afterMove', {'obj': scope.object.id});
                    }
                })
                if (scope.object.locked == true || scope.object.locked == 'true') {
                    scope.Control.lock.prop('checked', true);
                    scope.Control.axisInput.attr('disabled', true)
                }
                if (scope.Control.loopSprite && (scope.object.prop.loop == true || scope.object.prop.loop === undefined)) {
                    scope.Control.loopSprite.prop('checked', true)
                } else if (scope.Control.loopSprite) {
                    scope.Control.loopSprite.prop('checked', false)
                }
                scope.Control.lock.switch();
                if (scope.Control.loopSprite) {
                    scope.Control.loopSprite.switch();
                }
                e = scope.Control.abit.filter('[id=r_gui]');
                scope.rHandle = e.find('img:first');
                e.rotatable({
                    'degrees': scope.object.prop.r | 0, 'rotate': function (e, u) {
                        scope.rHandle[0].style.transform = 'rotate(' + u.angle.degrees + 'deg)';
                    }, 'handle': scope.rHandle, 'stop': function (e, u) {
                        if (!notify('obj.beforeRotate', {'obj': scope.object.id})) return;
                        e = (u.angle.stop / Math.PI * 180);
                        scope.Control.abit.filter('[id=r]').val(e);
                        applyPropertyOption(scope.dom, {'rotate': e});
                        scope.object.prop.r = e;
                        notify('obj.afterRotate', {'obj': scope.object.id})
                    }
                })
                scope.opacitySlider = scope.Control.abit.filter('[id=opacity_gui]').ionRangeSlider({
                    max: 10, min: 0, step: 0.2, from: scope.opa, onFinish: function (e) {
                        notify('obj.beforeFx', {'obj': scope.object.id, 'ref': 'opacity'});
                        scope.object.prop.opacity = e.from;
                        scope.svgfxOb.load({'opacity': e.from});
                        scope.svgfxOb.applyAll('opacity', true)
                        scope.Control.abit.filter('[id=opacity]').val(e.from / 10);
                        notify('obj.afterFx', {'obj': scope.object.id, 'ref': 'opacity'});
                    }
                }).data('ionRangeSlider')
                if (scope.object.alias == 'shape' && scope.object.prop.sym == 'button') {
                    scope.Control.buttonCorner.ionRangeSlider({
                        'min': 0,
                        'max': 100,
                        'from': scope.object.prop.radius,
                        'onChange': function (e, v) {
                            scope.object.prop.radius = e.from;
                        },
                        'onFinish': function (e, g) {
                            v = (25 / 100) * e.from;
                            g = scope.object.prop.off;
                            scope.object.prop.cmd = roundPathCorners(c.svgButtonNs, v);
                            scope.domBtn.setAttribute('d', scope.object.prop.cmd);
                        }
                    })
                }
                if (scope.object.prop.sym == 'text' || scope.object.prop.sym == 'button') {
                    scope.symFx.fx.textEdit.gui(c.domPropContent);
                    scope.symFx.on('render', function (fx, opt, bb) {
                        if (fx !== 'textEdit') return;
                        opt = scope.symFx.fx.textEdit.options;
                        scope.object.prop = $.extend(true, scope.object.prop, opt);
                        scope.object.prop.source = scope.object.prop.text;
                        delete scope.object.prop.textString;
                        delete scope.object.prop.text;
                        if (opt.sym == 'text' && opt.color) {
                            delete scope.object.prop.color;
                        }
                        if (scope.object.prop.sym == 'text' && scope.symFx.fx.textEdit.textChanged) {
                            bb = scope.symFx.fx.textEdit.getBoundary();
                            scope.object.prop.off = scope.symFx.fx.textEdit.getOffset();
                        }
                    })
                }
                if (scope.object.alias == 'images') {
                    scope.Control.imgUpdate.on('up.done', function (e, r) {
                        if (!notify('obj.beforeCreateUpdate', {'obj': scope.object.id})) return
                        e = r;
                        scope.object.prop.src = e.u;
                        scope.dom.find('svg image:first').attr({'xlink:href': e.u,});
                        notify('obj.afterCreateUpdate', {'obj': scope.object.id});
                    }).upload();
                }
                break;
            case'fx':
                e = $('<div class="card-block pb-0"><p>' + c.language('editor_ui_proptab1_info') + '</p><div class="input-group"><div class="input-group-addon" title="' + c.language('editor_ui_tip_fxadd') + '"><span class="fa fa-plus"></span></div><input class="form-control" readonly size></div></div>')
                e.appendTo(c.domPropContent);
                scope.fx = [];
                scope.svg = scope.dom.find('svg:first').get(0);
                scope.Effect = scope.svgfxOb.init(scope.svg);
                scope.Effect.on('delete', function (fx, i) {
                    delete scope.object.prop[fx];
                    i = scope.fx.indexOf(fx);
                    if (i !== -1) {
                        scope.fx.splice(i, 1);
                    }
                    i = fx.toLowerCase();
                    notify('obj.afterFxclear', {'ref': i, 'obj': scope.object.id});
                }).on('init', function (fx, a) {
                    i = fx.toLowerCase();
                    notify('obj.beforeFx', {'obj': scope.object.id, 'ref': i});
                    scope.object.prop[fx] = a;
                    notify('obj.afterFx', {'obj': scope.object.id, 'ref': i});
                }).on('start', function (fx, i) {
                }).on('render', function (fx, i) {
                    clearTimeout(scope.afterFxwork);
                    scope.afterFxwork = window.setTimeout(function () {
                        i = fx.toLowerCase();
                        notify('obj.beforeFx', {'obj': scope.object.id, 'ref': i});
                        if (typeof scope.Effect.fx[fx].options == 'object') {
                            scope.object.prop[fx] = $.extend(true, {}, scope.Effect.fx[fx].options);
                        } else {
                            scope.object.prop[fx] = scope.Effect.fx[fx].options;
                        }
                        notify('obj.afterFx', {'obj': scope.object.id, 'ref': i});
                    }, 50)
                })
                scope.Effect.onClear = function (f, i) {
                    f = scope.Effect.fx[scope.Effect.activeFx];
                    if (!f) return;
                    i = scope.Effect.activeFx.toLowerCase();
                    notify('obj.beforeFxclear', {'obj': scope.object.id, 'ref': i});
                    f.destroy();
                    scope.fxDom.empty();
                    scope.FxList.val('');
                    delete scope.Effect.fx[scope.Effect.activeFx];
                    scope.Effect.activeFx = false;
                }
                scope.Effect.onActivate = function (i) {
                    i = scope.fxKlist.find('ul > li[data-value="' + scope.Effect.activeFx + '"]');
                    if (i.length > 0) {
                        i.after(scope.fxDom);
                    } else {
                        scope.fxKlist.update();
                    }
                    scope.fxDom.empty();
                    scope.activeFxTitle = scope.tpl(scope.Effect.activeFx).tx;
                    if (scope.Effect.fx[scope.Effect.activeFx]) {
                        scope.Effect.fx[scope.Effect.activeFx].gui(scope.fxDom);
                    }
                    scope.FxList.val(scope.activeFxTitle);
                }
                scope.tpl = function (e, f, tx, ic) {
                    tx = e[0].toUpperCase() + e.substr(1);
                    f = '';
                    ic = 'circle';
                    if (e == 'background') {
                        tx = tx + ' fill';
                        ic = 'paint-brush';
                    } else if (e == 'border') {
                        tx = 'Stroke';
                        ic = 'circle-o-notch';
                    } else if (e == 'shadow') {
                        ic = 'circle';
                        f = 'filter:drop-shadow(4px -1px 0px black)';
                    } else if (e == 'opacity') {
                        ic = 'adjust';
                    } else if (e == 'blur') {
                        ic = 'tree';
                        f = 'filter:blur(1px)';
                    } else if (e == 'saturation') {
                        ic = 'sun-o';
                    } else if (e == 'hue') {
                        ic = 'tint';
                    } else if (e == 'brightness') {
                        ic = 'adjust';
                        f = 'color:#000';
                    } else if (e == 'tear') {
                        tx = 'Wooble';
                        ic = 'leaf';
                    } else if (e.indexOf('fx2') === 0) {
                        e = e.substr(3);
                        e = c.filters[c.filterMap[e].g].items[c.filterMap[e].i];
                        tx = e.name;
                    }
                    return {'ic': ic, 'f': f, 'tx': tx, 'tt': tx}
                }
                scope.customList = [{'name': 'Custom', 'items': c.Supported(scope.object.alias)}];
                if (c.filters) {
                    scope.g2 = [];
                    scope.g2.unshift(scope.customList[0]);
                    scope.customList = scope.g2;
                }
                scope.g2 = []
                for (i = 0; scope.customList.length > i; i++) {
                    scope.g = $.map(scope.customList[i].items, function (e, k, a) {
                        if (typeof e == 'string') {
                            if (scope.object.prop[e] !== undefined) {
                                scope.fx.push(e);
                            }
                            a = scope.tpl(e);
                        } else {
                            a = {'tx': e.name, 'ic': 'circle', 'tt': e.title};
                            e = 'fx2' + e.id;
                        }
                        return '<a data-value="' + e + '" title="' + a.tt + '" href="#" style="cursor:pointer"><i style="' + a.f + '" class="fa fa-' + a.ic + '"></i> <span class="title">' + a.tx + '</span></a>';
                    })
                    scope.g2.push('<strong style="font-weight:bold" class="mb-2 d-block b-b">' + scope.customList[i].name + '</strong>' + scope.g.join(''));
                }
                scope.Fx = e.find('div.input-group-addon:first').menu({
                    'items': scope.g2, 'init': function (e, ui) {
                        ui.menu.css('width', 'max-content')
                        ui.menu.find('.menu ul > li').each(function () {
                            $(this).addClass('ml-3');
                        })
                        ui.menu.find('li > a[data-value]').on('click', function (e, v, x) {
                            e = $(this);
                            v = e.data('value');
                            e = c.Supported(scope.object.alias);
                            x = v.indexOf('fx2');
                            if (x === -1 && e.indexOf(v) === -1) return;
                            if (scope.fx.indexOf(v) === -1) {
                                c.menuFx.hide();
                                e = {};
                                if (typeof c.svgEffectsList[v] == 'object') {
                                    e[v] = $.extend(true, {}, c.svgEffectsList[v])
                                } else {
                                    e[v] = c.svgEffectsList[v];
                                }
                                scope.Effect.activeFx = v;
                                scope.Effect.loadAll(e);
                                scope.Effect.applyAll(v);
                                scope.fx.push(v);
                                scope.fxDom.empty();
                                scope.Effect.onActivate();
                            }
                        })
                    }, 'show': function () {
                        c.menuFx.menu.find('li > a').each(function (e, v, a) {
                            a = $(this);
                            v = a.data('value');
                            a.find('i.fa-close').remove();
                            if (scope.fx.indexOf(v) !== -1) {
                                a.append('<i class="fa float-right fa-close text-danger"></i>');
                            }
                        })
                    }
                });
                scope.FxList = scope.Fx.next('input')
                c.menuFx = scope.Fx.menu('widget');
                e = $('<div class="card-block pt-0"><div class="w-100"></div></div>')
                e.appendTo(c.domPropContent);
                scope.fxDom = e.children('div:last');
                e = $('<div class="card-block"></div>');
                scope.fxKlist = scope.FxList.parent().after(e).nextAll('div:last')
                scope.fxKlist.update = function (i, f, e) {
                    scope.fx = scope.Effect.toArray();
                    e = '';
                    scope.ggh = c.Supported(scope.object.alias);
                    for (i = 0; scope.fx.length > i; i++) {
                        if (scope.fx[i].indexOf('fx2') === -1 && scope.ggh.indexOf(scope.fx[i]) == -1) continue;
                        f = scope.tpl(scope.fx[i]);
                        e += '<li data-value="' + scope.fx[i] + '" style="cursor:pointer" class="card-header d-block bg-faded mb-1"><a href="#" data-value="' + scope.fx[i] + '"><i class="fa fa-sort fa-lg text-muted"></i><span class="title ml-2 text-muted">' + f.tx + '</span></a><div class="d-inline-flex float-right"><i data-trigger="del" class="fa fa-remove  text-danger" title="' + c.language('editor_ui_tip_fxdel') + '"></i></div></li>';
                    }
                    scope.fxKlist.html('<ul class="card p-0 m-0 fxlist bg-none">' + e + '</ul>');
                }
                scope.fxKlist.on('click', '> ul.card > li[data-value]', function (e, v) {
                    e.preventDefault();
                    v = $(this).data('value');
                    if (scope.Effect.activeFx === v) {
                        scope.Effect.activeFx = null;
                        scope.fxDom.empty();
                        return;
                    }
                    scope.fxDom.empty();
                    scope.Effect.activeFx = v;
                    scope.Effect.onActivate();
                }).on('click', 'ul.card > li[data-value] > div i', function (e, i) {
                    e.preventDefault();
                    e.stopPropagation();
                    e = $(this).parents('li');
                    i = $(this).data('trigger');
                    if (i == 'del') {
                        scope.Effect.activeFx = e.data('value');
                        scope.Effect.onClear();
                        e.remove();
                    } else if (i == 'toggle') {
                        scope.Effect.toggle(e.data('value'));
                    }
                }).sortable({
                    'items': '> ul li', 'axis': 'y', 'containment': scope.fxKlist, 'delay': 10, 'start': function () {
                        scope.fxDom.addClass('d-none')
                    }, 'stop': function () {
                        scope.fxKlist.find('ul > li[data-value="' + scope.Effect.activeFx + '"]:first').after(scope.fxDom);
                        scope.fxDom.removeClass('d-none');
                    }, 'update': function (e) {
                        e = [];
                        scope.fxKlist.find('ul > li').each(function (i) {
                            i = $(this).data('value');
                            if (scope.Effect.fx[i]) {
                                e.push(i);
                            }
                        })
                        if (e.length > 0) {
                            scope.Effect.reorganise(e)
                        }
                    }
                })
                if (scope.fx.length > 0) {
                    e = scope.fx[0];
                    scope.Effect.activeFx = e;
                    scope.fxKlist.update();
                    scope.Effect.onActivate();
                }
                break;
        }
        if (c.rightBarSeen == false && !c.domHelpWrapper.hasClass('active')) {
            c.domHelpWrapper.animate({'right': 0}, 500, function () {
                $(this).addClass('active')
            })
        }
        notify('inspector.afterOpen', {'tab': scope.tab});
    })
    c.domLibraryContainers.filter('#objectpack_bg').find('#editor_material_pattern .row:first > div button.btn:first').click(function (a) {
        a = $(this).parents('.row').next('.row')
        c.randomPatternPalette(a);
    }).parent().prev('button').click(function (a, d, i) {
        d = $(this);
        a = d.parent('div');
        a.find('.pattern_editor_wrapper').remove();
        if (d.hasClass('open')) {
            d.removeClass('open btn-link').addClass('btn btn-outline-primary').html('Customize')
            a.next().show(0);
            d.next().show(0)
            return;
        }
        d.addClass('open btn-link').html('<span class="fa-lg os-icon os-icon-close"></span>');
        a.next().hide(0);
        d.next().hide(0)
        a.append('<div class="row col-12 pattern_editor_wrapper"><div class="col-12"><p>Colors</p><div class="d-flex"></div></div><div class="col-12"><p>Weight</p><input /></div><div class="col-12"><p>Variance</p><input /></div><div class="col-12 mt-3"><button class="btn btn-primary center">Generate</button></div></div>');
        d = c.domCanvas.children('div:visible:first');
        i = d.index();
        d = a.find('.pattern_editor_wrapper').children();
        a = d.eq(0).find('div');
        if (!c.slides[0].background.pattern) {
            c.slides[0].background = {'pattern': c.libs.bg_patterns[0]}
            c.applyPattern(c.domCanvas.children('div:visible:first'), c.slides[0].background.pattern)
        }
        $.each(c.slides[0].background.pattern.opts.colors, function (i, v) {
            a.append('<div class="colorplate" fill="' + v + '" style="background-color:' + v + ';width:35px;cursor:pointer"></div>')
        })
        a.children().colorGold().each(function (i) {
            i = this.getAttribute('fill');
            $(this).data('colorGold').color = i;
        }).on('colorupdate', function (e, cl) {
            this.setAttribute('fill', cl.color);
            this.style.backgroundColor = cl.color;
            e = $(this).index();
            c.slides[0].background.pattern.opts.colors[e] = cl.color;
        })
        d.eq(1).find('input').ionRangeSlider({
            'min': 0,
            'max': 100,
            'step': 2.5,
            'from': c.slides[0].background.pattern.opts.stroke_width,
            'sc': i,
            'onFinish': function (e) {
                c.slides[0].background.pattern.opts.stroke_width = e.from;
            }
        })
        d.eq(2).find('input').ionRangeSlider({
            'min': 0,
            'max': 10,
            'step': 0.5,
            'from': c.slides[0].background.pattern.opts.variance,
            'sc': i,
            'onFinish': function (e) {
                c.slides[0].background.pattern.opts.variance = (1 / 10) * e.from;
            }
        })
        d.eq(3).find('button.btn').click(function (cf, pattern) {
            if (!notify('screen.beforePaint', {'ref': 'pattern'})) return;
            cf = $.extend({}, c.slides[0].background.pattern.opts)
            cf.x_colors = cf.colors;
            cf.width = 100;
            cf.height = 100;
            delete cf.colors;
            cf.seed = $.now() + 'os2';
            pattern = Trianglify(cf);
            c.slides[0].background.pattern = {
                'opts': {
                    'colors': pattern.opts.x_colors,
                    'seed': pattern.opts.seed,
                    'cell_size': pattern.opts.cell_size,
                    'stroke_width': pattern.opts.stroke_width,
                    'variance': pattern.opts.variance
                }, 'points': pattern.polys
            }
            c.applyPattern(c.domCanvas.children('div:visible:first'), c.slides[0].background.pattern);
            notify('screen.afterPaint');
        })
    });
    c.domEditorAnimeButtons = c.domEditorSubHeader.children('div[data-tab=anime]').find('a[data-tool-active="anime"]');
    c.domEditorSubHeader.children('div[data-tab=anime]').find('input[data-tool-input],select[data-tool-input]').each(function (e) {
        e = $(this).attr('data-tool-input');
        c['domEditorAnimeInput_' + e] = this;
    })
    c.anime_type_transition = {};
    $.each(c.anime_types, function () {
        if (this.title.toLowerCase() !== 'advanced') return;
        $.each(this.items, function () {
            c.anime_type_transition[this.key] = this.title;
            $(c.domEditorAnimeInput_transition).append('<option value="' + this.key + '">' + this.title + '</option>');
        })
    })
    c.domEditorAnimeButtons.on('click', function (e, b, o) {
        if (this.id == 'slide_play_all') {
            c.TL.seek(0)
            c.TL.play();
        } else if (this.id == 'slide_all_stop') {
            c.TL.stop();
        }
    })
    c.domDrawingToggle = c.domDrawingShapes.prev('#drawing_tool_wrapper');
    c.activeDrawHelperBrushThickness = 2;
    c.activeDrawHelperColor = '#000';
    c.domDrawingShapes.find('[data-tool-active=draw]').css('cursor', 'pointer').on('click', function (e, p, cf) {
        e = $(this).attr('id').substr(5);
        cf = {
            'type': 'line', 'init': function () {
                c.transformHandler.disable();
            }, 'stop': function (sp, item, opt) {
                c.domStageViewport.selectable('enable');
                if (this.dragEm) {
                    toastr.info('Drawing ended');
                    this.dragEm.each(function (i, e) {
                        if (typeof e !== 'object') return;
                        e.data('locked', false);
                        if (e.is('.ui-draggable')) e.draggable('enable');
                    })
                }
                this.o = {};
                this.o.i = $(sp.data);
                this.o.i.data({'object': 'shape', 'object-ref': 'basic', 'object-src': sp.build});
                this.o.i.attr({'width': sp.cord.width, 'height': sp.cord.height});
                this.off = real_offset(this.o.i);
                this.o.s = c.domCanvas.children('div:visible:first')
                if (!notify('obj.beforeCreate')) return;
                this.o.p = sp.cord;
                this.o.l = this.o.s.children('div.objectBox').length;
                c.domCanvas.trigger('addObject', [this.o.i, this.o.p, this.o.i]);
                notify('obj.afterCreate');
                this.o.n = this.o.s.children('div.objectBox');
                if (this.o.n.length > this.o.l) {
                    this.o.l = this.o.n.last();
                    this.o.c = c.slides[this.o.s.index()].elements[this.o.l.attr('scope')];
                    this.o.l.css({
                        'width': this.off.widthab + '%',
                        'height': this.off.heightab + '%'
                    }).attr('data-object-ref-ext', 'drawing');
                    this.o.c.prop.w = this.off.width;
                    this.o.c.prop.h = this.off.height;
                    this.o.c.prop.left = this.off.left;
                    this.o.c.prop.top = this.off.top;
                }
                this.o.i.remove();
            }
        }
        if (['line', 'circle', 'square', 'polygon', 'polyline', 'pencil'].indexOf(e) !== -1) {
            cf.type = e;
        }
        cf.dragEm = c.domCanvas.children('div:visible:first').children('div.objectBox[scope]').map(function (e) {
            e = $(this).data('locked', true);
            if (e.is('.ui-draggable')) e.draggable('disable');
            return e;
            return null;
        })
        p = new drawPencil(cf);
        c.domStageViewport.selectable('disable');
        p.init();
    })
    $('#launch_app_store').click(function () {
        c.appStore();
    })
    c.domLibraryContainers.filter('#objectpack_images,#objectpack_bg').find('input.mac,#editor_material_images input.mac').on('input', function () {
        e = $(this).val();
        if (e == '' || e.length == 0) {
            clearTimeout(c.searchingobject);
            $(c.searchable.parentNode.parentNode).removeClass('searching').find('.row.sp').remove();
            return;
        }
        c.searchable = this;
        clearTimeout(c.searchingobject);
        c.searchingobject = setTimeout(function (v, p, t) {
            p = $(c.searchable.parentNode.parentNode);
            p.addClass('searching');
            t = 'bg_images';
            if (p.is('#objectpack_images')) {
                t = 'images';
            }
            p.find('div[data-object].show').removeClass('show');
            v = p.find('.row:first');
            v.children('figure:first').remove();
            v.prepend(loader);
            v = $(c.searchable).val();
            $.getJSON(location.origin + '/editor/getphoto.php?type=' + t + '&q=' + v, function (r, b, I, a, k, wr) {
                if (r.items.length < 1) {
                    a = c.language('editor_ui_msg_dataloadempty');
                    toastr['error'](a + '!');
                    p.removeClass('searching');
                }
                if (r.type == 'bg_images') {
                    a = c.domLibraryContainers.filter('#objectpack_bg').find('.tab-content > #editor_material_images .row:first');
                } else {
                    a = c.domLibraryContainers.filter('#objectpack_images').children('.row')
                }
                a.children('figure:first,.row.sp').remove();
                c['cached' + r.type] = c[r.type];
                c[r.type] = r;
                c['loaded' + r.type] = 0;
                b = Object.keys(c[r.type].items);
                wr = a.parent().attr('id');
                a = a.append('<div class="row sp m-0 center"></div>').children(':last');
                a.css('width', a.parent().width() + 'px');
                a.masonry({'items': '.object:visible', 'gutter': 5, 'columnWidth': 100, 'transitionDuration': 0});
                a.addClass('masi');
                for (i = 0; b.length > i; i++) {
                    k = c['loaded' + r.type];
                    I = new Image;
                    I.id = b[k];
                    if (I.id == undefined || c[r.type].items[I.id] == undefined) continue;
                    a.append('<div data-object="' + r.type + '" style="height:' + c[r.type].items[I.id].lh + 'px;" data-object-ref="' + b[k] + '" class="show col-5 m-0 object loading fade p-0 mt-1 item">' + loader + '</div>');
                    I.name = r.type;
                    I.mode = wr;
                    I.hi_src = c[r.type].items[I.id].u;
                    I.onload = function () {
                        d = $('#' + this.mode + ' .row:first > div.sp > div[data-object-ref="' + this.id + '"]').removeClass('loading').addClass('loaded in').html('<div class="toolbar"><a title="' + c.language('editor_ui_tip_libsave') + '" href="#"><span class="fa fa-save"></span></a></div><img hi_src="' + this.hi_src + '" style="width:100%" src="' + this.src + '" />');
                        if (this.name == 'images') {
                            d.attr('draggable', true).addClass('object');
                        }
                        d.css('height', (100 / this.width * this.height))
                        d.parent().masonry('appended', d);
                    }
                    I.onerror = function (d) {
                        d = $('#' + this.mode + ' .row:first > div[data-object-ref="' + this.id + '"]');
                        d.parent().masonry('remove', d);
                        d.remove();
                    }
                    I.src = c[r.type].items[I.id].l;
                    c['loaded' + r.type]++;
                    if (i >= 20) break;
                }
            }).fail(function (a) {
                a = c.domLibraryContainers.filter('#objectpack_images').children('.row')
                p.removeClass('searching');
                a.children('figure:first').remove();
                p = c.language('editor_ui_msg_brnoconn');
                toastr['error'](p);
                a.masonry()
            })
        }, 2000)
    })
    j('select#objectpack_toggler').on('change', function () {
        a = $(this).val();
        c.domSidebarToggle.find('ul > li > a[href="#' + a + '"]').trigger('click');
    })
    c.domLibraryContainers.filter('#objectpack_bg,#objectpack_emoji').find('ul.nav > li.nav-item > a').on('click', function (e) {
        e.preventDefault();
        a = this.href.split('#')[1];
        b = $(this).parents('ul');
        b.find('li > a.active').removeClass('active');
        b.next('div.tab-content').find('.tab-pane.active').hide(0);
        $(this).addClass('active');
        d = b.next('div.tab-content').find('.tab-pane[id=' + a + ']').show(0).addClass('active');
    })
    c.domLibraryContainers.filter('#objectpack_bg,#objectpack_emoji').find('ul.nav').each(function () {
        $(this).find('> li.nav-item:first a').trigger('click');
    })
    c.assetsMenu = $('<div/>').menu({
        'items': $.map(['Open', 'Rename', 'Share', 'Delete'], function (e, a) {
            i = e.toLowerCase();
            if (i == 'delete') {
                a = 'close';
                e = c.language('editor_ui_del');
            } else if (i == 'rename') {
                a = 'paragraph';
                e = c.language('editor_ui_rn');
            } else if (i == 'open') {
                a = 'folder-open';
                e = c.language('editor_ui_open')
            } else {
                a = 'share';
                e = c.language('editor_ui_strtmenshr')
            }
            e = '<a href="#" data-value="' + i + '"><i class="fa fa-' + a + '"></i><span>' + e + '</span></a>';
            return e;
        }), 'show': function (e, ui) {
            el = c.assetsMenu.element.parents('.item').data('perm');
            if (el && el.indexOf('write') === -1) {
                ui.menu.find('li:gt(0) a').not('[disabled]').attr('disabled', true);
            } else {
                ui.menu.find('li:gt(0) a').removeAttr('disabled')
            }
            Events.one('sidebar.open', 'before', function (e) {
                if (e !== 'folders') c.assetsMenu.hide()
            })
        }, 'init': function (e, u) {
            u.menu.find('.menu ul > li a[data-value]').on('click', function (i, el, e) {
                i = $(this).data('value');
                el = c.assetsMenu.element.parents('.item');
                e = el.data('perm');
                if (e && e.indexOf('write') === -1) {
                    c.assetsMenu.hide();
                    return;
                }
                if (i == 'rename') {
                    e = c.editorSDK.gui.prompt('Enter folder name', function (v) {
                        v = $.trim(v);
                        v = v.replace(/[^a-z0-9\s]/ig, '')
                        if (v.length == 0 || v === this.oldname) return;
                        $.ajax({
                            'el': el,
                            'url': location.origin + '/editor/folder.php?t=' + i,
                            'type': 'POST',
                            'data': {'n': v, 'o': el.data('id')}
                        }).done(function (n) {
                            r = this.el.data('id')
                            for (i = 0; c.assetsList.length > i; i++) {
                                if (c.assetsList[i].name == r) {
                                    c.assetsList[i].name = n;
                                    this.el.find('> span.title:first').text(n);
                                    break;
                                }
                            }
                        });
                    });
                    e.oldname = el.data('id');
                    e.body.find('input:last').val(e.oldname);
                } else if (i == 'delete') {
                    c.editorSDK.gui.confirm(null, function () {
                        $.ajax({
                            'el': el,
                            'url': location.origin + '/editor/folder.php?t=' + i,
                            'type': 'POST',
                            'data': {'n': el.data('id')}
                        }).done(function (i, r) {
                            r = this.el.data('id')
                            for (i = 0; c.assetsList.length > i; i++) {
                                if (c.assetsList[i].name == r) {
                                    delete c.assetsList[i];
                                    break;
                                }
                            }
                            c.assetsList = Object.values(c.assetsList);
                            this.el.remove();
                        })
                    })
                } else if (i == 'open') {
                    c.assetsMenu.processAction('open', {'id': el.data('id')})
                } else if (i == 'share') {
                    mdDialog(function () {
                        this.size = 'medium';
                        this.title = c.language('editor_ui_txt_fdshrhead');
                        this.id = el.data('id');
                        this.selectUsers = function () {
                            openContacts(function (r) {
                                if (r.length == 0) return;
                                c.assetShareWin.btn.find('span.fa').remove();
                                c.assetShareWin.btn.attr('disabled', true).append('<span class="fa fa-spin fa-spinner ml-1"></span>');
                                c.assetShareWin.request = $.post(location.origin + '/editor/folder.php?t=share', {
                                    'n': c.assetShareWin.id,
                                    'o': r
                                }, function (r) {
                                    c.assetShareWin.refreshList(r)
                                }, 'json').always(function () {
                                    c.assetShareWin.btn.find('span.fa').remove();
                                    c.assetShareWin.btn.removeAttr('disabled');
                                });
                            })
                        }
                        this.refreshList = function (r, e) {
                            e = this.box.empty();
                            if (r.length == 0) {
                                e.html('<div class="alert alert-info col-12"><p>' + c.language('editor_ui_shrwin_noinfo') + '</p></div>');
                                return;
                            }
                            $.each(r, function (i) {
                                i = $('<div class="col-11 item card-header bg-faded"><span class="title">' + this.name + '</span><span class="fa fa-close float-right" style="cursor:pointer"></span></div>');
                                e.append(i);
                                i.data('id', this.id);
                            })
                        }
                        this.oninit = function () {
                            this.body = $(this.target + ' .modal-body');
                            this.body.parents('.modal-dialog:first').addClass('bg-current');
                            c.assetShareWin = this;
                            this.body.append('<div class="card-block p-0"><p class="m-0 p-0 d-inline"><span class="fa fa-stack fa-folder fa-2x" style="width:auto"></span> <span class="ml-2">' + this.id + '</span></p><button disabled class="btn btn-outline-primary float-right">' + c.language('editor_ui_shrwin_selbtn') + ' <span class="fa fa-plus"></span></button></div>')
                            this.body.append('<div class="card-block"><div class="row fancyscroll scroll-y">' + loader + '</div></div>');
                            this.box = this.body.find('> div.card-block:last > .row:last').css('maxHeight', '400px').on('click', '.item > span.fa-close', function (e) {
                                e = $(this);
                                e.removeClass('fa-close').addClass('fa-spin fa-spinner');
                                i = e.parent().data('id')
                                c.assetShareWin.request = $.ajax({
                                    'url': location.origin + '/editor/folder.php?t=unshare',
                                    'type': 'POST',
                                    'data': {'n': c.assetShareWin.id, 'o': [i]},
                                    'el': e
                                }).done(function (i) {
                                    i = this.el.parent().siblings('.item')
                                    i.filter(this.el.parent()).remove();
                                    if (i.length == 0) {
                                        c.assetShareWin.box.html('<div class="alert alert-info col-12"><p>' + c.language('editor_ui_shrwin_noinfo') + '</p></div>');
                                    }
                                }).always(function () {
                                    this.el.removeClass('fa-spin fa-spinner').addClass('fa-close')
                                })
                            })
                            this.btn = this.body.find('> div.card-block:first > button:last').on('click', function () {
                                c.assetShareWin.selectUsers();
                            })
                            this.request = $.get(location.origin + '/editor/folder.php?t=sharing&n=' + this.id, function (r, e, o) {
                                if (r.length == 0) {
                                    c.assetShareWin.box.html('<div class="alert alert-info col-12"><p>' + c.language('editor_ui_shrwin_noinfo') + '</p></div>');
                                } else {
                                    c.assetShareWin.refreshList(r)
                                }
                            }, 'json').fail(function () {
                                c.assetShareWin.box.html('<div class="alert alert-danger col-12"><p>' + c.language('editor_ui_nodata') + '</p></div>');
                            }).always(function () {
                                c.assetShareWin.btn.removeAttr('disabled');
                            })
                        }
                        this.onhide = function () {
                            delete c.assetShareWin;
                            this.request.abort();
                            this.destroy();
                        }
                        return this;
                    })
                }
                c.assetsMenu.hide()
            })
        }
    })
    c.assetsMenu = c.assetsMenu.menu('widget');
    c.assetsMenu.processAction = function (t, o, e) {
        if (t == 'open') {
            c.domAssetsView.addClass('d-none')
            c.domAssetsView.prev().find('p').text(o.id);
            c.domAssetsViewCurrent = o.id;
            e = c.domAssetsView.next().removeClass('d-none').html('<div class="text-right col-12"><button class="btn btn-link"><span class="fa-lg os-icon os-icon-close"></span></button></div><div class="col-12 scroll-y fancyscroll asset_list" style="max-height:450px"></div>').find('> div:last').html(loader)
            e.prev().find('button:first').one('click', function () {
                delete c.domAssetsViewCurrent;
                c.domAssetsView.next().empty().addClass('d-none')
                c.domAssetsView.removeClass('d-none');
                if (c.domAssetsRequest) c.domAssetsRequest.abort();
                c.domAssetsView.prev().find('p').text('All folders')
            })
            c.domAssetsRequest = $.ajax({
                'url': location.origin + '/editor/folder.php?t=' + t + '&n=' + o.id,
                'type': 'GET',
                'dataType': 'json'
            }).done(function (r, o, e, f, i) {
                if (r.length == 0) {
                    c.domAssetsView.next().find('> div:last').html('<p>' + c.language('editor_ui_msg_dataloadempty') + '</p>')
                    return;
                }
                o = c.domAssetsView.next().find('> div:last').empty();
                for (i = 0; r.length > i; i++) {
                    e = c.injectElement(r[i].d, function (e, p) {
                        e = $(e).addClass('in').wrap('<div data-object="f-asset" class="col-10 mt-2 center p-4 drag object item"><div></div></div>');
                        p = e.parents('.drag').addClass('loaded');
                        p.append('<div class="toolbar"><span class="fa fa-close fa-stack text-current"></span></div>');
                        p.data('heap', e.data('data-heap'))
                        e.removeData('data-heap');
                    }, o, r[i]);
                    if (e) $(e).addClass('fade');
                }
            });
        }
    }
    c.assetsMenu.init();
    c.domAssetsView.each(function (e) {
        e = $(this);
        e.on('click', '.item', function (e) {
            e = $(this);
            c.assetsMenu.processAction('open', {'id': e.data('id')})
        })
        e.on('click', '.item span.fa-ellipsis-h', function (e) {
            e.preventDefault();
            e.stopPropagation();
            c.assetsMenu.element = $(this);
            if (c.assetsMenu.menu.is(':visible')) {
                c.assetsMenu.show();
            } else {
                c.assetsMenu.show();
            }
        })
    });
    c.domAssetsView.next().on('click', '.item > .toolbar', function (e, o) {
        e.stopPropagation();
        e.preventDefault();
        e = $(this).parents('.item');
        o = e.data('heap');
        e.addClass('d-none')
        $.ajax({
            'el': e,
            'url': location.origin + '/editor/folder.php?t=remove_asset',
            'type': 'POST',
            'data': {'n': o.id}
        }).done(function () {
            this.el.remove();
        }).fail(function () {
            this.el.removeClass('d-none')
        })
    })
    c.domAssetsView.prev().find('a:first').on('click', function () {
        $(this).find('> span.fa').addClass('fa-spin');
        if (c.AssetsRequest) c.AssetsRequest.abort();
        c.AssetsRequest = $.get(location.origin + '/editor/loadfolder.php', function (r) {
            c.assetsList = r;
            notify('sidebar.afterOpen', {'tab': 'folders'});
        }, 'json').always(function () {
            c.domAssetsView.prev().find('a:first > span.fa').removeClass('fa-spin');
            delete c.AssetsRequest;
        })
    })
    c.domAssetsView.prev().prev().find('button.btn').on('click', function (e) {
        e = c.editorSDK.gui.prompt(c.language('editor_ui_msg_fdpname'), function (v) {
            v = $.trim(v);
            v = v.replace(/[^a-z0-9\s]/ig, '')
            if (v.length < 1) {
                alertMessage('error', c.language('editor_ui_msg_fdnoname'));
                return;
            }
            this.el.find('i.fa-spin').remove();
            this.el.prepend('<i class="fa fa-spinner fa-spin mr-1"></i>')
            $.ajax({
                'type': 'POST',
                'data': {'n': v},
                'url': location.origin + '/editor/newfolder.php',
                'btn': this.el
            }).done(function (r) {
                if (c.assetsList && c.assetsList.indexOf(r) == -1) {
                    c.assetsList.push({'name': r, 't': 0})
                } else if (!c.assetsList) {
                    c.assetsList = [{'name': r, 't': 0}]
                } else {
                    c.assetsList.push({'name': r, 't': 0})
                }
                notify('sidebar.afterOpen', {'tab': 'folders'});
                toastr.success(c.language('editor_ui_msg_failedok'))
            }).fail(function () {
                toastr.error(c.language('editor_ui_msg_failedop'))
            }).always(function () {
                this.btn.find('i.fa-spin').remove();
            })
        })
        e.el = $(this);
    })
    c.domLibraryContainers.filter('#objectpack_images').find(' .tab-content > #editor_material_images .row:first,.row').on('scroll', function (e) {
        if ($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
            $(this).trigger('loadmore');
        }
    }).on('loadmore', function (i, k) {
        if ($(this).parent().is('#objectpack_images')) {
            k = 'images';
        } else {
            k = 'bg_images';
        }
        if (c['loaded' + k] && c['loaded' + k] >= 200) {
            return;
        }
        if (k == 'bg_images') {
            a = $('#objectpack_bg .tab-content > #editor_material_images .row:first');
        } else {
            a = $('#objectpack_images > .row');
        }
        if (a.is(':has(div)') == false) {
            a.html(loader);
        }
        getPhoto(function (type, I, wr, s, d, o) {
            if (type == 'bg_images') {
                a = $('#objectpack_bg .tab-content > #editor_material_images .row:first');
            } else {
                a = $('#objectpack_images > .row');
            }
            if (I === false) {
                a.html('<span class="alert alert-danger w-100"><p>' + c.language('editor_ui_msg_dataloaderr') + '</p></span>')
                return;
            }
            b = Object.keys(c[type].items);
            wr = a.parent();
            wrd = wr.attr('id');
            s = wr.is('.searching');
            if (s) {
                a = a.find('.row.sp');
            }
            a.children('figure').remove();
            o = {};
            o.wd = 100
            if (a.is('.masi') == false) {
                a.css('width', '100%');
                a.masonry({'items': '.object:visible', 'gutter': 5, 'columnWidth': o.wd, 'transitionDuration': 0});
                a.addClass('masi center');
            }
            for (i = 0; 15 > i; i++) {
                k = c['loaded' + type];
                I = new Image;
                I.id = b[k];
                if (I.id == undefined || c[type].items[I.id] == undefined) continue;
                a.append('<div style="width:' + o.wd + 'px" data-object="' + type + '"  data-object-ref="' + b[k] + '" class=" m-0 object loading fade p-0 mt-1 item">' + loader + '</div>');
                if (s == true) {
                    a.children(':last').addClass('show');
                }
                d = a.children(':last').css('height', c[type].items[I.id].lh);
                I.name = type;
                I.hi_src = c[type].items[I.id].u;
                I.mode = wrd;
                I.width = c[type].items[I.id].lw;
                I.height = c[type].items[I.id].lh;
                I.s = s;
                I.onload = function (d) {
                    if (this.s) {
                        d = $('#' + this.mode + ' .row:first > .sp > div[data-object-ref="' + this.id + '"]');
                    } else {
                        d = $('#' + this.mode + ' .row:first > div[data-object-ref="' + this.id + '"]');
                    }
                    d.removeClass('loading').addClass('loaded in').html('<div class="toolbar"><a title="' + c.language('editor_ui_tip_libsave') + '" href="#"><span class="fa fa-save"></span></a></div><img width="100%" src="' + this.src + '" hi_src="' + this.hi_src + '" />');
                    d.css('height', (100 / this.width * this.height))
                    if (type == 'images') {
                        d.attr('draggable', true).addClass('object');
                    }
                    d.parent().masonry('appended', d);
                }
                I.onerror = function (d) {
                    d = $('#' + this.mode + ' .row:first > div[data-object-ref="' + this.id + '"]');
                    d.parent().masonry('remove', d);
                    d.remove();
                }
                I.src = c[type].items[I.id].l;
                c['loaded' + type]++;
            }
        }, k);
    }).addClass('fancyscroll');
    j('a#object__view_toggler').click(function (e) {
        e.preventDefault();
        e = j(this);
        a = e.hasClass('mini');
        if (!a) {
            j('#objectpack').parent().animate({'flex': 0}, 500);
            e.addClass('mini').find('i:first').addClass('os-icon-arrow-left').removeClass('os-icon-arrow-right2');
        } else {
            j('#objectpack').parent().css('flex', '')
            e.removeClass('mini').find('i:first').removeClass('os-icon-arrow-left').addClass('os-icon-arrow-right2')
        }
    })
    $('#zoom_size_wrapper  input#zoom_size').ionRangeSlider({
        'min': 5,
        'max': 100,
        'hide_min_max': true,
        'hide_from_to': false,
        'grid': false,
        'step': 5,
        'prettify': function (n, w, h) {
            w = Math.round((c.width / 50) * n);
            h = Math.round((c.height / 50) * n);
            return w + 'x' + h;
        },
        'onUpdate': function (e) {
            if (this.disable == true) {
                return;
            }
            e = e.input.prop('value');
            e = parseInt(e);
            c.zoomLevel = e;
            if (e >= 5) {
                c.domCanvas.trigger('stage_resize');
            }
        },
        'onChange': function (e, f) {
            window.clearTimeout(c.zoomSlidervar);
            f = this;
            c.zoomSlidervar = window.setTimeout(function () {
                f.onUpdate(e);
            }, 500)
        }
    })
    c.domZoom.find('span.fa').click(function (e, a, w, h, i, b) {
        e = c.domZoom.find('input#zoom_size');
        a = parseInt(c.zoomLevel);
        if (a > 100) return;
        if ($(this).is('.fa-search-minus')) {
            e.val(a - 10);
        } else if ($(this).is('.fa-search-plus')) {
            e.val(a + 10);
        } else if ($(this).is('.fa-tv')) {
            b = [c.domStage.width(), c.domStage.height() - 48]
            for (i = 100; i > 0; i--) {
                w = Math.round((c.width / 50) * i);
                h = Math.round((c.height / 50) * i);
                if (b[0] > w && b[1] > h) {
                    e.val(i);
                    break;
                }
            }
        } else {
            e.val(50);
        }
        a = e.data('ionRangeSlider');
        a.update({'from': e.val()});
    })
    c.domCanvas.on('stage_resize', function (e, i, b, d) {
        e = c.zoomLevel;
        e = parseInt(e);
        if (!notify('workspace.beforeZoom')) return;
        b = Math.round((c.width / 50) * e);
        d = Math.round((c.height / 50) * e);
        $(this).css({'width': b, 'height': d}).attr({'width': b, 'height': d});
        c.stageWidth = b;
        c.stageHeight = d;
        if (i == true) {
            return;
        }
        notify('workspace.afterZoom');
    }).on('addStage', function (e) {
        e = $(this).children('div');
        e.hide(0)
        e = e.last();
        e.show(0);
        e.on('click', function (e) {
            if (($(e.target).parent().is('[id=viewport_stage_wrapper]')) == false) {
                return;
            }
            c.domStageViewport.trigger('click');
        })
    })
    c.domStageViewport.on({
        'mouseover': function (e) {
            e = $(this);
            if (e.data('uiDraggable')) return;
            if (e.data('locked') === true) return;
            e.draggable({
                'stop': function (ev, o) {
                    ev.left = o.position.left;
                    ev.top = o.position.top;
                    a = ((ev.left) / c.stageWidth) * 100;
                    b = ((ev.top) / c.stageHeight) * 100;
                    this.style.left = a + '%';
                    this.style.top = b + '%';
                    i = this.getAttribute('scope');
                    c.slides[0].elements[i].prop.left = ev.left;
                    c.slides[0].elements[i].prop.top = ev.top;
                    notify('obj.afterMove', {'obj': i});
                    c.domCanvas.trigger('connectScope', [i])
                }, 'start': function (i) {
                    i = this.getAttribute('scope');
                    notify('obj.beforeMove', {'obj': i});
                }
            });
        }
    }, '.objectBox')
    c.domStageViewport.on('click', function (e, i) {
        c.domDocBody.find('div.tpl_preview_box').addClass('d-none');
        i = (e.target.parentNode.id == 'wrapper_slide_viewport' || e.target.id == 'wrapper_slide_viewport' || e.target.parentNode.id == 'viewport_stage_wrapper' || $(e.target).hasClass('stageBoundary'));
        if (i !== true) return;
        if (c.selecting === true) return;
        $(this).attr('tabIndex', 0).focus();
        $('.sp-container').not('.sp-flat').remove();
        e = $('#wrapper_slide_viewport div#viewport_stage_wrapper').trigger('disconnectScope', ['.active,.ui-selected']);
        e.find('.objectBox.ui-selected').each(function (e) {
            e = $(this).attr('scope');
            if (c.currentSelection && c.currentSelection[e]) {
                delete c.currentSelection[e];
            }
            $(this).css('outline', '').removeAttr('tabIndex').removeClass('ui-selected');
        });
        $(this).children('div:visible').find('.objectBox[scope][data-object-ref=texts] > .object > span[contenteditable=true],.objectBox[scope][data-object-ref=buttons] > .object > span[contenteditable=true]').each(function (e, u, d, i) {
            $(this).prop('contenteditable', false);
            $(this).removeProp('contenteditable').prop('contenteditable', false);
            e = $(this).text();
            u = $(this).parents('.objectBox');
            u = u.attr('scope');
            d = u.substr(u.lastIndexOf('_') + 1);
            if (c.slides[d].elements[u].alias == 'buttons') {
                c.slides[d].elements[u].prop.text.content = e;
            } else {
                c.slides[d].elements[u].prop.content = e;
            }
        })
    }).selectable({
        'filter': '.objectBox', 'cancel': '.card-footer,.uidrag', 'delay': 300, 'selecting': function (e, u) {
            u = $(u.selecting);
            if (u.hasClass('invisible')) return;
            e = u.attr('scope');
            c.currentSelection[e] = u;
            u.css('outline', 'blue 2px solid').attr('tabIndex', 0);
            workspaceJob('performSelection', e);
            notify('workspace.afterObjectSelect');
        }, 'unselecting': function (e, u) {
            e = $(u.unselecting).attr('scope');
            $(u.unselecting).css('outline', '');
            if ($(u.unselecting).hasClass('active') == false) {
                $(u.unselecting).removeAttr('tabIndex');
            }
            if (c.currentSelection[e]) {
                delete c.currentSelection[e];
            }
            notify('workspace.afterObjectDeSelect');
        }, 'start': function () {
            c.currentSelection = {};
            c.selecting = true;
            c.transformHandler.disable();
            clearTimeout(c.notSelecting);
            $(this).removeAttr('tabIndex');
        }, 'stop': function (e) {
            c.notSelecting = setTimeout(function () {
                c.selecting = false;
            }, 500)
            if ((e = Object.keys(c.currentSelection)) && e.length > 0) {
                e = e[e.length - 1];
                c.transformHandler.enable(c.currentSelection[e], c.slides[0].elements[e])
                $(this).attr('tabIndex', 0).focus();
            }
        }
    }).droppable({
        'scope': 'object', 'accept': '.object[data-object]', 'drop': function (e, u, s, a) {
            if (u.draggable.hasClass('loaded') == false) {
                notify('workspace.afterObjNotReady');
                return;
            }
            if (!notify('obj.beforeCreate')) return;
            e = c.domCanvas.children('div:visible:first');
            s = '<div class="i" style="width:' + u.helper.width() + 'px;position:absolute;left:' + u.helper.position().left + 'px;top:' + u.helper.position().top + 'px;">' + u.helper.html() + '</div>';
            e.append(s);
            s = e.children().last();
            a = s.position();
            c.domCanvas.trigger('addObject', [u.draggable, a, s]);
            notify('obj.afterCreate');
            s.remove();
        }
    }).on('keydown', function (e, p, i, a, k) {
        p = Object.keys(c.currentSelection);
        if (p.length == 0) {
            if (c.Arcmode == 'p') {
                toastr['info']('Disabled in presentation mode');
                return;
            }
            if (e.which == 39) {
                i = c.domCanvas.children('div:visible:first').next().index();
                if (!c.slides[i]) i = 0;
                c.domCanvas.trigger('connectScreen', [i, c.sessionKey])
            } else if (e.which == 37) {
                i = c.domCanvas.children('div:visible:first').prev().index();
                c.domCanvas.trigger('connectScreen', [i, c.sessionKey])
            }
        }
        if (p.length == 0) return;
        if ([37, 39, 38, 40].indexOf(e.which) != -1) {
            if (!notify('obj.beforeMove', {'obj': p})) return;
        }
        if (p.length == 0) return;
        if ([37, 39, 38, 40].indexOf(e.which) == -1) return;
        for (i = 0; p.length > i; i++) {
            k = p[i];
            a = $(c.currentSelection[k]);
            if (a.is(':visible') == false) continue;
            a.trigger('keydown', [e]);
        }
        if ([37, 39, 38, 40].indexOf(e.which) != -1) {
            notify('obj.afterMove', {'obj': p});
        }
    }).on('keyup', function (e) {
    })
    $(document.body).on('keydown', function (e) {
        if (c.editingActive) return;
        c.getShortcut().add(e);
    }).on('keyup', function (e) {
        c.getShortcut().remove(e.which);
    }).on('focusin', 'input,select,textarea', function () {
        c.editingActive = true;
    }).on('focusout', 'input,select,textarea', function () {
        delete c.editingActive;
    })
    $('select#stage_general_config_sp').on('change', function (a, b, e) {
        e = $(this).val();
        if (e == "") return;
        e = e.split('x');
        a = parseFloat(e[0]);
        b = parseFloat(e[1]);
        if (!notify('screen.beforeResize', {'w': a, 'h': b})) return;
        c.width = (a);
        c.height = (b);
        c.domSize.first().val(c.width);
        c.domSize.last().val(c.height)
        c.domCanvas.trigger('stage_resize');
        e = $('#zoom_size_wrapper  input#zoom_size').data('ionRangeSlider');
        if (c.lock !== true) {
            e.update({'from': 50})
        }
        notify('screen.afterResize');
        notify('screen.afterChangesize');
    });
    c.domSize = $('input#stage_general_config_h,input#stage_general_config_w').on('mouseenter', function (e) {
        $(this).trigger('input', [true])
    }).on('input', function (e, o, f) {
        f = function (b, d) {
            b = c.domSize.first().val();
            d = c.domSize.last().val();
            b = parseFloat(b);
            d = parseFloat(d);
            if (b == c.width && d == c.height) return;
            if (/[^\d\.]/g.test(b + d) == true) return;
            if (c.lock === true && c.SizeTyped === 'stage_general_config_w') {
                d = number_format((b / c.width) * c.height)
            } else if (c.lock === true && c.SizeTyped === 'stage_general_config_h') {
                b = number_format((d / c.height) * c.width);
            }
            if (!notify('screen.beforeResize', {'w': b, 'h': d})) return;
            c.width = b;
            c.height = d;
            $('input#stage_general_config_w').val(b)
            $('input#stage_general_config_h').val(d)
            if (c.SizeTyped) delete c.SizeTyped;
            c.domCanvas.trigger('stage_resize');
            notify('screen.afterResize');
        }
        if (o === true) {
            f();
            delete c.SizeTyped;
            return;
        }
        if (c.SizeTyping) clearTimeout(c.SizeTyping);
        c.SizeTyped = $(this).attr('id');
        c.SizeTyping = setTimeout(f, 500)
    })
    c.domEditorSubHeader.children('div[data-tab=config]').find('div:eq(1) > span:first').click(function () {
        a = $(this).find('i.fa');
        if (a.hasClass('fa-unlock')) {
            a.removeClass('fa-unlock text-danger').addClass('fa-lock');
            c.lock = false;
        } else {
            a.removeClass('fa-lock').addClass('fa-unlock text-danger');
            c.lock = true;
        }
    })
    c.domSlidesWrapper.on('addLayer', '.view_slide_item > .card-block > .row', function () {
        e = $(this).children('div.card:first');
        $(this).sortable({
            'axis': 'y',
            'containment': 'parent',
            'handle': 'span:first',
            'cancel': '.preventdefault',
            'items': '.card[scope]',
            'update': function (e, u, scope, i, d) {
                scope = u.item.attr('scope');
                s = scope.substr(scope.lastIndexOf('_') + 1);
                a = Object.keys(c.slides[s].elements).length;
                d = c.domCanvas.find('> div:eq(' + s + ') > .objectBox[scope]')
                e = u.item.parent().children('[scope]');
                for (i = 0; e.length > i; i++) {
                    k = $(e[i]).attr('scope');
                    d.filter('[scope=' + k + ']').css('z-index', a - i);
                    c.slides[s].elements[k].prop.z = (a - i);
                }
            },
            'start': function (e, u) {
                e = $(this);
                if (u.item.is('[locked]')) {
                    e.sortable('disable');
                    return;
                }
                e = u.item.attr('scope');
                notify('obj.beforeOrder', {'obj': e});
            },
            'stop': function (e, u) {
                e = u.item.parent();
                e.children('[locked]:last').appendTo(e);
                e = u.item.attr('scope');
                notify('obj.afterOrder', {'obj': e});
            }
        });
        e.on('click.ly', function (e, s) {
            if (e.target.nodeName == 'SPAN' && $(e.target).is('.title') == false) return;
            e = $(this);
            s = $(this).attr('scope');
            if (s) {
                c.domCanvas.trigger('connectScope', [s]);
            }
        })
        e.find('span:eq(3)').on('click', function (s, trusted, scope, d, a) {
            e = $(this).parent();
            if (e.is('[locked]')) return;
            scope = e.attr('scope');
            d = scope.substr(scope.lastIndexOf('_') + 1);
            a = c.domCanvas.find('> div:eq(' + d + ') > .objectBox[scope="' + scope + '"]');
            if (trusted !== false) {
                if (!notify('obj.beforeLock', {'obj': scope})) return;
            }
            if (c.slides[d].elements[scope].locked == true) {
                c.slides[d].elements[scope].locked = 0;
                $(this).removeClass('fa-unlock').addClass('fa-lock').attr('title', c.language('editor_ui_tip_libobjlock'));
                a.data('locked', false);
            } else {
                c.slides[d].elements[scope].locked = 1;
                $(this).removeClass('fa-lock').addClass('fa-unlock').attr('title', c.language('editor_ui_tip_libobjnolock'));
                a.data('locked', true);
            }
            if (trusted !== false) {
                notify('obj.afterLock', {'obj': scope});
            }
        })
        e.find('span:last').on('click', function (e, trusted, scope, d) {
            e = $(this).parent();
            if (e.is('[locked]')) {
                return;
            }
            scope = e.attr('scope');
            d = scope.substr(scope.lastIndexOf('_') + 1);
            d = $('#wrapper_slide_viewport #viewport_stage_wrapper > div:eq(' + d + ')');
            if (trusted !== false) {
                if (!notify('obj.beforeVisible', {'obj': scope})) return;
            }
            if (e.is('[data-visibility]')) {
                $(this).removeClass('fa-eye-slash').addClass('fa-eye');
                e.removeAttr('data-visibility');
                d.children('.objectBox[scope=' + scope + ']').removeClass('invisible');
            } else {
                $(this).removeClass('fa-eye').addClass('fa-eye-slash');
                e.attr('data-visibility', 0);
                d.children('.objectBox[scope=' + scope + ']').addClass('invisible');
            }
            if (trusted !== false) {
                notify('obj.afterVisible', {'obj': scope});
            }
        })
    })
    c.domSlidesWrapper.on('addSlide', function () {
        c.domSidebar.find('.view_slide_item:last > .card-header > span:last').on('click.ly', function (e) {
            e = $(this).parent();
            if (!e.hasClass('collapsed')) {
                e.addClass('collapsed').next('.card-block').slideUp();
                $(this).find('i').removeClass('fa-caret-down').addClass('fa-caret-left');
            } else {
                e.removeClass('collapsed').next('.card-block').slideDown();
                $(this).find('i').removeClass('fa-caret-left').addClass('fa-caret-down');
            }
        })
        c.domSidebar.find('.view_slide_item:last > .card-header').on('click', function (e, i, a, d) {
            if (e.target.nodeName == 'SPAN' || e.target.nodeName == 'A') return;
            e = $(this).parent('.view_slide_item');
            i = e.index();
            c.domCanvas.trigger('connectScreen', [i, c.sessionKey]);
        })
        c.domSlidesWrapper.sortable({
            'axis': 'y',
            'items': '.view_slide_item',
            'containment': 'parent',
            'handle': '.card-header',
            'cancel': '.preventdefault',
            'update': function (e, u, d, i, a, k, s) {
                i = u.item.data('org-index');
                s = u.item.index();
                a = c.domCanvas.find('> div:eq(' + i + ')');
                k = c.domCanvas.find('> div:eq(' + s + ')').before(a);
                a = c.slides[i];
                c.slides.splice(s, 0, a);
                c.slides.splice(i + 1, 1);
                d = Object.keys(c.slides[s].elements);
                c.nomalizeSlides();
                c.domCanvas.trigger('connectScreen', [u.item.index(), c.sessionKey]);
            },
            'start': function (e, u) {
                notify('screen.beforeOrder');
                u.item.data('org-index', u.item.index());
            },
            'stop': function () {
                notify('screen.afterOrder');
            }
        })
    })
    c.domSlideTools.on('click', function (e, i) {
        if (c.Arcmode === 'p') {
            toastr['info']('Disabled in presentation mode');
            return;
        }
        e = $(this);
        if (e.is('[disabled]')) return;
        i = e.index();
        if (i == 1) {
            c.domScreenAdd.trigger('click')
            return;
        } else if (i == 0 || i == 2) {
            e = c.domCanvas.children('div:visible:first').index();
            if (i == 0) e -= 1; else e += 1;
        }
        if (e >= 0) {
            e = c.domCanvas.children('div:eq(' + e + ')');
        } else return;
        if (e.length > 0) {
            c.domCanvas.trigger('connectScreen', [e.index(), c.sessionKey]);
        }
    })
    c.domScreenAdd.on('click', function (e) {
        e.preventDefault();
        if (!notify('screen.beforeCreate')) return;
        c.slides.push({'elements': {}, 'background': {'color': '#0000'}});
        a = c.domCanvas.append('<div style="width:100%;height:100%;display:none"></div>')
        b = c.domSlidesWrapper.append(c.layerString);
        d = b.find('.view_slide_item:last > .card-block > .row:first');
        d.parents('.view_slide_item').find('.card-header span.title:first').text('Slide ' + c.slides.length)
        b.trigger('addSlide');
        a.trigger('addStage');
        d.trigger('addLayer');
        notify('screen.afterCreate');
        e = c.domCanvas.children(':last').css('background-image', 'url(library/bg_textures/tmb/transparency.jpg)').index();
        c.domCanvas.trigger('connectScreen', [e, c.sessionKey]);
    })
    c.domEditorHeader.find('#editor_fullscreen_toggle').on('click', function (elem) {
        elem = c.domDocBody[0];
        if (c.isFullScreen) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            c.isFullScreen = false;
            return;
        }
        c.isFullScreen = true;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    })
    c.domDroboxBtn.menu({
        'init': function (e, u) {
            e = u.menu.addClass('big').find('.menu').html('<div class="card bg-none"><div class="card-block text-center"><button class="btn btn-primary">' + c.language('editor_ui_ac_connect') + '</button></div><div class="card-block text-center"><button class="btn">' + c.language('editor_ui_sync') + ' <span class="fa fa-refresh"></span></button></div><div class="card-block text-center"><p>' + c.language('editor_ui_drb_tip1') + ' <br> ' + c.language('editor_ui_drb_tip2') + '</p><input type="checkbox"></div></div>').find('button,input');
            e.eq(1).on('click', function (e) {
                if (!c.dropBoxActivated) {
                    alertMessage('error', c.language('editor_ui_msg_drpconfail'));
                    return;
                }
                e = parseInt(c.ID);
                if ((isNaN(e) == false && typeof e == 'number') == false) {
                    alertMessage('error', c.language('editor_ui_msg_saveall'));
                    return;
                }
                if (((c.ID !== undefined && c.LastSaveStamp !== c.sessionKey))) {
                    alertMessage('error', c.language('editor_ui_msg_savenw'));
                    return;
                }
                c.DropboxMenuDialog.sync('png')
            })
            e.last().switch().on('update', function (e, r) {
                Events.off('workspace.*.dropbox')
                if (r.value) {
                    toastr.info(c.language('editor_ui_msg_drpsyncyes'));
                    Events.on('workspace.export.dropbox', 'before', function (r) {
                        if (!c.dropBoxActivated) {
                            return;
                        }
                        c.DropboxMenuDialog.sync(r.ref);
                        throw'';
                    })
                } else {
                    toastr.info(c.language('editor_ui_msg_drpsyncno'));
                }
            });
            c.domDroboxConnect = e.first().on('click', function () {
                if (c.dropBoxActivated) {
                    $(this).removeClass('btn-danger').addClass('btn-primary').text(c.language('editor_ui_ac_connect'));
                    c.domDroboxBtn.removeClass('active');
                    delete c.dropBoxActivated;
                    localStorage.removeItem('oauth_dropkey');
                    return;
                }
                c.connectDropbox(function (r) {
                    if (r == false) {
                        delete c.dropBoxActivated;
                        c.domDroboxConnect.trigger('click');
                        alertMessage('error', c.language('editor_ui_msg_drpconnerr'));
                        return;
                    }
                    c.domDroboxBtn.addClass('active');
                    c.dropBoxActivated = true;
                    c.dropBoxAToken = r;
                    c.domDroboxConnect.addClass('btn-danger').removeClass('btn-primary').text(c.language('editor_ui_ac_disconnect'))
                })
            })
        }
    });
    c.DropboxMenuDialog = c.domDroboxBtn.menu('widget');
    c.DropboxMenuDialog.sync = function (type) {
        if (!c.dropBoxAToken) return;
        toastr.info(c.language('editor_ui_msg_drpsyncop') + '...');
        $.get(location.origin + '/plugin/dropbox_capture/upload.php', {
            'token': c.dropBoxAToken,
            'id': c.ID,
            'type': type
        }, function (r) {
            if (!r.done) {
                toastr.info(c.language('editor_ui_msg_drpsyncprg') + '...');
                return;
            }
            window.setTimeout(function () {
                toastr.success(c.language('editor_ui_msg_drpsyncok'));
            }, 500)
        }, 'json').fail(function (x, e, s) {
            if (x.responseJSON) {
                s = x.responseJSON;
            } else {
                s = {'err': c.language('editor_ui_msg_drpsyncfail')};
            }
            if (s.err) {
                toastr['error'](s.err);
            } else if (s.info) {
                toastr['error'](s.info);
            }
        }).always(function () {
        });
    }
    c.DropboxMenuDialog.init();
    c.domTimelineToggle = c.domEditorHeader.find('#editor_timeline_toggle').on('click', function () {
        e = $(this);
        if (e.hasClass('active')) {
            e.find('img:last').addClass('d-none').prev().removeClass('d-none')
            e.removeClass('active');
            c.TL.minimize();
        } else {
            e.find('img:first').addClass('d-none').next().removeClass('d-none')
            e.addClass('active');
            c.TL.maximize();
        }
        resizeEditor();
    })
    c.domTimeline.find('> #timeline_header').click(function () {
        c.domTimelineToggle.trigger('click');
    })
    c.domEditorHeader.find('#editor_action_autosave').on('click', function (e) {
        e.preventDefault();
        e = $(this).find('button').toggleClass('on');
        if (e.hasClass('on')) {
            c.Autosave = true;
        } else {
            c.Autosave = false;
        }
        notify('workspace.afterCtrlShiftS');
    })
    c.domEditorHeader.find('#editor_action_safearea').on('click', function (e) {
        e.preventDefault();
        e = c.domCanvas;
        if (e.hasClass('safearea')) {
            e.removeClass('safearea');
            $(this).find('i.fa').removeClass('fa-eye-slash').addClass('fa-eye');
            c.store('safe_mode', null);
            c.safe_mode = false;
        } else {
            e.addClass('safearea');
            $(this).find('i.fa').removeClass('fa-eye').addClass('fa-eye-slash');
            c.store('safe_mode', 1)
            c.safe_mode = true;
        }
    })
    c.domEditorHeader.find('a#editor_uilight').click(function (e) {
        e.preventDefault();
        e = $(this);
        if (e.hasClass('light')) {
            $('#wrapper_slide_viewport').css('background-color', '#000');
            c.domDocBody.addClass('blindeye');
            e.removeClass('light').find('i.fa').css('color', '#000');
            c.store('dark_mode', 1)
        } else {
            $('#wrapper_slide_viewport').css('background-color', '');
            e.addClass('light').find('i.fa').css('color', '');
            c.domDocBody.removeClass('blindeye');
            c.store('dark_mode', null)
        }
    })
    c.domEditorSubHeader.find('div[data-tab]').each(function () {
        $(this).addClass('fade d-none');
    })
    c.domEditorHeader.find('#appbar li a[data-tab]').on('click', function (e, a) {
        e = $(this).data('tab');
        $(this).parent().addClass('active').siblings('li.active').removeClass('active')
        a = c.domEditorSubHeader.find('div[data-tab="' + e + '"]:first');
        a.siblings('div[data-tab].in').each(function () {
            $(this).removeClass('in').addClass('d-none')
        });
        a.removeClass('d-none').show(20, function () {
            $(this).addClass('in')
        });
    }).first().trigger('click');
    c.domEditorHeader.find('#editor_closeall').click(function (e) {
        e.preventDefault();
        if (!notify('editor.beforeExit')) return;
        location.href = 'front.php';
    });
    c.domRedoUndo = c.domEditorHeader.find('#editor_action_undo,#editor_action_redo').attr('disabled', true)
    c.domRedoUndo.on('click', function (e, o) {
        e.preventDefault();
        e = $(this);
        if (e.is('[disabled]')) return;
        if (e.is('#editor_action_undo')) {
            c.backHistory(c.history[0], 'before');
        } else if (e.is('#editor_action_redo') && c.backhistory) {
            c.backHistory(c.backhistory, 'after');
        }
    })
    c.domUndoBtn = c.domRedoUndo.filter('#editor_action_undo');
    c.domRedoBtn = c.domRedoUndo.filter('#editor_action_redo');
    c.keyboardEventKeep();
    c.domEditorHeader.find('#editor_saveeall').click(function () {
        c.saveWork('none');
    })
    $(document).on('mouseover', 'input,select,textarea,[title]', function (ev, e, t, p) {
        e = this.nodeName.toLowerCase();
        if (e == 'input' || e == 'select' || e == 'textarea' || c.editingActive === true) {
            window.clearInterval(c.keyboardEventKeepTimer)
        }
        e = $(this);
        if (!e.is('[title]')) {
            c.domTitler.removeClass('in').hide(0)
            return;
        }
        t = this.title;
        this.setAttribute('title', '');
        if (!e.is('[data-title]')) {
            e.attr('data-title', t)
        }
        if (t == '') {
            t = $(this).data('title')
        }
        if (t == "") {
            c.domTitler.removeClass('in').hide(0)
            return;
        }
        p = {'left': ev.pageX, 'top': ev.pageY};
        ev.preventDefault();
        t = t.toString();
        c.domTitler.show(0).addClass('in').html(t.split('\\n').join('<br>'));
        t = c.domTitler.width();
        p.dw = c.domDocBody.width();
        p.dh = c.domDocBody.height();
        p.sw = e.outerWidth();
        p.sh = e.outerHeight();
        if (t + p.left + 10 > p.dw) {
            p.left -= t + p.sw + 10;
        } else {
            p.left += 10;
        }
        t = c.domTitler.height();
        if (t + p.top + 10 > p.dh) {
            p.top -= t + 10
        } else {
            p.top += 10;
        }
        c.domTitler.css({'left': p.left, 'top': p.top})
        if (c.titleWatch) window.clearTimeout(c.titleWatch);
        c.titleWatch = window.setTimeout(function () {
            c.domTitler.removeClass('in').hide(200)
        }, 5000)
    }).on('mouseout', 'input,select,textarea,[title]', function () {
        c.domTitler.removeClass('in').hide(0)
        if (c.titleWatch) window.clearTimeout(c.titleWatch);
        e = this.nodeName.toLowerCase();
        if (e == 'input' || e == 'select' || e == 'textarea') {
            c.keyboardEventKeep();
        }
    }).on('focusin', '.objectBox[scope]', function (e) {
        window.clearInterval(c.keyboardEventKeepTimer)
    }).on('focusout', '.objectBox[scope]', function (e) {
        if (c.editingActive === true) {
            window.clearInterval(c.keyboardEventKeepTimer);
            return;
        }
        c.keyboardEventKeep();
    })
    c.domSidebarWrapper.on('mouseover', function () {
        c.keyboardEventKeep();
    })
    c.domStageViewport.on('mouseover', function (e) {
        if (c.editingActive === true) {
            window.clearInterval(c.keyboardEventKeepTimer)
            return;
        }
        c.keyboardEventKeep();
    })
    c.domSidebar.on('mouseover', function () {
        c.keyboardEventKeep();
    })
    c.domSidebarWrapper.on('hide', function (e, dur) {
        c.domStage.css('width', (c.domWindow.width() - c.domSidebarToggle.outerWidth()))
        $(this).animate({'width': 0}, {
            'duration': ((dur == 0) ? dur : 500), 'progress': function () {
            }, 'complete': function () {
                $(this).hide(0);
                c.domFooterTools.css('width', c.domStage.width() - 15)
                c.domTimeline.css('width', (c.domWindow.width() - c.domSidebarToggle.outerWidth()));
                console.log('hide');
                fixBoundary();
                notify('editor.afterResize');
            }
        })
    }).on('show', function (e, dur) {
        c.domStage.css('width', (c.domWindow.width() - c.domSidebarToggle.outerWidth()) - c.maxSidebarWidth)
        if (c.workSpaceReady !== true) {
            $(this).show(0).css({'width': c.maxSidebarWidth})
            fixBoundary();
        } else {
            $(this).show(0).animate({'width': c.maxSidebarWidth}, {
                'duration': ((dur == 0) ? dur : 500),
                'progress': function () {
                },
                'complete': function () {
                    c.domTimeline.css('width', '');
                    console.log('show');
                    c.domFooterTools.css('width', c.domStage.width() - 15);
                    fixBoundary();
                    notify('editor.afterResize');
                }
            })
        }
    })
    c.domSidebarWrapper.find('.actions-right:first').on('click', function (e) {
        e = c.domSidebarWrapper
        if (e.width() > 0) {
            e.trigger('hide');
        } else {
            e.trigger('show');
        }
    })
    c.domSlidesGroupToggler.click(function () {
        e = $(this).parent();
        if (e.hasClass('active')) {
            e.animate({'right': -300}, 500, function () {
                $(this).removeClass('active');
                c.rightBarSeen = true;
            });
        } else {
            e.animate({'right': 0}, 500, function () {
                $(this).addClass('active');
            })
        }
    });
    c.artBoardDrag = new plupload.Uploader({
        runtimes: 'html5,flash,html4',
        flash_swf_url: 'assets/js/plupload/moxie.swf',
        silverlight_xap_url: 'assets/js/plupload/moxie.xap',
        drop_element: c.domStageViewport.get(0),
        url: location.origin + '/editor/psdconvert.php',
        filters: {
            'max_file_count': 1,
            'max_file_size': '55mb',
            'mime_types': [{'extensions': 'psd', 'title': 'Photoshop file'}]
        },
        init: {
            FilesAdded: function (u, f) {
                if (f.length > 1) {
                    u.splice(0, 1);
                }
                bigloader();
                u.start();
            }, FileUploaded: function (u, f, r, s) {
                u.removeFile(f);
                if (r.status != 200) return;
                r = JSON.parse(r.response);
                c.domCanvas.empty();
                c.domSlidesWrapper.empty();
                c.slides = [];
                c.history = [];
                c.idCache = {};
                delete c.ID;
                c.idCache = {};
                c.workSpaceReady = false;
                c.domScreenAdd.trigger('click');
                c.workSpaceReady = true;
                c.TL.clear();
                c.domSize.last().val(r.height);
                c.domSize.first().val(r.width).trigger('mouseenter');
                f = c.domCanvas.children(':first');
                buildTPL(r.slides[0], f);
                c.slides = r.slides;
                c.nomalizeSlides();
                c.refreshDocColorPalette();
                updateEffects();
                if (c.psdPreview) {
                    c.psdPreview.destroy();
                    delete c.psdPreview
                }
                c.domZoomFit.trigger('click');
                c.psdPreview = mdDialog(function () {
                    this.title = 'Preview';
                    this.link = r;
                    this.oninit = function () {
                        this.body = $(this.target + ' .modal-body').addClass('bg-faded fancyscroll');
                        this.head = this.body.prev();
                        this.md = this.body.parent().parent().addClass('m-0');
                        this.body.parents('.modal').draggable({'handle': this.head}).css({
                            'position': 'absolute',
                            'overflow': 'hidden',
                            'right': 'auto',
                            'bottom': 'auto'
                        }).position({'at': 'center', 'of': c.domDocBody})
                    }
                    this.onshow = function (e) {
                        e = this.body.append('<div style="height:100px" class="d-flex justify-content-center"><img class="img-fluid" src="' + this.link.preview + '" /></div>').find('div:last');
                        e.css('height', (this.body.width() / this.link.width * this.link.height))
                    }
                    this.onhide = function () {
                        delete c.psdPreview;
                        this.destroy();
                    }
                })
            }, UploadComplete: function (u, r, ax) {
                c.bigSpinnrer.close();
                u.splice();
            }
        }
    })
    c.artBoardDrag.init();
    c.domImportSvg = $('<div/>').upload({'mod': 'svgObject'}).on('up.done', function (e, r, p) {
        if (!notify('obj.beforeCreate')) return;
        e = c.buildObject('shape', r.uid);
        p = e.position();
        e.css({'width': 120, 'height': 120})
        e.data('object-src', {'sym': 'mysvgshapes', 'ref': r.uid});
        c.domCanvas.trigger('addObject', [e, p, e]);
        e = c.domCanvas.children('div:visible:first').children(':last');
        p = applyPropertyOption(e, {'xy': 'xy0'});
        r = e.attr('scope')
        c.slides[0].elements[r].prop.left = p.left;
        c.slides[0].elements[r].prop.top = p.top;
        notify('obj.afterCreate');
    });
    c.domImportFile = $('<div/>').upload({'mod': 'cxiObject'});
    c.domEditorSubHeader.find('div[data-tab=import]  button[data-type=youtube]').upload({'mod': 'youtubeObject'});
    c.domImportImage = $('<div/>').on('up.done', function (e, r, a, s) {
        if (!notify('obj.beforeCreate')) return;
        s = c.buildObject('images', r);
        s.css({'width': r.lw, 'height': r.lh}).html('<img src="' + r.u + '" lowsrc="' + r.l + '"  />')
        p = s.position();
        c.domCanvas.trigger('addObject', [s, p, s]);
        e = c.domCanvas.children('div:visible:first').children(':last');
        p = applyPropertyOption(e, {'xy': 'xy0'});
        r = e.attr('scope')
        c.slides[0].elements[r].prop.left = p.left;
        c.slides[0].elements[r].prop.top = p.top;
        notify('obj.afterCreate');
    }).upload();
    c.domExportBtn = c.domEditorSubHeader.find('div[data-tab=import] > fieldset:gt(0) button[data-type^=x]').on('click', function (e) {
        e = $(this).data('type');
        if (!e) return;
        e = e.substr(2);
        c.pushDownload(c.ID, e);
    })
    c.domHomeTools = c.domEditorSubHeader.find('div[data-tab=home] > fieldset > button.btn').each(function (i) {
        $(this).attr('disabled', true);
    });
    tx = [];
    c.config_settings_tab = {};
    $.each(c.config_settings, function (k, v, e) {
        ar = c.config_settings[k];
        e = {};
        e.dom = '';
        k = k.replace(/\s/g, '_')
        c.config_settings_tab[k] = {'Input': {}};
        e.dom += ('<div data=tab="' + k + '"><div ><p class="text-muted text-center">' + k.toUpperCase() + '</p></div>');
        for (i = 0; ar.length > i; i++) {
            e.s = '<input data-tab="' + k + '" type="' + ar[i].type + '" class="form-control mac" name="' + ar[i].name + '" />';
            if (ar[i].type == 'textarea') {
                e.s = '<textarea data-tab="' + k + '" class="form-control" name="' + ar[i].name + '"></textarea>';
            } else if (ar[i].type == 'select') {
                e.s = '<select data-tab="' + k + '" class="form-control" name="' + ar[i].name + '"><option value="">Please select</option></select>';
            }
            e.dom += ('<div class="form-group p-2"><label>' + c.language(ar[i].title) + '</label> ' + e.s + '</div>');
        }
        e.dom += '</div>';
        tx.push(e.dom);
    })
    c.domEditorConfigToggle.menu({
        'init': function (e, ui) {
            tx = undefined;
            ui.menu.addClass('big').find('li div.form-group :input[name]').each(function (e, n) {
                e = $(this);
                n = this.getAttribute('name');
                k = e.data('tab');
                c.config_settings_tab[k].Input[n] = $(this);
            }).filter('[type=checkbox]').switch();
        }, 'items': tx
    })
    c.domEditorConfigToggle.menu('widget').init();
    c.domPrivateToggler = c.config_settings_tab.privacy_mode.Input.private.on('update', function (e, ui) {
        e.preventDefault()
        e.stopPropagation();
        if (!c.IDmeta) c.IDmeta = {};
        if (!notify('workspace.beforeDocprivacy')) return;
        if (ui.value) c.IDmeta.private = 1; else c.IDmeta.private = 0;
        notify('workspace.afterDocprivacy');
    })
    c.config_settings_tab.animation.Input.loop.attr('title', c.language('editor_ui_msg_aniloop'));
    c.config_settings_tab.animation.Input.delay.attr('title', c.language('Enter animation delay (Seconds)'))
    $([c.config_settings_tab.transform.Input.lock_aspect.get(0), c.config_settings_tab.transform.Input.snap_grid.get(0)]).on('update', function (e, ui) {
        if (this.getAttribute('name') == 'lock_aspect') {
            c.obj_lock = ui.value;
            c.transformHandler.lockAspect();
        } else {
            c.obj_snapGrid = ui.value;
            c.transformHandler.lockGrid();
        }
    })
    Events.one('workspace.ready', 'after', function () {
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        (function () {
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/5d233ae37a48df6da2438083/default';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
        })();
        return;
        $(document.body).prepend('<div class="p-2 bg-danger"><p class="m-0 text-center text-white">This is a demo version with some limitations. <a target="_blank" href="' + location.origin + '/documentation" class="btn btn-primary py-1 btn-smn">Buy full version <i class="fa fa-shopping-cart"></i></a></p></div>');
    })
    Events.on('workspace.export', 'before', function (e) {
        return;
        if (e.ref == 'mp4' || e.ref == 'gif' || e.ref == 'svg') {
            toastr.error('This feature is disabled in demo version');
            throw'Not allowed';
        }
    })
    c.HandleMenu = function (key, o) {
        if (key == 'none' || key == 'new') {
            c.saveWork(key);
            return;
        }
        if (key == 'start_tpl') {
            c.startpage.navLinks.eq(0).trigger('click');
            c.startpage.maximize();
            return;
        }
        if (key == 'rz_new') {
            c.startpage.navLinks.eq(1).trigger('click');
            o = c.startpage.tab_panes.start_new_presets.find('.element-wrapper:first > div input');
            o.first().val(c.width);
            o.last().val(c.height);
            c.startpage.maximize();
            return;
        }
        if (key == 'rz_auto') {
            if (!notify('screen.beforeResize', {'w': c.stageWidth, 'h': c.stageHeight})) return;
            c.width = c.stageWidth;
            c.height = c.stageHeight;
            c.domSize.first().val(c.width);
            c.domSize.last().val(c.height)
            c.domCanvas.trigger('stage_resize');
            notify('screen.afterResize');
            return;
        }
        if (key == 'logout' || key == 'exit') {
            location.href = '/front.php';
            return;
        }
        if (key == 'dwnl') {
            return c.downloadList();
        }
        if (key == 'start') {
            c.projectBlank();
            return;
        }
        if (key == 'mkmv') {
            return;
        }
        if (key == 'api_get') {
            bigloader();
            $.get(location.origin + '/editor/getapi.php', function (r) {
                if (!r.key) return;
                mdDialog(function () {
                    this.title = '';
                    this.content = '<p class="h5">Copy your key to a safe place</p><code style="word-break:break-all">' + r.key + '</code>';
                    this.onhide = function () {
                        this.destroy();
                    }
                })
            }, 'json').always(function () {
                c.bigSpinnrer.close();
            })
            return;
        }
        if (key == 'exit') {
            if (!notify('editor.beforeExit')) return;
            location.href = 'app.php';
            return;
        }
        if (key == 'start_tpl') {
            c.startpage.navLinks.eq(2).trigger('click');
            c.startpage.maximize();
            return;
        }
        if (key == 'estore') {
            c.runPlugin('estore_browser');
            return;
        }
        if (key == 'batch_d') {
            c.runPlugin('batch_creator')
            return;
        }
        if (key == 'cb.shre') {
            c.shareOption(c.ID);
            return;
        }
        if (key == 'cb.outsource') {
            c.teamOption();
            return;
        }
        if (key == 'cb.invite') {
            if ((c.UserProfile.membership.permit.indexOf('22') !== -1 && c.UserProfile.membership.permit.indexOf('23') !== -1) == false) {
                c.editorSDK.gui.alert(c.language('editor_ui_msg_permlock'));
                return;
            }
            o = {};
            o.n = 'recipient';
            c.inviteType = 0;
            if (key == 'cb.outsource') {
                o.n = 'outsourcer';
                c.inviteType = 1;
            }
            o.t = 'Enter ' + o.n + ' email';
            c.editorSDK.gui.prompt(o.t, function (v) {
                v = $.trim(v);
                $.ajax({
                    'url': location.origin + '/plugin/sharer/invite.php',
                    'data': {'r': v, 'q': c.inviteType},
                    'type': 'POST',
                    'beforeSend': function () {
                        this.loader = c.editorSDK.gui.loading()
                    }
                }).done(function () {
                    toastr.info('Invitation successfully sent')
                }).always(function () {
                    this.loader.close()
                })
            })
            return;
        }
        if (key.indexOf('ext.run') === 0) {
            c.runPlugin(key.substr(8));
            return;
        }
        if (key == 'open') {
            c.startpage.navLinks.eq(2).trigger('click');
            c.startpage.tab_panes.start_all_projects_row.masonry('destroy').empty().append('<figure class="center"><img src="assets/img/loader.gif" /></figure>');
            c.startpage.progress = bigloader();
            $.get(location.origin + '/edit.php?t=prj', function (r) {
                c.startpage.maximize();
                c.startpage.tab_panes.start_all_projects_row.find('> figure').remove();
                c.startpage.projectsAll = r;
                if (r.length == 0) {
                    c.startpage.progress.close();
                    $(document.body).addClass('modal-open')
                    c.startpage.tab_panes.start_all_projects_row.html('<div class="card-block"><center><p><i class="fa fa-exclamation-triangle fa-2x"></i></p><h5 class="text-warning">No project available</h5></center></div>');
                    return;
                }
                c.startpage.pageNo = 0;
                c.startpage.tab_panes.start_all_projects_row.masonry({
                    'items': '.item',
                    'columnWidth': 150,
                    'gutter': 5
                })
                c.startpage.progress.close();
                $(document.body).addClass('modal-open')
                c.startpage.loadProjects();
            }, 'json').fail(function () {
                c.startpage.tab_panes.start_all_projects_row.find('> figure').remove();
                c.startpage.progress.close();
            })
            return;
        }
        if (key == 'imp.svg') {
            c.domImportSvg.trigger('click')
            return;
        }
        if (key == 'imp.image') {
            c.domImportImage.trigger('click')
            return;
        }
        if (key == 'loadfile') {
            c.domImportFile.trigger('click');
            return;
        }
        if (key == 'doc_meta') {
            c.docInfo();
            return;
        }
        if (key == 'embed') {
            c.embedCode();
            return;
        }
        if (typeof c.ID !== 'number') {
            alertMessage('error', c.language('editor_ui_msg_saveall'));
            return;
        }
        if (((c.ID !== undefined && c.LastSaveStamp != c.sessionKey))) {
            alertMessage('error', c.language('editor_ui_msg_savenw'));
            return;
        }
        c.pushDownload(c.ID, key)
    }
    $.contextMenu({
        'selector': '#wrapper_slide_groups .view_slide_item > .card-header > span.fa-ellipsis-v',
        'trigger': 'left',
        'build': function () {
            return {
                'items': {
                    'del': {'name': 'Delete', 'icon': 'fa-close'},
                    'clone': {'name': 'Duplicate', 'icon': 'fa-clone'}
                }, 'callback': function (key) {
                    e = $(this);
                    i = e.parent().find('a').index(e);
                    a = e.parents('.view_slide_item');
                    b = a.index();
                    e = $('#wrapper_slide_viewport #viewport_stage_wrapper > div');
                    if (key == 'del') {
                        c.domCanvas.trigger('delScreen', [b, c.sessionKey]);
                    } else if (key == 'clone') {
                        c.domCanvas.trigger('cloneScreen', [b, c.sessionKey]);
                    }
                }
            }
        }
    })
    $.contextMenu({
        'selector': 'div[id=wrapper_slide_viewport],body > .transformer',
        'zIndex': 99999,
        'className': 'maincontextmenu_handler',
        'events': {
            'show': function () {
                c.contextmenuWrapper = $(document.body).find('> .maincontextmenu_handler')
                return notify('contextmenu.afterShow');
            }, 'hide': function () {
                notify('contextmenu.afterHide');
            }
        },
        'animation': {'duration': 0},
        'build': function (t, e, m, menu, obj) {
            i = c.domTimeline.find(e.target).length;
            if (i > 0) return false;
            if ($(e.target).is('.transformer')) {
                e.target = c.transformHandler.getCurrent().get(0);
            }
            obj = {};
            menu = {
                'func': {
                    'obj.clone': function (dom) {
                        return menu.func.run('obj.clone', dom);
                    }, 'obj.hide': function (dom) {
                        return menu.func.run('obj.hide', dom);
                    }, 'obj.lock': function (dom) {
                        return menu.func.run('obj.lock', dom);
                    }, 'obj.del': function (dom) {
                        return menu.func.run('obj.del', dom);
                    }, 'obj.rn': function (dom) {
                        return menu.func.run('obj.rn', dom);
                    }, 'obj.cformat': function (dom) {
                        return menu.func.run('obj.cformat', dom);
                    }, 'obj.pformat': function (dom) {
                        return menu.func.run('obj.pformat', dom);
                    }, 'obj.front': function (dom) {
                        return menu.func.run('obj.front', dom);
                    }, 'obj.forw': function (dom) {
                        return menu.func.run('obj.forw', dom);
                    }, 'obj.prev': function (dom) {
                        return menu.func.run('obj.prev', dom);
                    }, 'obj.back': function (dom) {
                        return menu.func.run('obj.back', dom);
                    }, 'obj.hflip': function (dom) {
                        return menu.func.run('obj.hflip', dom);
                    }, 'obj.vflip': function (dom) {
                        return menu.func.run('obj.vflip', dom);
                    }, 'obj.clip': function (dom) {
                        return menu.func.run('obj.clip', dom);
                    },
                }, 'callback': function (key, e, a, f) {
                    if (key.indexOf('obj.') !== -1) {
                        e = Object.keys(c.currentSelection);
                        c.domCanvas.trigger('disconnectScope', ['.active']);
                        if (key == 'obj.clone') {
                            a = 'Create';
                        } else if (key == 'obj.hide') {
                            a = 'Visible';
                        } else if (key == 'obj.lock') {
                            a = 'Lock';
                        } else if (key == 'obj.del') {
                            a = 'Del';
                        } else if (key == 'obj.pformat') {
                            a = 'Format';
                        }
                        f = {'obj': e}
                        if (key == 'obj.pformat') {
                            f.format = {};
                        }
                        if (!notify('obj.before' + a, {'obj': e})) return;
                        $.each(e, function (i, id, dom, o) {
                            id = e[i];
                            dom = c.domCanvas.children('div:visible:first').find('.objectBox[scope="' + id + '"]');
                            o = menu.func[key](dom);
                            if (key == 'obj.pformat') {
                                f.format[id] = o;
                            }
                            if (key == 'obj.clone') {
                                c.currentSelection[dom.attr('scope')] = o.get(0);
                            } else if (key == 'obj.del' && o !== false) {
                                delete c.currentSelection[id];
                            }
                        })
                        notify('obj.after' + a, f);
                    }
                }
            }
            menu.func.run = function (key, el, id, dom, a, f) {
                if (typeof el !== 'object') {
                    el = menu.dom
                }
                a = c.domCanvas.children('div:visible:first').index();
                id = $(el).attr('scope');
                if (key == 'obj.clone') {
                    c.domCanvas.trigger('cloneObject', [id]);
                    dom = c.domCanvas.children('div:visible:first').children('.objectBox:last');
                    return dom;
                } else if (key == 'obj.hide') {
                    c.domSlidesWrapper.find('.view_slide_item:eq(' + a + ') > .card-block > .row .card[scope="' + id + '"] > span:last').trigger('click', [false]);
                } else if (key == 'obj.lock') {
                    c.domSlidesWrapper.find('.view_slide_item:eq(' + a + ') > .card-block > .row .card[scope="' + id + '"] > span:eq(3)').trigger('click', [false]);
                } else if (key == 'obj.del') {
                    c.domCanvas.trigger('disconnectScope', ['[scope="' + id + '"]']);
                    c.domCanvas.trigger('delObject', [id]);
                    dom = c.domCanvas.children('div:visible:first').find('.objectBox[scope="' + id + '"]');
                    if (dom.length == 0) {
                        return dom;
                    }
                    return false;
                } else if (key == 'obj.rn') {
                    a = id.substr(id.lastIndexOf('_') + 1);
                    dom = c.domSlidesWrapper.find('.view_slide_item:eq(' + a + ') > .card-block > .row .card[scope="' + id + '"] > span.title:first');
                    if (dom.length == 0) {
                        return;
                    }
                    object_rename_window = mdDialog(function () {
                        this.title = 'Layer name';
                        this.size = 'size';
                        this.obj = c.slides[a].elements[id];
                        this.el = dom;
                        this.content = '<div class="row"><div class="col-12"><input class="form-control" value="' + this.obj.alias + '" /></div></div>';
                        this.footer = '<button class="btn btn-sm btn-success">' + c.language('editor_ui_apply') + '</button>';
                        this.onhide = function () {
                            this.destroy();
                        }
                        this.onshow = function () {
                            $(this.target + ' input:first').focus();
                            if (this.obj.name) {
                                $(this.target + ' .modal-body input:first').val(this.obj.name);
                            }
                            $(this.target + ' .modal-footer > button.btn:first').on('click', function (e, e) {
                                e = $(object_rename_window.target + ' .modal-body input:first').val();
                                e = safe_text(e);
                                e = e.replace(/[^\da-z\s]/ig, '');
                                e = $.trim(e).substr(0, 25);
                                if (e.length > 0) {
                                    object_rename_window.obj.name = e;
                                    object_rename_window.el.attr('title', e).text(e);
                                    notify('obj.afterRename', {'obj': object_rename_window.obj.id});
                                    object_rename_window.close();
                                }
                            })
                        }
                        return this;
                    })
                } else if (key == 'obj.hflip') {
                    if (!c.slides[a].elements[id].prop.flip) {
                        c.slides[a].elements[id].prop.flip = ['-1', 1];
                        applyPropertyOption($(el).find('.object:first'), {'flip': c.slides[a].elements[id].prop.flip});
                    } else {
                        if (c.slides[a].elements[id].prop.flip[0] == '-1') {
                            c.slides[a].elements[id].prop.flip[0] = 1;
                        } else {
                            c.slides[a].elements[id].prop.flip[0] = '-1';
                        }
                        applyPropertyOption($(el).find('.object:first'), {'flip': c.slides[a].elements[id].prop.flip});
                    }
                } else if (key == 'obj.vflip') {
                    if (!c.slides[a].elements[id].prop.flip) {
                        c.slides[a].elements[id].prop.flip = [1, '-'];
                        applyPropertyOption($(el).find('.object:first'), {'flip': c.slides[a].elements[id].prop.flip});
                    } else {
                        if (c.slides[a].elements[id].prop.flip[1] == '-1') {
                            c.slides[a].elements[id].prop.flip[1] = 1;
                        } else {
                            c.slides[a].elements[id].prop.flip[1] = '-1';
                        }
                        applyPropertyOption($(el).find('.object:first'), {'flip': c.slides[a].elements[id].prop.flip});
                    }
                } else if (key == 'obj.cformat') {
                    e = c.Supported(c.slides[a].elements[id].alias);
                    c.copiedFormat = {};
                    dom = 0;
                    f = c.idCache[c.slides[a].elements[id].prop.uid].fx.toArray()
                    for (i = 0; f.length > i; i++) {
                        k = f[i];
                        if (k.indexOf('fx2') === -1 && e.indexOf(k) === -1) continue;
                        if (c.slides[a].elements[id].prop[k] !== undefined) {
                            c.copiedFormat[k] = c.slides[a].elements[id].prop[k];
                            dom++;
                        }
                    }
                    if (dom > 0 && c.slides[a].elements[id].prop.fxPriority) {
                        c.copiedFormat.fxPriority = c.slides[a].elements[id].prop.fxPriority;
                    }
                } else if (key == 'obj.pformat') {
                    e = c.Supported(c.slides[a].elements[id].alias);
                    dom = $(el).attr('scope');
                    c.domCanvas.trigger('disconnectScope', ['.active'])
                    f = c.idCache[c.slides[a].elements[dom].prop.uid].fx;
                    f.loadAll(c.copiedFormat);
                    $.each(c.copiedFormat, function (k, v) {
                        c.slides[a].elements[dom].prop[k] = v;
                    })
                    f.applyAll(null, true);
                    f = Object.keys(c.copiedFormat);
                    delete c.copiedFormat;
                    return f;
                } else if (['obj.front', 'obj.forw', 'obj.prev', 'obj.back'].indexOf(key) != -1) {
                    if (key == 'obj.front') {
                        e = workspaceJob('order_front', id);
                    } else if (key == 'obj.forw') {
                        workspaceJob('order_forward', id);
                    } else if (key == 'obj.prev') {
                        workspaceJob('order_backward', id);
                    } else {
                        workspaceJob('order_back', id);
                    }
                } else if (key == 'obj.clip') {
                    workspaceJob('trim');
                }
            };
            obj.m = {
                'obj.selectall': {
                    'name': c.language('editor_ui_cntxt_select'),
                    'icon': 'fa-mouse-pointer',
                    'visible': false,
                    'callback': function () {
                        notify('workspace.afterCtrlA');
                    }
                },
                'obj.paste': {
                    'name': c.language('editor_ui_cntxt_paste'),
                    'icon': 'fa-paste',
                    'disabled': true,
                    'callback': function (a, k) {
                        workspaceJob('paste');
                    }
                },
                'obj.clonescreen': {
                    'name': 'Clone slide',
                    'icon': 'fa-copy',
                    'visible': false,
                    'callback': function (i) {
                        i = c.domCanvas.children('div:visible:first').index();
                        c.domCanvas.trigger('cloneScreen', [i, c.sessionKey]);
                    }
                },
                'obj.delscreen': {
                    'name': 'Delete slide',
                    'icon': 'fa-times',
                    'visible': false,
                    'callback': function () {
                        c.domCanvas.trigger('delScreen', [null, c.sessionKey]);
                    }
                },
                'obj.copy': {
                    'name': c.language('editor_ui_cp'), 'icon': 'fa-copy', 'callback': function (e, m) {
                        e = c.currentSelection;
                        if (e !== undefined && (m = Object.keys(e)) && m.length > 0) {
                            workspaceJob('copy', m);
                        } else if (menu.dom) {
                            workspaceJob('copy', [menu.dom.attr('scope')]);
                        }
                    }
                },
                'obj.text': {
                    'name': 'Edit text', 'icon': 'fa-text-width', 'visible': false, 'callback': function () {
                        smartTextTools(menu.dom.attr('scope'), $.noop)
                    }
                },
                'obj.2text': {
                    'name': c.language('editor_ui_cntxt_txtcon'),
                    'icon': 'fa-text-width',
                    'visible': false,
                    'callback': function (e, p) {
                        e = menu.dom.find('.object svg');
                        e.empty();
                        e[0].appendChild(document.createElementNS(c.domSvgNs, 'g'));
                        p = {'data-object-ref': 'shape', 'data-object-shape-glyph': 'text'};
                        menu.dom.attr(p).data({
                            'object-ref': 'shape',
                            'object-shape-glyph': 'text'
                        }).append('<div class="viewbox-edit" title="Click To Edit Text"><span class="fa fa-text-width"></span></div>').objectInteract();
                        renderTextType('Double-click to edit text', {
                            'font': 'abeezee',
                            'sym': 'text',
                            'type': 'normal',
                            'scope': menu.dom.attr('scope')
                        }, e[0], function (a, b, d) {
                            d = c.slides[0].elements[b.options.scope];
                            d.alias = 'shape';
                            d.prop.sym = 'text';
                            d.prop.source = a;
                            d.prop.size = 12;
                            d.prop.font = b.opt.font;
                            d.prop.type = b.opt.type;
                            d.prop.off = b.off;
                            d.prop.background = {'color': '#fff'};
                            c.idCache[d.prop.uid].fx.load({'background': d.prop.background});
                            c.idCache[d.prop.uid].fx.applyAll();
                        })
                    }
                },
                'obj.grp': {
                    'name': c.language('editor_ui_cntxt_group'),
                    'icon': 'fa-object-group',
                    'visible': false,
                    'callback': function (m, t, a) {
                        m = Object.keys(c.currentSelection);
                        t = $.now();
                        a = c.domCanvas.children('div:visible:first').index();
                        $.each(m, function (i, e) {
                            i = $(c.currentSelection[e]);
                            i.addClass('grouped').attr('group_id', t);
                            c.slides[a].elements[e].grpid = t;
                        })
                    }
                },
                'obj.ungrp': {
                    'name': c.language('editor_ui_cntxt_ungroup'),
                    'icon': 'fa-object-ungroup',
                    'disabled': true,
                    'callback': function (e, a) {
                        if (menu.dom) {
                            e = [menu.dom];
                        } else {
                            e = Object.values(c.currentSelection)
                        }
                        a = c.domCanvas.children('div:visible:first').index();
                        $.each(e, function (i, el) {
                            el = $(el);
                            if (el.is('.grouped') == false) return;
                            el.removeAttr('group_id').removeClass('grouped');
                            i = el.attr('scope');
                            delete c.slides[a].elements[i].grpid;
                        })
                    }
                },
                'obj.mask': {
                    'name': c.language('editor_ui_cntxt_mask'),
                    'visible': false,
                    'icon': 'fa-asterisk',
                    'callback': function (k, i, b, e) {
                        k = Object.keys(c.currentSelection);
                        b = {};
                        for (i = 0; k.length > i; i++) {
                            if (b.mask && b.image) break;
                            e = k[i];
                            e = c.slides[0].elements[e];
                            if (e.alias == 'images') {
                                b.image = e.id;
                                continue;
                            }
                            if (e.prop.sym && ['circle', 'square', 'path', 'text'].indexOf(e.prop.sym) !== -1) {
                                b.mask = e.id;
                            }
                        }
                        if ((b.mask != undefined && b.image != undefined) == false) {
                            return;
                        }
                        notify('obj.beforeFx', {'obj': b.image, 'ref': 'mask'});
                        k = c.idCache[c.slides[0].elements[b.image].prop.uid].fx;
                        k.load({'mask': c.svgEffectsList.mask});
                        k.fx.mask.update({'mode': null, 'layer': c.slides[0].elements[b.mask].prop.uid})
                        k.fx.mask.apply();
                        c.slides[0].elements[b.image].prop.mask = k.fx.mask.options;
                        if (c.isPerpertyOpen && c.isPerpertyTab == 'fx' && main.onActivate) {
                            k.activeFx = 'mask';
                            k.onActivate();
                        }
                        notify('obj.afterFx', {'obj': b.image, 'ref': 'mask'});
                    }
                },
                'obj.match': {
                    'name': c.language('editor_ui_cntxt_sizem'),
                    'visible': false,
                    'icon': 'fa-compress',
                    'items': {
                        'obj.match_h': {
                            'name': c.language('editor_ui_cntxt_sizem_h'),
                            'icon': 'fa-arrows-v',
                            'callback': function (k) {
                                k = Object.keys(c.currentSelection);
                                if (!notify('obj.beforeResize', {'obj': k})) return;
                                workspaceJob('matchSize', {'height': menu.dom});
                                c.transformHandler.reposition();
                                notify('obj.afterResize', {'obj': k})
                            }
                        },
                        'obj.match_w': {
                            'name': c.language('editor_ui_cntxt_sizem_w'),
                            'icon': 'fa-arrows-h',
                            'callback': function (k) {
                                k = Object.keys(c.currentSelection);
                                if (!notify('obj.beforeResize', {'obj': k})) return;
                                workspaceJob('matchSize', {'width': menu.dom});
                                c.transformHandler.reposition();
                                notify('obj.afterResize', {'obj': k})
                            }
                        },
                        'obj.match_all': {
                            'name': c.language('editor_ui_cntxt_sizem_all'),
                            'icon': 'fa-compress',
                            'callback': function (k) {
                                k = Object.keys(c.currentSelection);
                                if (!notify('obj.beforeResize', {'obj': k})) return;
                                workspaceJob('matchSize', {'width': menu.dom});
                                workspaceJob('matchSize', {'height': menu.dom});
                                c.transformHandler.reposition();
                                notify('obj.afterResize', {'obj': k})
                            }
                        }
                    }
                },
                'obj.clip': {
                    'name': c.language('editor_ui_cntxt_trim'),
                    'icon': 'fa-crop',
                    'visible': true,
                    'callback': menu.func['obj.clip']
                },
                'obj.cformat': {
                    'name': c.language('editor_ui_cntxt_cpform'),
                    'icon': 'fa-magic',
                    'visible': true,
                    'callback': menu.func['obj.cformat']
                },
                'obj.pformat': {
                    'name': c.language('editor_ui_cntxt_pform'),
                    'icon': 'fa-clipboard',
                    'callback': function (e, id, i) {
                        id = menu.dom.attr('scope');
                        if (!notify('obj.beforePformat', {'obj': id})) return;
                        e = menu.func['obj.pformat']();
                        notify('obj.afterPformat', {'obj': id, 'format': e});
                    }
                },
                'obj.clone': {'name': c.language('editor_ui_cntxt_clone'), 'icon': 'fa-copy'},
                'obj.hide': {'name': c.language('editor_ui_cf_toggle'), 'icon': 'fa-eye'},
                'obj.lock': {'name': c.language('editor_ui_prop_lock'), 'icon': 'fa-lock'},
                'obj.del': {'name': c.language('editor_ui_del'), 'icon': 'fa-close'},
                'obj.rn': {'name': c.language('editor_ui_rn'), 'icon': 'fa-paragraph'},
                'obj.movetpl': {
                    'name': c.language('editor_ui_cntxt_fdsave'),
                    'icon': 'fa-folder',
                    'visible': false,
                    'callback': function (tk, e, o) {
                        if (menu.dom) {
                            tk = menu.dom.attr('scope');
                            tk = [tk];
                        } else {
                            tk = Object.keys(c.currentSelection)
                        }
                        e = c.editorSDK.gui.prompt(c.language('editor_ui_msg_fdsel'), function (v, o, k, t, d) {
                            v = this.body.find('select.form-control:first').val();
                            v = $.trim(v);
                            if (v.length < 3) return;
                            o = [];
                            for (i = 0; this.tk.length > i; i++) {
                                k = this.tk[i];
                                if (!c.slides[0].elements[k]) continue;
                                k = $.extend(true, {}, c.slides[0].elements[k]);
                                delete k.svgfxOb;
                                t = c.TL.exportAll(k.prop.uid);
                                if (t) {
                                    k.tween = t[k.prop.id];
                                }
                                o.push(k);
                            }
                            d = {'u': v, 'e': JSON.stringify(o)};
                            $.ajax({
                                'n': v,
                                'url': location.origin + '/editor/save_asset.php',
                                'type': 'POST',
                                'data': d,
                                'r': o,
                                'dataType': 'json'
                            }).done(function (r, i) {
                                toastr.success(c.language('editor_ui_msg_fdsaveok'));
                                if (c.domAssetsViewCurrent && c.domAssetsViewCurrent == this.n) {
                                    for (i = 0; this.r.length > i; i++) {
                                        this.r[i] = {'d': this.r[i], 'id': r[i]}
                                    }
                                    notify('assets.afterAdd', this.r)
                                }
                            })
                        })
                        e.tk = tk;
                        e.body.find('input:first').replaceWith('<select class="form-control"></select>')
                        o = e.body.find('select');
                        o.append('<option value="" selected>' + c.language('editor_ui_msg_selconfirm') + '</option>')
                        $.each(c.assetsList, function () {
                            o.append('<option value="' + this.name + '">' + this.name + '</option>')
                        })
                    }
                }
            }
            if (!c.copiedFormat || c.copiedFormat.length < 1) {
                delete obj.m['obj.pformat'];
            }
            if (typeof c.clipboard == 'object' && c.clipboard.length > 0) {
                obj.m['obj.paste'].disabled = false;
            }
            if ((obj.el = $(e.target)) && obj.el.is('.objectBox[scope]') || (obj.el = $(e.target).parents('.objectBox[scope]')) && obj.el.length == 1) {
                menu.dom = obj.el;
            }
            if (c.currentSelection && (m = Object.values(c.currentSelection)) && m.length > 1 && menu.dom && c.currentSelection[menu.dom.attr('scope')]) {
                delete menu.dom;
                $.each(m, function (i, e) {
                    if ($(e).is('.grouped[group_id]') == true) {
                        obj.m['obj.ungrp'].disabled = false;
                    }
                })
                delete obj.m['obj.rn'];
                delete obj.m['obj.cformat'];
                obj.m['obj.movetpl'].visible = true;
                obj.m['obj.grp'].visible = true;
                obj.m['obj.match'].visible = true;
                obj.m['obj.mask'].visible = true;
                if (m.length > 1 && obj.m['obj.pformat']) {
                    delete obj.m['obj.pformat'].callback;
                }
                menu.items = obj.m;
                if (!notify('context.beforeMenu', {'menu': menu, 'event': e})) return false;
                return menu;
            }
            if (c.currentSelection && m.length > 1) {
                e.target = m[0];
            }
            if (menu.dom) {
                delete obj.m['obj.match'];
                if (obj.el.is('.grouped[group_id]')) {
                    obj.m['obj.ungrp'].disabled = false;
                }
                if (c.slides[0].elements[obj.el.attr('scope')].prop.sym == 'text') {
                    obj.m['obj.text'].visible = true;
                } else {
                    obj.m['obj.2text'].visible = true;
                }
                if (obj.el.data('object-ref') == 'texts') {
                    obj.m['obj.txt2shape'].disabled = false;
                    obj.m['obj.txt2shape'].visible = true;
                }
                obj.m['obj.movetpl'].visible = true;
                obj.m['obj.hflp'] = {
                    'name': c.language('editor_ui_cntxt_fliph'),
                    'icon': 'fa-toggle-right',
                    'callback': function (id) {
                        id = menu.dom.attr('scope');
                        if (!notify('obj.beforeFlip', {'obj': id})) return;
                        menu.func['obj.hflip']();
                        notify('obj.afterFlip', {'obj': id});
                    }
                };
                obj.m['obj.vflp'] = {
                    'name': c.language('editor_ui_cntxt_flipv'),
                    'icon': 'fa-toggle-up',
                    'callback': function (id) {
                        id = menu.dom.attr('scope');
                        if (!notify('obj.beforeFlip', {'obj': id})) return;
                        menu.func['obj.vflip']();
                        notify('obj.afterFlip', {'obj': id});
                    }
                };
                obj.m['obj.order'] = {
                    'name': c.language('editor_ui_prop_arrange'),
                    'items': {
                        'obj.front': {
                            'name': c.language('editor_ui_prop_arrang_front'),
                            'icon': 'fa-angle-double-up',
                            'callback': function () {
                                if (!notify('obj.beforeOrder')) return;
                                menu.func['obj.front']();
                                notify('obj.afterOrder');
                            }
                        },
                        'obj.forw': {
                            'name': c.language('editor_ui_prop_arrang_forw'),
                            'icon': 'fa-angle-up',
                            'callback': function () {
                                if (!notify('obj.beforeOrder')) return;
                                menu.func['obj.forw']();
                                notify('obj.afterOrder');
                            }
                        },
                        'obj.back': {
                            'name': c.language('editor_ui_prop_arrang_back'),
                            'icon': 'fa-angle-double-down',
                            'callback': function () {
                                if (!notify('obj.beforeOrder')) return;
                                menu.func['obj.back']();
                                notify('obj.afterOrder');
                            }
                        },
                        'obj.prev': {
                            'name': c.language('editor_ui_prop_arrang_backw'),
                            'icon': 'fa-angle-down',
                            'callback': function () {
                                if (!notify('obj.beforeOrder')) return;
                                menu.func['obj.prev']();
                                notify('obj.afterOrder');
                            }
                        }
                    }
                }
                obj.m['obj.clone'].callback = function (id) {
                    id = menu.dom.attr('scope');
                    if (!notify('obj.beforeCreate', {'obj': id})) return;
                    menu.func['obj.clone']();
                    notify('obj.afterCreate', {'obj': id});
                }
                obj.m['obj.hide'].callback = function (id) {
                    id = menu.dom.attr('scope');
                    if (!notify('obj.beforeVisible', {'obj': id})) return;
                    menu.func['obj.hide']();
                    notify('obj.afterVisible', {'obj': id});
                };
                obj.m['obj.lock'].callback = function () {
                    id = menu.dom.attr('scope');
                    if (!notify('obj.beforeLock', {'obj': id})) return;
                    menu.func['obj.lock']();
                    notify('obj.afterLock', {'obj': id});
                }
                obj.m['obj.del'].callback = function () {
                    id = menu.dom.attr('scope');
                    if (!notify('obj.beforeDel', {'obj': id})) return;
                    menu.func['obj.del']();
                    notify('obj.afterDel', {'obj': id});
                }
                obj.m['obj.rn'].callback = function () {
                    id = menu.dom.attr('scope');
                    if (!notify('obj.beforeRename', {'obj': id})) return;
                    menu.func['obj.rn']();
                }
                if (obj.el.is('[data-object-ref=images]') == false) {
                    delete obj.m['obj.clip'];
                }
                menu.dom = obj.el;
                menu.items = obj.m;
                if (!notify('context.beforeMenu', {'menu': menu, 'event': e})) return false;
                return menu;
            }
            obj.m['obj.copy'].visible = false;
            obj.m['obj.grp'].visible = false;
            obj.m['obj.ungrp'].visible = false;
            obj.m['obj.clone'].visible = false;
            obj.m['obj.selectall'].visible = true;
            obj.m['obj.delscreen'].visible = false;
            obj.m['obj.clonescreen'].visible = false;
            obj.m['obj.cformat'].visible = false;
            obj.m['obj.hide'].visible = false;
            obj.m['obj.lock'].visible = false;
            obj.m['obj.del'].visible = false;
            obj.m['obj.rn'].visible = false;
            menu.items = obj.m;
            if (!notify('context.beforeMenu', {'menu': menu, 'event': e})) return false;
            return menu;
        }
    });
    c.domWindow.on('resize', function (w, h) {
        h = c.domWindow.height();
        w = c.domWindow.width();
        if (h !== c.docHeight || w !== c.docWidth) {
            resizeEditor();
            fixBoundary();
            c.docWidth = w;
            c.docHeight = h;
            notify('editor.afterResize');
        }
    })
    mdDialogEvents.close = function () {
        if (typeof c.startpage == 'object' && c.startpage.body.is(':visible') || typeof c.uploader == 'object' && c.uploader.stage.is(':visible')) {
            $(document.body).addClass('modal-open');
        }
    }
    mdDialogEvents.destroy = function () {
        if (typeof c.startpage == 'object' && c.startpage.body.is(':visible') || typeof c.uploader == 'object' && c.uploader.stage.is(':visible')) {
            $(document.body).addClass('modal-open');
        }
    }
    Events.on('shortcutevents.46', 'after', function (e, i) {
        if (!c.currentSelection) return;
        this.el = Object.values(c.currentSelection);
        if (this.el.length == 0) return;
        e.preventDefault();
        e.stopPropagation();
        this.k = Object.keys(c.currentSelection);
        notify('obj.beforeDel', {'obj': this.k})
        for (i = 0; this.el.length > i; i++) {
            c.domCanvas.trigger('delObject', [this.el[i].attr('scope')]);
        }
        notify('obj.afterDel', {'obj': this.k})
    })
    $(window).on('beforeunload', function (e) {
        notify('editor.beforeClose');
        if (c.LastSaveStamp !== c.sessionKey) {
            return 'Last changes may not be saved';
        }
    })
    $.ajaxPrefilter(function (o, opt, x, i) {
        i = $.now();
        c.Request[o.url + '_' + i] = {'xj': x, 'config': opt,};
        o.headers = {'X-Requested-using': $.now() + '_' + Math.random(), 'X-Requested-With': 'XMLHttpRequest',}
        x.requestuid = o.url + '_' + i;
        if (x.retries) {
            x.retries++;
        } else {
            x.retries = 0;
        }
    })
    c.transformHandler = new c.transformation;
    c.netWorkStatus = true;
    Events.on('net.check.network', 'after', function () {
        if (c.netWorkStatus == false) {
            toastr.remove();
            toastr.error('Your network connection seems to be out. <p class="mt-1">Reconnecting..<i class="fa fa-spin fa-circle-o-notch"></i></p>', 'Connection failure', {
                'progressBar': true,
                'escapeHtml': false,
                'timeOut': 10000,
                'positionClass': 'toast-top-left',
                'onHidden': function () {
                    toastr.remove();
                    c.getConnection();
                }
            });
        }
    })
    $(document).ajaxComplete(function (e, x, o) {
        if (!c.workSpaceReady) {
            return;
        }
        e = x.getResponseHeader('x-location');
        if (e) {
            c.LastSaveStamp = c.sessionKey;
            location.href = e;
            return;
        }
        delete c.Request[x.requestuid]
    })
    $(document).ajaxError(function (e, r, p) {
        if (!c.workSpaceReady) return;
        if (r.responseJSON && r.responseJSON.error) {
            toastr.error(r.responseJSON.error.message);
        }
    })
    Events.on('workspace.texttyping', 'after', function (e) {
        if (c.defaultConfig.maxTextLimit == 0) return;
        if (e.value.length > c.defaultConfig.maxTextLimit) {
            e.node.textContent = e.before + e.after;
            toastr['info']('Maximum text limit reached');
        }
    })
    Events.on('screen.create', 'before', function () {
        if (c.workSpaceReady !== true) return;
        if (c.slides.length >= c.defaultConfig.maxSlideLimit && c.defaultConfig.maxSlideLimit > 0) {
            alertMessage('error', 'Slide limit reached');
            throw('Slide limit reached');
        }
    })
    Events.on('workspace.objectcreate', 'before', function (e, i) {
        if (c.workSpaceReady !== true) return;
        i = c.domCanvas.children('div:visible:first').index();
        i = Object.keys(c.slides[i].elements).length;
        if (i >= c.defaultConfig.maxObjectLimit && c.defaultConfig.maxObjectLimit > 0) {
            alertMessage('error', 'Maximum layer limit per slide reached');
            throw('Maximum layer limit per slide reached');
        }
    })
    Events.on('workspace.startdrawtool', 'before', function () {
        Events.call('workspace.objectcreate', 'before', {'ref': 'shape'})
    })
    Events.on('screen.resize', 'before', function (e, w, h) {
        if (c.workSpaceReady !== true) return;
        w = c.defaultConfig.maxDimensionLimit[0];
        h = c.defaultConfig.maxDimensionLimit[1];
        if (w < e.w || h < e.h) {
            e = 'Maximum dimension limited to ' + w + 'x' + h + ' You cannot exceed';
            toastr['error'](e);
            throw(e);
        }
    })
    Events.on('obj.*', 'after', function (e) {
        this.event = this.event.substr(4)
        if (this.event !== 'move' && this.event !== 'resize' && this.event !== 'lock' && this.event !== 'rotate') return;
        if (c.currentActive && typeof e == 'object') {
            this.i = c.currentActive.attr('scope');
            if (e.obj.indexOf(this.i) !== 0) return;
            if (this.event == 'move' || this.event == 'resize') {
                e = c.domStatus.find('span[meta-id] em:lt(5)');
                this.xy = real_offset(c.currentActive);
                e[0].innerText = number_format(this.xy.realLeft);
                e[1].innerText = number_format(this.xy.realTop);
                e[2].innerText = number_format(this.xy.realWidth);
                e[3].innerText = number_format(this.xy.realHeight);
                c.transformHandler.reposition();
            } else if (this.event == 'lock') {
                e = c.domStatus.find('span[meta-id=Locked] em:first');
                this.prop = this.i.substr(this.i.lastIndexOf('_') + 1);
                this.prop = c.slides[this.prop].elements[this.i];
            } else if (this.event == 'rotate') {
                this.prop = c.slides[0].elements[this.i].prop;
                e = c.domStatus.find('span[meta-id] em:lt(5)');
                e[4].innerText = (this.prop.r | 0) + 'deg';
            }
            if (this.event == 'lock' && this.prop.locked == true) {
                e.text('Yes');
                c.transformHandler.lock();
            } else if (this.event == 'lock') {
                e.text('No');
                c.transformHandler.unlock();
                c.transformHandler.reposition();
            }
        }
    })
    Events.on('workspace.docprivacy', 'after', function () {
        if (!c.ID) return;
        $.post(location.origin + '/editor/make.php?q=' + c.ID, {'s': c.IDmeta.private})
    })
    Events.on('screen.changesize', function () {
        c.domZoomFit.trigger('click')
    })

    function autoSaveWorker() {
        c.LastSaveStamp = $.now();
        window.clearTimeout(c.autoSaveHandler);
        if (c.Autosave !== true) return;
        c.autoSaveHandler = window.setTimeout(function () {
            c.saveWork('none');
        }, 4000)
    }

    Events.on('obj.fx', 'after', function (o) {
        o = c.slides[0].elements[o.obj].prop;
        o.fxPriority = c.idCache[o.uid].fx.toArray();
    })
    Events.on('obj.fxclear', 'after', function (o) {
        o = c.slides[0].elements[o.obj].prop;
        o.fxPriority = c.idCache[o.uid].fx.toArray();
    })
    Events.on('obj.*', function () {
        if (c.workSpaceReady !== true || this.type == 'before') {
            window.clearTimeout(c.autoSaveHandler);
            return;
        }
        autoSaveWorker();
        if (c.history.length > 0) {
            c.domUndoBtn.removeAttr('disabled')
        } else {
            c.domUndoBtn.attr('disabled', true)
        }
        c.domRedoBtn.attr('disabled', true)
        c.backhistory = null;
    })
    Events.on('screen.*', function () {
        if (c.workSpaceReady !== true || this.type == 'before') {
            window.clearTimeout(c.autoSaveHandler);
            return;
        }
        autoSaveWorker();
        if (c.history.length > 0) {
            c.domUndoBtn.removeAttr('disabled')
        } else {
            c.domUndoBtn.attr('disabled', true)
        }
        c.domRedoBtn.attr('disabled', true)
        c.backhistory = null;
    })
    Events.on('timeline.update', 'after', function () {
        if ((c.workSpaceReady && c.TL.isReady()) !== true) {
            window.clearTimeout(c.autoSaveHandler);
            return;
        }
        autoSaveWorker();
    })
    Events.on('timeline.play', 'after', function () {
        c.renderSpritesAnimation();
        c.spriteTL.play(0)
    })
    Events.on('timeline.stop', 'after', function () {
        c.spriteTL.seek(0);
        c.spriteTL.stop(0);
        c.spriteTL.clear(true);
    })
    Events.on('workspace.undo', 'after', function (scope, p) {
        p = scope.e + '.' + scope.ev;
        if (p == 'obj.del' || p == 'obj.create') {
            Events.call('workspace.updatestatus', 'after')
        }
        if (p == 'obj.rotate' || p == 'obj.resize' || p == 'obj.move') {
            c.transformHandler.reposition();
        }
        autoSaveWorker();
        c.backhistory = scope;
        c.domRedoBtn.removeAttr('disabled')
        if (c.history.length == 0) {
            c.domUndoBtn.attr('disabled', true)
        }
    })
    Events.on('workspace.redo', 'after', function (scope, p) {
        p = scope.e + '.' + scope.ev;
        if (p == 'obj.rotate' || p == 'obj.resize' || p == 'obj.move') {
            c.transformHandler.reposition();
        }
        c.domRedoBtn.attr('disabled', true);
        c.history.unshift(c.backhistory);
        c.backhistory = null;
        c.domUndoBtn.removeAttr('disabled')
    })
    Events.on('sidebar.open', 'after', function (i, t) {
        if (i.tab !== 'folders') return;
        c.domAssetsView.empty();
        if (!c.assetsList || c.assetsList.length == 0) {
            return;
        }
        for (i = 0; c.assetsList.length > i; i++) {
            t = $('<div class="col-10 item" style="cursor:pointer"><i class="fa fa-folder fa-2x fa-stack"></i><span class="ml-2 title text-current">' + c.assetsList[i].name + '</span><span class="fa fa-ellipsis-h text-current"></span></div>');
            c.domAssetsView.append(t);
            t.data('id', c.assetsList[i].name);
            t.data('perm', c.assetsList[i].right);
        }
    })
    Events.on('assets.add', 'after', function (r, e, p, o, i) {
        o = c.domAssetsContent;
        for (i = 0; r.length > i; i++) {
            if (!r[i].d) {
                r[i] = {'d': r[i]};
            }
            e = c.injectElement(r[i].d, function (e, p) {
                e = $(e).addClass('in').wrap('<div data-object="f-asset" class="col-10 mt-2 center p-4 drag object item"><div></div></div>');
                p = e.parents('.drag').addClass('loaded');
                p.append('<div class="toolbar"><span class="fa fa-close fa-stack text-current"></span></div>');
                p.data('heap', e.data('data-heap'))
                e.removeData('data-heap');
            }, o, r[i]);
            if (e) $(e).addClass('fade');
        }
    })
    Events.on('workspace.zoom', 'after', function (a, i) {
        fixBoundary();
        c.transformHandler.reposition();
        for (i = 0; c.slides.length > i; i++) {
            a = c.slides[i].elements;
            $.each(a, function (fx, ob) {
                ob = c.idCache[this.prop.uid];
                ob.fx.resizeFilter();
            })
        }
    })
    Events.on('workspace.compile', 'before', function (e, s) {
        if (c.netWorkStatus == false) {
            alertMessage('error', 'Saving has stalled. Please check your connection and try again')
            throw'Saving has stalled';
        }
        if (!c.IDmeta) {
            c.IDmeta = {};
        }
        e = parseInt(c.config_settings_tab.animation.Input.loop.val());
        if (isNaN(e)) {
            e = 0;
        }
        c.IDmeta.loop = e;
        e = parseFloat(c.config_settings_tab.animation.Input.delay.val());
        if (isNaN(e)) {
            e = 0;
        }
        c.IDmeta.delay = e;
    })
    Events.on('workspace.addcolortopalette', 'before', function (e, a) {
        a = c.domLibraryContainers.filter('#objectpack_bg').find('.tab-content > #editor_material_color .row:first > div.col-12:eq(1)')
        i = e.ref.replace('#', '');
        if (a.find('div[data-object-ref=' + i + ']').length > 0) return;
        c.ColorPalette.unshift('#' + i);
        a.prepend('<div data-object="bg_colors" data-object-ref="' + i + '" class="card object col-1 loaded" data-lib-link="' + i + '" style="background-color: #' + i + ';margin-bottom:0;margin-top:5px;margin-left:5px"></div>')
    })
    Events.on('workspace.ctrla', 'after', function () {
        c.currentSelection = {};
        c.domCanvas.children('div:visible:first').children('.objectBox[scope]').each(function (e) {
            e = $(this).attr('scope');
            c.currentSelection[e] = $(this);
            c.currentSelection[e].css('outline', 'blue 2px solid').attr('tabIndex', 0).addClass('ui-selected');
        })
        if (Object.keys(c.currentSelection).length > 0) {
            notify('workspace.afterObjectSelect');
        }
    })
    Events.on('workspace.ctrls', 'after', function () {
        c.domEditorHeader.find('#editor_saveeall').trigger('click')
    })
    Events.on('workspace.ctrlshifts', function () {
        if (c.Autosave) {
            toastr['success']('Autosave enabled');
            c.domEditorHeader.find('a#editor_action_autosave button').addClass('on')
        } else {
            c.domEditorHeader.find('a#editor_action_autosave button').removeClass('on')
            toastr['error']('Autosave disabled');
        }
    })
    Events.on('workspace.objectselect', null, function (e, i) {
        e = Object.values(c.currentSelection)[0];
        i = e.attr('scope');
        this.sid = i.substr(i.lastIndexOf('_') + 1);
        i = c.slides[this.sid].elements[i];
        i = Object.keys(c.currentSelection).length;
        c.domStatusSelected.text(i);
        if (c.currentActive !== undefined) {
            e = c.currentActive.attr('scope');
            if (c.slides[this.sid].elements[e].prop.sym !== undefined) {
                c.domStatusActiveLayer.text(c.slides[this.sid].elements[e].prop.sym)
            } else {
                c.domStatusActiveLayer.text(c.slides[this.sid].elements[e].alias)
            }
        } else {
            c.domStatusActiveLayer.text('none')
        }
        if (i > 0) {
            c.domHomeTools.each(function (k) {
                if (k == 1) return;
                if (i === 1 && [9, 10].indexOf(k) !== -1) {
                    return;
                }
                $(this).removeAttr('disabled');
            })
        }
    })
    Events.on('workspace.objectdeselect', 'after', function () {
        c.domCanvas.children(':visible:first').children('.objectBox').each(function (id) {
            id = this.getAttribute('scope');
            if (!c.currentSelection[id]) {
                $(this).addClass('preventDefaultDrag');
            }
        })
    })
    Events.on('workspace.objectselect', 'after', function () {
        $.each(c.currentSelection, function (id, e) {
            e.removeClass('preventDefaultDrag');
        })
    })
    Events.on('workspace.updatestatus', 'after', function (i) {
        c.domStatusSlides.text(c.slides.length);
        i = 0;
        $.each(c.slides, function (k, e) {
            i += Object.keys(e.elements).length;
        })
        c.domStatusLayers.text(i);
        Events.call('workspace.updateslidebar', 'after');
    })
    Events.on('workspace.objectdeselect', 'after', function (i) {
        i = Object.keys(c.currentSelection).length;
        c.domStatusSelected.text(i);
        c.domStatusActiveLayer.text('none')
        c.domHomeTools.each(function (k, e) {
            if (k == 1 && c.clipboard) return;
            e = $(this);
            if (i == 0) {
                e.attr('disabled', true);
                return;
            }
            if (e.is('[disabled]')) return;
            if ([9, 10].indexOf(k) !== -1 && i < 2) {
                e.attr('disabled', true);
            }
        })
    })
    Events.on('workspace.updateslidebar', 'after', function () {
        e = c.domCanvas.children('div:visible:first');
        c.domStatusActiveSlide.text(e.index() + 1)
        if ((i = e.next()) && i.length > 0 && c.slides[i.index()]) {
            $(c.domSlideTools[2]).removeAttr('disabled')
        } else {
            $(c.domSlideTools[2]).attr('disabled', true)
        }
        if ((i = e.prev()) && i.length > 0 && c.slides[i.index()]) {
            $(c.domSlideTools[0]).removeAttr('disabled')
        } else {
            $(c.domSlideTools[0]).attr('disabled', true)
        }
    })
    Events.on('workspace.screenselect', 'after', function (e, i) {
        if (c.workSpaceReady !== true) return;
        Events.call('workspace.updateslidebar', 'after');
        if (c.preview_ns_dialog && typeof c.preview_ns_dialog == 'object' && typeof c.preview_ns_dialog.renderScreen == 'function') {
            c.preview_ns_dialog.renderScreen();
        }
        if (c.workSpaceReady && c.isPerpertyOpen) {
            c.domPropToggler.removeData('scope');
            c.domPropLinks.first().trigger('click');
        }
    })
    Events.on('screen.del', 'before', function () {
        throw'Not allowed';
    })
    Events.on('screen.create', 'before', function () {
        if (c.workSpaceReady && c.slides.length > 0)
            throw'Not allowed';
    })
    Events.on('screen.resize', 'after', function () {
        c.domStatusSize.text(number_format(c.width) + 'x' + number_format(c.height))
    })
    Events.on('screen.del', 'after', function () {
        Events.call('workspace.updatestatus', 'after')
        Events.call('workspace.screenselect', 'after');
    })
    Events.on('screen.create', 'after', function (e) {
        Events.call('workspace.updatestatus', 'after');
        Events.call('workspace.screenselect', 'after');
    })
    Events.on('workspace.objectcreate', 'after', function () {
        Events.call('workspace.updatestatus', 'after')
    })
    Events.on('workspace.clipboardevent', 'after', function () {
        $(c.domHomeTools[1]).removeAttr('disabled');
    })
    Events.on('obj.create', 'after', function (s, p) {
        if (!c.clipboard) {
            $(c.domHomeTools[1]).attr('disabled', true);
        }
        s = c.domCanvas.find('> div:visible:first').children('.objectBox[scope]:last');
        if (e.length == 0) return;
        p = c.slides[0].elements[s.attr('scope')];
        if (p.alias == 'images') {
            Events.one('Image.load', null, function (data, s, w, h) {
                if (data.scope == this.data.id) {
                    data.el = c.domCanvas.find('.objectBox[scope="' + this.data.id + '"]')
                    w = c.domCanvas.width();
                    h = c.domCanvas.height();
                    s = {'width': data.width, 'height': data.height};
                    if (w >= h) {
                        s.height = '50%';
                        data.sz = (h / 100) * 50;
                        s.width = (data.sz / data.height * data.width);
                        this.data.prop.width = data.sz;
                        this.data.prop.height = s.height;
                        s.width = ((s.width / w) * 100) + '%'
                    } else {
                        s.width = '50%';
                        data.sz = (w / 100) * 50;
                        s.height = (data.sz / data.width * data.height);
                        this.data.prop.width = data.sz;
                        this.data.prop.height = s.height;
                        s.height = ((s.height / h) * 100) + '%'
                    }
                    data.el.css(s);
                }
            }, p)
        }
    })
    Events.on('workspace.objectdel', function (i) {
        if (this.type == 'before' && c.isRoller) {
            throw'not allowed';
            return;
        }
        Events.call('workspace.updatestatus', 'after');
        i = Object.keys(c.currentSelection);
        c.domStatusSelected.text(i.length);
        if (i.length == 0) {
            c.domHomeTools.each(function (i, e) {
                if (i == 1 && c.clipboard) return;
                e = $(this);
                e.attr('disabled', true)
            })
        }
    })
    Events.on('workspace.loadslides', 'after', function () {
        if (c.IDmeta) {
            c.config_settings_tab.animation.Input.delay.val(c.IDmeta.delay | 0)
            c.config_settings_tab.animation.Input.loop.val(c.IDmeta.loop | 0);
            c.domPrivateToggler.prop('checked', parseInt(c.IDmeta.private)).trigger('change')
        }
        c.domStatusSize.text(number_format(c.width) + 'x' + number_format(c.height))
        Events.call('workspace.updatestatus', 'after')
        c.nomalizeSlides();
        c.refreshDocColorPalette();
        updateEffects();
        c.domZoomFit.trigger('click');
        c.TL.createFromScene();
        window.setTimeout(function () {
            c.sessionKey = c.LastSaveStamp;
        }, 200)
    })
    Events.on('workspace.loadtpl', 'after', function (i, a) {
        Events.call('workspace.updatestatus', 'after')
        c.domStatusSize.text(number_format(c.width) + 'x' + number_format(c.height))
        c.nomalizeSlides();
        c.refreshDocColorPalette();
        updateEffects();
        c.domZoomFit.trigger('click');
        c.TL.createFromScene();
    })
    Events.on('workspace.modechange', 'after', function (e) {
        e = c.domEditorHeader.find('a#editor_uilight')
        if (c.Arcmode == 'p' && c.domCanvas.hasClass('safearea') == false) {
            c.domEditorHeader.find('a#editor_action_safearea').trigger('click')
        }
        if (c.Arcmode == 'p' && e.hasClass('light') == true) {
            e.trigger('click')
        }
    })
    Events.on('workspace.objnotready', 'after', function () {
        alertMessage('error', 'Object not ready yet')
        throw'Object not ready yet';
    })
    Events.one('workspace.ready', 'after', function (b, i, w, h) {
        $('#start_loading').remove();
        $('.font-test').remove();
        $('html:first').removeClass('loading')
        $('#wrapper_slide_viewport').attr('tabIndex', 0).focus();
        c.domZoomFit.trigger('click');
        c.changeArcMode();
        c.domZoom.parent().addClass('in');
        c.domFooterTools.removeClass('d-none').addClass('in');
        Events.call('workspace.updatestatus', 'after');
        if (c.IDmeta) {
            c.config_settings_tab.animation.Input.delay.val(c.IDmeta.delay | 0)
            c.config_settings_tab.animation.Input.loop.val(c.IDmeta.loop | 0);
            c.domPrivateToggler.prop('checked', parseInt(c.IDmeta.private)).trigger('change')
        }
        if (c.store('safe_mode') == 1) {
            c.domEditorHeader.find('#editor_action_safearea').trigger('click')
        }
        if (c.store('dark_mode') == 1) {
            c.domEditorHeader.find('#editor_uilight').trigger('click')
        }
        if (c.store('show_grid') == 1) {
            c.show_grid = true;
            c.domCanvas.addClass('showGrid')
        }
        if ((i = c.store('grid_size')) && i !== null && i !== undefined) {
            c.grid_size = i;
        }
        if ((i = c.store('grid_color')) && i !== null && i !== undefined) {
            c.grid_color = i;
        }
        c.docWidth = c.domWindow.width();
        c.docHeight = c.domWindow.height();
        c.domStatusSize.text(number_format(c.width) + 'x' + number_format(c.height))
        fixBoundary();
        updateEffects();
        c.TL = new timeline;
        c.TL.init();
        if (c.docHeight <= 650) c.TL.minimize()
        resizeEditor();
        if (typeof c.tplid !== 'object') {
            c.TL.createFromScene();
            return;
        }
        c.domCanvas.trigger('disconnectScope', ['.active']);
        b = c.domCanvas.empty();
        $('#wrapper_slide_groups #view_slide_items').empty();
        c.slides = [];
        c.domScreenAdd.trigger('click');
        b.children(':first').append(loader)
        $.ajax({
            'url': location.origin + '/editor/loadtpl.php?q=' + c.tplid.id,
            'dataType': 'json',
            'cache': true,
        }).done(function (r, b, scope, t) {
            b = c.domCanvas;
            scope = r;
            if (!notify('workspace.beforeLoadTpl', {'cat': c.tplid.cat, 'id': c.tplid.id})) return;
            c.history = [];
            s = b.children(':first').empty();
            $('input#stage_general_config_h').val(scope.size[1]);
            $('input#stage_general_config_w').val(scope.size[0]).trigger('mouseenter');
            e = buildTPL(scope.tpl.slides[0], s);
            t = scope.tpl.slides.length;
            for (i = 1; t > i; i++) {
                c.domScreenAdd.trigger('click');
                s = s.next().show(0);
                buildTPL(scope.tpl.slides[i], s);
            }
            c.slides = scope.tpl.slides;
            $('#wrapper_slide_groups .view_slide_item:eq(0) > .card-header').trigger('click');
            notify('workspace.afterLoadTpl');
            c.history = [];
            window.location.hash = '#';
        }).fail(function () {
            $('#wrapper_slide_viewport #viewport_stage_wrapper > div:first figure').remove()
            alertMessage('error', 'Could not load template. Check connection and try again');
        })
    });
    c.sdkOptions = {};
    (function (sdk) {
        sdk = function (options) {
            var gui, el, stage, tL, lib, set, cue, fil, paint, layerList, pen, hs, sel, tw, shre, self;
            shre = function (o) {
                this._data = o;
                this.destroy = function (o) {
                    o = this;
                    $.each(o, function (k) {
                        delete o[k];
                    })
                }
            }
            gui = function () {
                this.width = c.docWidth;
                this.height = c.docHeight;
                this.alert = function (s) {
                    if (typeof s == 'object') return false;
                    alertMessage('error', s);
                    return true;
                };
                this.notification = function (s) {
                    if (typeof s == 'object') return false;
                    toastr.info(s);
                    return true;
                };
                this.loading = function (i) {
                    i = bigloader();
                    i = new shre(i);
                    i.close = function () {
                        this._data.close();
                    }
                    return i;
                }
                this.prompt = function (msg, cb, e) {
                    e = custom_prompt(function () {
                        if (this.mcb && typeof this.mcb == 'function') {
                            this.mcb(safe_text(this.inputEl.val()))
                        }
                        if (this.destroy) {
                            this.destroy()
                        }
                    });
                    e.mcb = cb;
                    e.body = $(e.target + ' .modal-body').css('display', 'block');
                    e.body.next().addClass('p-1 center').find('button.btn').removeClass('d-none').first().text('Ok').next().text('Cancel')
                    e.setcontent('<input class="form-control">');
                    e.inputEl = e.body.find('input').focus();
                    if (typeof msg == 'string' && msg.length > 3) e.settitle('<h5>' + msg + '</h5>');
                    return e;
                }
                this.confirm = function (msg, cb, e) {
                    e = custom_prompt(function () {
                        if (this.mcb && typeof this.mcb == 'function') {
                            this.mcb()
                        }
                        if (this.destroy) {
                            this.destroy()
                        }
                    });
                    e.mcb = cb;
                    if (typeof msg == 'string' && msg.length > 3) e.settitle('<h5>' + msg + '</h5>');
                    return e;
                }
            }
            layerList = {};
            tL = function () {
                this.duration = function () {
                    return c.TL.getTotalTime()
                }
                this.play = function () {
                    c.TL.play();
                }
                this.stop = function () {
                    c.TL.stop();
                }
                this.reset = function () {
                    c.TL.removeCueAll();
                }
            }
            tw = function (L, Q) {
                var layerID = L, cue = Q, id;
                id = c.TL.selectLayerCues(layerID);
                if (id) {
                    id = id[cue].id
                } else {
                    id = null;
                }
                this.position = function (v, i) {
                    i = c.TL.selectLayerCues(layerID);
                    if (!(i[cue] && i[cue].id === id)) return false;
                    if (typeof v == 'number' && !isNaN(v)) {
                        c.TL.moveCue(i[cue].id, v);
                    }
                    return i[cue].cue;
                }
                this.duration = function (v, i) {
                    i = c.TL.selectLayerCues(layerID);
                    if (!(i[cue] && i[cue].id === id)) return false;
                    if (typeof v == 'number' && !isNaN(v)) {
                        c.TL.resizeCue(i[cue].id, v);
                    }
                    return i[cue].dur;
                };
                this.remove = function (i) {
                    i = c.TL.selectLayerCues(layerID);
                    if (!(i[cue] && i[cue].id === id)) return false;
                    c.TL.removeCue(i[cue].id);
                    cue = undefined;
                    layerID = undefined;
                    id = null;
                };
                this.from = function (v, i) {
                    updateVar(v, 'in');
                    i = c.TL.selectLayerCues(layerID);
                    i = i[cue].fx;
                    return {
                        'left': (c.stageWidth / 100) * parseFloat(i.left[0]),
                        'top': (c.stageHeight / 100) * parseFloat(i.top[0]),
                        'width': (c.stageWidth / 100) * parseFloat(i.width[0]),
                        'height': (c.stageHeight / 100) * parseFloat(i.height[0]),
                        'rotation': i.rotation[0],
                        'fillOpacity': i.fillOpacity[0],
                        'scaleY': i.scaleY[0],
                        'scaleX': i.scaleX[0]
                    }
                }
                this.to = function (v, i) {
                    updateVar(v, 'out');
                    i = c.TL.selectLayerCues(layerID);
                    i = i[cue].fx;
                    return {
                        'left': (c.stageWidth / 100) * parseFloat(i.left[1]),
                        'top': (c.stageHeight / 100) * parseFloat(i.top[1]),
                        'width': (c.stageWidth / 100) * parseFloat(i.width[1]),
                        'height': (c.stageHeight / 100) * parseFloat(i.height[1]),
                        'rotation': i.rotation[1],
                        'fillOpacity': i.fillOpacity[1],
                        'scaleY': i.scaleY[1],
                        'scaleX': i.scaleX[1]
                    }
                }

                function updateVar(v, i) {
                    if (typeof v === 'object') {
                        delete v['data']
                        delete v['x']
                        delete v['y']
                        delete v['z']
                        delete v['toX']
                        delete v['toY']
                        delete v['stroke']
                        delete v['strokeDasharray']
                        c.TL.updateCuePointTween(id, i, v)
                    }
                }
            }
            hs = function () {
                this.clear = function () {
                    c.history = [];
                }
                this.undo = function () {
                    if (!c.history[0]) return false;
                    c.backHistory(c.history[0], 'before');
                    return true;
                }
                this.redo = function () {
                    if (!c.backhistory) return false;
                    c.backHistory(c.backhistory, 'after');
                    return true;
                }
            }
            sel = function () {
                this.getBound = function (o) {
                    if (!c.currentSelection || Object.keys(c.currentSelection).length == 0) return false;
                    o = real_boundary(c.currentSelection);
                    return o;
                };
                this.clear = function () {
                    c.currentSelection = [];
                    return true;
                }
                this.add = function (layer, i, k) {
                    if ((typeof layer == 'object' && layer.constructor.name == 'el') == false) return false;
                    if (layer.constructor.name == 'el') {
                        layer = [layer];
                    } else if (layer.length > 0) {
                        layer = Object.values(layer);
                    }
                    for (i = 0; layer.length > i; i++) {
                        k = layerList[layer[i].id].attr('scope');
                        c.currentSelection[k] = layerList[layer[i].id];
                    }
                    return true;
                };
                this.remove = function (layer, i) {
                    if ((typeof layer == 'object' && layer.constructor.name == 'el') == false) return false;
                    i = layerList[layer.id].attr('scope');
                    if (c.currentSelection[i]) {
                        delete c.currentSelection[i];
                        return true;
                    }
                    return false;
                }
                this.toArray = function (a, i, e, k) {
                    a = Object.keys(c.currentSelection);
                    if (!c.currentSelection || a.length == 0) return false;
                    e = [];
                    for (i = 0; set.list.length > i; i++) {
                        k = set.list[i];
                        k = layerList[k.id].attr('scope');
                        if (a.indexOf(k) !== -1) {
                            e.push(set.list[i]);
                        }
                    }
                    return e;
                };
                this.group = function (v, i) {
                    if (v !== false) {
                        i = $.now();
                    }
                    $.each(c.currentSelection, function (k, e) {
                        if (v == false) {
                            delete c.slides[0].elements[k].grpid;
                            e.removeClass('grouped').removeAttr('group_id');
                        } else {
                            c.slides[0].elements[k].grpid = i;
                            e.addClass('grouped').attr('group_id', i);
                        }
                    })
                }
            }
            pen = function (source, cb) {
                var cmd = source;
                callback = $.noop;
                var self = this;
                if (typeof cb == 'function') callback = cb;
                if (typeof cmd == 'string') {
                    if (cmd == "") {
                        cmd = [];
                    } else {
                        cmd = cmd.split(' ')
                    }
                }
                this.add = function () {
                    cmd.push('0,0')
                };
                var move = function (x, y, i, o) {
                    if (typeof i == 'number' && !isNaN(i) && cmd[i]) {
                        o = cmd[i].split(',')
                    } else {
                        i = cmd.length - 1;
                        o = cmd[i].split(',')
                    }
                    o[0] = parseFloat(o[0]);
                    o[1] = parseFloat(o[1]);
                    if (typeof x == 'number' && !isNaN(x)) o[0] += x;
                    if (typeof y == 'number' && !isNaN(y)) o[1] += y;
                    if ((o[0] + ',' + o[1]) != cmd[i]) {
                        cmd[i] = o.join(',');
                        self.cb = callback;
                        self.cb();
                        return true;
                    }
                    return false;
                }
                this.moveY = function (num, offset) {
                    if (cmd.length == 0) return false;
                    return move(null, num, offset)
                };
                this.moveX = function (num, offset) {
                    if (cmd.length == 0) return false;
                    return move(num, null, offset)
                };
                this.delete = function (offset) {
                    if (cmd.length == 0) return false;
                    if (typeof offset == 'number' && !isNaN(offset) && cmd[offset] !== undefined) {
                        cmd.splice(offset, 1);
                    } else {
                        cmd.splice(cmd.length - 1, 1)
                    }
                    this.cb = callback;
                    this.cb();
                    return true;
                };
                this.reset = function () {
                    cmd = [];
                    this.cb = callback;
                    this.cb();
                }
                this.getOption = function () {
                    return $.extend([], cmd);
                }
                this.getPoint = function (offset) {
                    if (cmd.length == 0) return false;
                    if (typeof offset == 'number' && !isNaN(offset) && cmd[offset]) {
                        o = cmd[offset].split(',')
                    } else {
                        o = cmd[cmd.length - 1].split(',')
                    }
                    return {'x': o[0], 'y': o[1]};
                }
                this.compile = function () {
                    if (cmd.length == 0) return false;
                    return 'M' + cmd.join('L');
                }
            }
            lib = {
                'images': function () {
                    if (!this.libs && c.myimg) return this.libs = $.extend([], true, c.myimg);
                    return this.libs;
                }, 'button': function () {
                    if (this.buttons) return this.buttons;
                    this.buttons = c.domLibraryContainers.filter('#objectpack_buttons').find('div.row > div[data-object=buttons]').map(function (ref) {
                        ref = $(this).data('object-ref');
                        return {'id': ref, 'el': this}
                    });
                    return this.buttons;
                }, 'icon': function () {
                    return lib.icons;
                }, 'palette': function () {
                    if (c.ColorPalette) return c.ColorPalette;
                    return false;
                }, 'color': function () {
                    return this.colors;
                }, 'gradient': function () {
                    return this.gradients;
                }, 'pattern': function () {
                    return this.patterns;
                }, 'font': function () {
                    return lib.fonts;
                }, 'filter': function () {
                    return lib.filters;
                }, 'size': function () {
                    return lib.sizes;
                }
            }
            lib.sizes = $.map(c.size_preset_groups, function (e, i) {
                return e.items;
            });
            lib.filters = Object.keys(svgObList);
            lib.fonts = Object.keys(c.libs.fonts);
            lib.gradients = $.extend({}, c.bg_gradients_native);
            lib.patterns = $.extend([], c.libs.bg_patterns);
            lib.colors = $.extend([], c.libs.bg_colors);
            lib.icons = {};
            $.each(c.libs.shapes, function (n, k) {
                lib.icons[n] = $.map(k, function (i) {
                    return c.policySetup.PUBLIC_SHAPE_REPO + '/library/shapes/' + n + '/svg/' + i + '.svg';
                });
            });
            set = {'list': [], 'length': 0,}
            paint = function (t, o) {
                var type = t, opt = o;
                if (type == 'color') {
                    if (opt[0] !== '#') opt = tinycolor(opt).toHexString();
                    opt = opt.substr(1);
                } else if (type == 'gradient') {
                }
                this.modify = function (o) {
                    if (type == 'color' && typeof o === 'strong') {
                        opt = o;
                    } else if (type == 'pattern' && typeof o === 'object' && o.points && o.opts) {
                        opt = $.extend({}, true, o)
                    } else if (type == 'gradient' && typeof o == 'object') {
                        opt = $.extend({}, true, o)
                    }
                }
                this.apply = function (e) {
                    switch (type) {
                        case'color':
                            c.domCanvas.trigger('paint', ['bg_colors', opt]);
                            break;
                        case'pattern':
                            c.applyPattern(c.domCanvas.children(':eq(0)'), opt);
                            break;
                        case'gradient':
                            e = {'t': 'linear-gradient'};
                            if (opt.mode.indexOf('r') === 0) {
                                e.t = 'radial-gradient';
                            }
                            e.deg = opt.deg;
                            e.dg = e.deg.toString().indexOf('circle');
                            if (e.dg !== -1 && e.dg !== 0) {
                                e.deg = 'center ' + e.deg.substr(e.deg.indexOf('at'));
                            }
                            e.gr = $.map(opt.stops, function (i) {
                                return i.color + ' ' + i.offset;
                            })
                            c.domCanvas.children(':visible:first').css('background', e.t + '(' + e.deg + ',' + e.gr.join(',') + ')');
                            c.slides[0].background = {'gradient': opt};
                            break;
                    }
                }
                this.destroy = function () {
                    c.domCanvas.trigger('paint', ['bg_colors', '00000000']);
                }
                this.getOption = function () {
                    if (typeof opt == 'object') return $.extend({}, true, opt);
                    return opt;
                }
            }
            stage = function () {
                var locked = false;
                this.lock = function (v) {
                    if (typeof v == 'boolean') locked = v;
                    return locked;
                }
                this.add = function (type, o, i) {
                    if (locked == true) return false;
                    if (type == 'image') {
                        o = {'u': 'assets/img/undefined_photo.jpg'};
                        o.l = o.u;
                        o = c.buildObject('images', o);
                    } else if (type == 'text' || type == 'button') {
                        o = {'source': []};
                        o = c.buildObject(type + 's', o);
                        o.data('object-ref', 0)
                    } else if (type == 'icon') {
                        o = c.buildObject('shape');
                        o.data({'object-ref': 'arrows', 'object-src': 1});
                    } else if (['circle', 'square', 'path', 'line'].indexOf(type) !== -1) {
                        this.e = {
                            'sym': 'path',
                            'variant': 'polyline',
                            'background': {'color': '#0000'},
                            'off': {'w': 0, 'h': 0, 'x': 0, 'y': 0},
                            'border': {'size': 2, 'color': '#000'}
                        };
                        if (type == 'square') {
                            this.e.cmd = '0,0 100,0 100,100 0,100 0,0';
                        } else if (type == 'circle' || type == 'line') {
                            this.e.sym = type;
                            delete this.e.variant;
                            delete this.e.off;
                        } else if (type == 'path') {
                            this.e.cmd = '';
                        } else {
                            return false;
                        }
                        o = c.buildObject('shape');
                        o.data('object-src', this.e)
                    } else if (type == 'customsvg') {
                        o = c.buildObject('shape');
                        this.e = {'sym': 'mysvgshapes', 'ref': null};
                        o.data('object-src', this.e)
                    }
                    i = set.list.length;
                    c.domCanvas.trigger('addObject', [o, {}, o]);
                    if (set.list.length > i) {
                        if (this.e && this.e.sym === 'path') {
                            this.e.vc = layerList[set.list[0].id].find('.object > svg > path:first').get(0)
                            this.e.p = this.e.vc.getBBox();
                            this.e.vc.parentNode.setAttribute('viewBox', this.e.p.x + ' ' + this.e.p.y + ' ' + this.e.p.width + ' ' + this.e.p.height);
                            this.e.scope = layerList[set.list[0].id].attr('scope');
                            c.slides[0].elements[this.e.scope].prop.off = {
                                'x': this.e.p.x,
                                'y': this.e.p.y,
                                'w': this.e.p.width,
                                'h': this.e.p.height
                            }
                        }
                        delete this.e;
                        return set.list[0];
                    }
                    return false;
                };
                this.fill = null;
                this.trim = function () {
                    if (locked == true) return false;
                    workspaceJob('trim');
                }
                this.select = function (layer, i, e) {
                    if (typeof layer !== 'object' && layer !== null) {
                        c.currentSelection = [];
                        return new sel;
                    }
                    if (layer.constructor.name == 'el') {
                        layer = [layer];
                    } else if (layer.length > 0) {
                        layer = Object.values(layer);
                    } else return false;
                    c.currentSelection = [];
                    for (i = 0; layer.length > i; i++) {
                        e = layerList[layer[i].id];
                        c.currentSelection[e.attr('scope')] = e;
                    }
                    return new sel;
                }
                this.getStatus = function (o, e) {
                    o = {};
                    o.slides = c.slides.length;
                    o.layers = Object.keys(c.slides[0].elements).length;
                    o.selected = [];
                    e = Object.keys(c.currentSelection);
                    if (e.length > 0) {
                        for (i = 0; set.list.length > i; i++) {
                            e = set.list[i];
                            k = layerList[e.id].attr('scope')
                            if (!c.currentSelection[k]) continue;
                            o.selected.push(e);
                        }
                    }
                    return o;
                }
                this.getSize = function () {
                    return {'width': c.width, 'height': c.height}
                }
                this.resize = function (w, h, i) {
                    if (locked == true) return false;
                    i = (w + h).toString().match(/([\d\.]+)/g);
                    if (!i || i.join('') != (w + h)) return false;
                    c.width = w;
                    c.height = h;
                    c.domSize.first().val(c.width);
                    c.domSize.last().val(c.height);
                    c.domCanvas.trigger('stage_resize');
                    return true;
                };
                this.clear = function () {
                    if (locked == true) return false;
                    c.workSpaceReady = false;
                    c.slides = [];
                    c.history = [];
                    c.idCache = {};
                    c.TL.clear();
                    c.idCache = {};
                    layerList = {};
                    set.list = [];
                    set.length = 0;
                    c.domSlidesWrapper.empty();
                    c.domCanvas.empty();
                    c.domScreenAdd.trigger('click');
                    c.workSpaceReady = true;
                };
                this.paint = function (type, opt) {
                    if (locked == true) return false;
                    if (type == 'color' && typeof opt == 'string') {
                        this.fill = new paint(type, opt);
                        this.fill.apply();
                        return true;
                    } else if (type == 'pattern' && typeof opt === 'object' && opt.points && opt.opts) {
                        this.fill = new paint(type, opt);
                        this.fill.apply();
                        return true;
                    } else if (type == 'gradient' && typeof opt == 'object' && opt.stops.length > 0) {
                        this.fill = new paint(type, opt);
                        this.fill.apply();
                        return true;
                    }
                    return false;
                }
                this.getOutput = function (s, o) {
                    s = c.domCanvas.clone();
                    if (c.slides[0].background.color) {
                        s.children(':eq(0)').css('background', c.slides[0].background.color)
                    }
                    s.css({
                        'width': c.width,
                        'height': c.height,
                        'left': '',
                        'top': ''
                    }).find('.objectBox > svg').css('overflow', 'visible');
                    o = {'dom': s.get(0), 'width': c.width, 'height': c.height}
                    return o;
                }
                this.save = function (format) {
                    c.saveWork();
                }
            }
            fil = function (id, el) {
                var ns = id, layer = el, locked = false;
                this.lock = function (v) {
                    if (typeof v == 'boolean') locked = v;
                    return locked;
                }
                this.destroy = function (e, i) {
                    if (locked) return false;
                    e = layerList[layer].attr('scope');
                    e = c.slides[0].elements[e];
                    if (!c.idCache[e.prop.uid].fx.fx[ns]) return false;
                    c.idCache[e.prop.uid].fx.fx[ns].destroy();
                    for (i = 0; set.list.length > i; i++) {
                        if (set.list[i].id === el) {
                            delete set.list[i].filters[ns];
                            delete e.prop[ns]
                            break;
                        }
                    }
                    return (c.idCache[e.prop.uid].fx.fx[ns] === undefined);
                };
                this.modify = function (opt, e) {
                    if (locked) return false;
                    e = layerList[layer].attr('scope');
                    e = c.slides[0].elements[e];
                    if (!c.idCache[e.prop.uid].fx.fx[ns]) return false;
                    c.idCache[e.prop.uid].fx.fx[ns].update(opt);
                    c.idCache[e.prop.uid].fx.fx[ns].apply();
                    e.prop[ns] = c.idCache[e.prop.uid].fx.fx[ns].options;
                    return true;
                };
                this.getOption = function (e) {
                    e = layerList[layer].attr('scope');
                    e = c.slides[0].elements[e];
                    if (!c.idCache[e.prop.uid].fx.fx[ns]) return false;
                    e = c.idCache[e.prop.uid].fx.fx[ns].options;
                    if (typeof e === 'object') e = $.extend({}, true, e);
                    return e;
                };
            }
            el = function (type, id) {
                this.id = id
                this.type = type;
                this.filters = {};
                this.getBound = function (e) {
                    e = layerList[this.id];
                    return real_offset(e);
                }
                this.writeText = function (text, font, size, align, i, o) {
                    if (!(this.type == 'text' || this.type == 'button')) return false;
                    i = (typeof text);
                    if ((i == 'number' || i == 'string') == false) return false;
                    i = layerList[this.id].attr('scope');
                    o = new shre(i);
                    o.text = text;
                    o._id = this.id;
                    o.opt = {
                        'font': font,
                        'type': 'normal',
                        'size': size,
                        'align': align,
                        'sym': c.slides[0].elements[i].prop.sym
                    }
                    o.font = function (font, type) {
                        if (!c.libs.fonts[font]) return false;
                        if (!c.libs.fonts[font][type]) type = 'normal';
                        this.opt.type = type;
                        this.opt.font = font;
                        this.apply();
                        return Object.keys(c.libs.fonts[font]);
                    }
                    o.apply = function () {
                        renderTextType(this.text, this.opt, layerList[this._id].find('.object:first svg:first'), function (r, d) {
                            d.e = $(d.svg).parents('.objectBox[scope]');
                            i = d.e.attr('scope');
                            d.options.source = r;
                            if (c.slides[0].elements[i].prop.sym == 'button') {
                                d.options.off = d.off;
                                d.options.xy = d.xy;
                            }
                            c.slides[0].elements[i].prop = $.extend(true, c.slides[0].elements[i].prop, d.options);
                        });
                    }
                    o.align = function (v) {
                        this.opt.align = v;
                        this.apply();
                    }
                    o.listFontTypes = function () {
                        if (!this.opt.font) return false;
                        return Object.keys(c.libs.fonts[this.opt.font])
                    }
                    o.apply(font);
                    return o;
                }
                this.imgUrl = function (url, i, f) {
                    if (this.type !== 'images') return false;
                    f = false;
                    for (i = 0; c.myimg.length > i; i++) {
                        if (c.myimg[i].u == url) {
                            f = true;
                            break;
                        }
                    }
                    if (!f) return false;
                    i = layerList[this.id].attr('scope');
                    if (!c.slides[0].elements[i].prop.src) return false;
                    layerList[this.id].find('.object:first > svg:first image:first').attr('href', url)
                    c.slides[0].elements[i].prop.src = url;
                    return true;
                }
                this.iconUrl = function (url, r, i, e) {
                    url = url.substr(c.policySetup.PUBLIC_SHAPE_REPO.length + 16);
                    if (!url || url.length == 0) return false;
                    url = url.split('/');
                    if (url.length < 3) return false;
                    i = url[2] = url[2].substr(0, url[2].lastIndexOf('.'))
                    r = url[0];
                    if (!c.shapeBlob[r]) return false;
                    if (!c.shapeBlob[r][i]) return false
                    r = $(c.shapeBlob[r][i]);
                    e = layerList[this.id].find('.object:first > svg:first');
                    r.attr({'preserveAspectRatio': 'none'}).css({'width': '100%', 'height': '100%'})
                    e.replaceWith(r);
                    i = layerList[this.id].attr('scope');
                    e = c.slides[0].elements[i];
                    e.prop.src = url[0] + '/' + url[2];
                    c.idCache[e.prop.uid].fx.init(r);
                    c.idCache[e.prop.uid].fx.applyAll(null, true);
                    return true;
                }
                this.svgUrl = function (url, i, r, e) {
                    if (this.type !== 'mysvgshapes') return false;
                    r = false;
                    for (i = 0; c.mysvgshapes.length > i; i++) {
                        if (c.mysvgshapes[i].uid == url) {
                            r = c.mysvgshapes[i];
                            break;
                        }
                    }
                    if (r) {
                        r.e = $(r.u).filter('svg').first();
                        e = layerList[this.id].find('.object:first > svg:first');
                        r.e.attr({'preserveAspectRatio': 'none'}).css({'width': '100%', 'height': '100%'})
                        e.replaceWith(r.e);
                        i = layerList[this.id].attr('scope');
                        e = c.slides[0].elements[i];
                        e.prop.ref = r.uid;
                        c.idCache[e.prop.uid].fx.init(r.e);
                        c.idCache[e.prop.uid].fx.applyAll(null, true);
                        return true;
                    }
                    return false;
                }
                this.draw = function (i, e) {
                    i = layerList[this.id].attr('scope');
                    e = new pen(c.slides[0].elements[i].prop.cmd, function (p, e) {
                        p = this.compile();
                        if (p) {
                            if (c.slides[0].elements[this.scope].prop.variant == 'polygon') p = p + 'z';
                            e = layerList[this.id].find('.object:first > svg:first path:first').get(0);
                            e.setAttribute('d', p);
                            p = e.getBBox();
                            c.slides[0].elements[this.scope].prop.off = {
                                'x': p.x,
                                'y': p.y,
                                'w': p.width,
                                'h': p.height
                            }
                            e.parentNode.setAttribute('viewBox', p.x + ' ' + p.y + ' ' + p.width + ' ' + p.height);
                        }
                    });
                    e.id = this.id;
                    e.scope = i;
                    return e;
                }
                this.name = function (v, i) {
                    i = layerList[this.id].attr('scope');
                    if (v) {
                        v = safe_text(v);
                        v = v.replace(/[^\da-z\s]/ig, '');
                        v = $.trim(v).substr(0, 25);
                        if (v.length > 0) {
                            c.slides[0].elements[i].name = v;
                        }
                    }
                    return c.slides[0].elements[i].name;
                }
                this.locked = function (v, i) {
                    i = layerList[this.id].attr('scope');
                    if (typeof v === 'boolean') {
                        c.slides[0].elements[i].locked = v;
                    }
                    return (c.slides[0].elements[i].locked == true || c.slides[0].elements[i].locked == 'true');
                }
                this.visible = function (v, i) {
                    i = layerList[this.id].attr('scope');
                    if (typeof v === 'boolean') {
                        c.slides[0].elements[i].noshow = (v == false);
                        applyPropertyOption(layerList[this.id], {'hide': (v == false)});
                    }
                    return (layerList[this.id].hasClass('invisible') == false);
                }
                this.clone = function (i) {
                    i = layerList[this.id].attr('scope');
                    c.domCanvas.trigger('cloneObject', [i]);
                }
                this.remove = function (i) {
                    for (i = 0; set.list.length > i; i++) {
                        if (set.list[i] === this) {
                            delete set.list[i];
                            c.domCanvas.trigger('delObject', [layerList[this.id].attr('scope')])
                            set.length--;
                            set.list = Object.values(set.list);
                            delete layerList[this.id];
                            return true;
                        }
                    }
                    return false;
                }
                this.resize = function (w, h, i, e, o) {
                    if (this.locked()) return false;
                    i = layerList[this.id].attr('scope');
                    e = c.slides[0].elements[i];
                    o = {'width': e.prop.w, 'height': e.prop.h};
                    if (typeof w == 'number' && !isNaN(w)) o.width = w;
                    if (typeof h == 'number' && !isNaN(h)) o.height = h;
                    if (o.width !== e.prop.w || o.height !== e.prop.h) {
                        layerList[this.id].css({
                            'width': (o.width / c.width) * 100 + '%',
                            'height': (o.height / c.height) * 100 + '%'
                        });
                        e.prop.w = (c.stageWidth / c.width) * o.width;
                        e.prop.h = (c.stageHeight / c.height) * o.height;
                        return true;
                    }
                    return false;
                }
                this.move = function (x, y, e, i, o) {
                    if (this.locked()) return false;
                    i = layerList[this.id].attr('scope');
                    e = c.slides[0].elements[i];
                    o = {'left': e.prop.left, 'top': e.prop.top};
                    if (typeof x == 'number' && !isNaN(x)) o.left = x;
                    if (typeof y == 'number' && !isNaN(y)) o.top = y;
                    if (o.left !== e.prop.left || o.top !== e.prop.top) {
                        layerList[this.id].css({
                            'left': (o.left / c.width) * 100 + '%',
                            'top': (o.top / c.height) * 100 + '%'
                        });
                        e.prop.left = (c.stageWidth / c.width) * o.left;
                        e.prop.top = (c.stageHeight / c.height) * o.top;
                        return true;
                    }
                    return false;
                }
                this.position = function (xy, o, i) {
                    o = {'left': 'x0', 'top': 'y0', 'center': 'xy0', 'bottom': 'y1', 'right': 'x1'};
                    if (o[xy]) {
                        xy = o[xy];
                    } else {
                        xy = 'xy0';
                    }
                    o = applyPropertyOption(layerList[this.id], {'xy': xy});
                    i = layerList[this.id].attr('scope');
                    c.slides[0].elements[i].prop.left = o.left;
                    c.slides[0].elements[i].prop.top = o.top;
                }
                this.rotate = function (v) {
                    i = layerList[this.id].attr('scope');
                    if (typeof v === 'number' && !isNaN(v)) {
                        c.slides[0].elements[i].prop.r = v;
                        applyPropertyOption(layerList[this.id], {'rotate': v});
                    }
                    return c.slides[0].elements[i].prop.r | 0;
                }
                this.index = function (v, i, e, k) {
                    i = layerList[this.id].attr('scope');
                    if (typeof v == 'number' && !isNaN(v) && v >= 0) {
                        if (v == 0) {
                            v = 'back'
                        } else if (v >= set.list.length) {
                            v = 'front'
                        } else if (v < c.slides[0].elements[i].prop.z) {
                            v = 'backward'
                        } else {
                            v = 'forward';
                        }
                        workspaceJob('order_' + v, [i]);
                    }
                    return c.slides[0].elements[i].prop.z;
                }
                this.flip = function (v, i, e) {
                    i = layerList[this.id].attr('scope');
                    e = c.slides[0].elements[i].prop;
                    if (!e.flip) {
                        e.flip = [1, 1];
                    }
                    if (v == 'x' && (e.flip[0] == 1)) {
                        e.flip[0] = '-1';
                    } else if (v == 'x') {
                        e.flip[0] = 1;
                    }
                    if (v == 'y' && (e.flip[1] == 1)) {
                        e.flip[1] = '-1';
                    } else if (v == 'y') {
                        e.flip[1] = 1;
                    }
                    applyPropertyOption(layerList[this.id], {'flip': e.flip});
                    return e.flip;
                }
                this.setFilter = function (id, opt, i, e) {
                    if (!svgObList[id]) return false;
                    i = layerList[this.id].attr('scope');
                    e = c.slides[0].elements[i];
                    if (this.filters[id]) {
                        this.filters[id].modify(opt);
                    } else {
                        i = {};
                        if (typeof c.svgEffectsList[id] == 'object') {
                            i[id] = $.extend(true, c.svgEffectsList[id], opt);
                        } else {
                            i[id] = c.svgEffectsList[id];
                            if (typeof opt !== 'object') i[id] = opt;
                        }
                        c.idCache[e.prop.uid].fx.load(i);
                        c.idCache[e.prop.uid].fx.applyAll(id, true);
                        this.filters[id] = new fil(id, this.id);
                    }
                    return true;
                }
                this.addTween = function (pos, o) {
                    c.TL.addCue(this.id, 0, 0.5);
                    o = c.TL.selectLayerCues(this.id);
                    return new tw(this.id, o.length - 1);
                }
                this.getTweens = function (o, i, e, f) {
                    o = c.TL.selectLayerCues(this.id);
                    f = [];
                    for (i = 0; o.length > i; i++) {
                        e = new tw(this.id, i);
                        f.push(e);
                    }
                    return f;
                }
                this.getOption = function (i) {
                    i = layerList[this.id].attr('scope');
                    i = c.slides[0].elements[i].prop;
                    i = $.extend(true, {}, i);
                    return i;
                }
                this.copyFormat = function (layer, i, f, k, p) {
                    if (!(typeof layer == 'object' && layer.constructor.name == 'el')) return false;
                    i = layerList[this.id].attr('scope');
                    p = c.slides[0].elements[i].prop;
                    f = c.idCache[p.uid].fx.toArray();
                    e = c.Supported(c.slides[0].elements[i].alias);
                    for (i = 0; f.length > i; i++) {
                        k = f[i];
                        if (k.indexOf('fx2') === -1 && e.indexOf(k) === -1) continue;
                        layer.setFilter(k, p[k]);
                    }
                    return true;
                }
                this.ungroup = function (i) {
                    i = layerList[this.id].attr('scope');
                    delete c.slides[0].elements[i].grpid;
                    layerList[this.id].removeClass('grouped').removeAttr('group_id');
                }
            }
            this.gui = new gui;
            this.callbacks = {'ready': $.noop, 'abort': $.noop, 'close': $.noop,}
            this.layerset = set;
            this.timeline = new tL;
            this.stage = new stage;
            this.library = lib;
            this.history = new hs;
            lib.shps = function () {
                var callbacks = {};
                this.load = function (ref, i) {
                    callbacks = {'done': $.noop, 'fail': $.noop}
                    o = {
                        'done': function (cb) {
                            if (typeof cb == 'function') callbacks.done = cb;
                            return o;
                        }, 'fail': function (cb) {
                            if (typeof cb == 'function') callbacks.fail = cb;
                            return o;
                        }
                    }
                    if (!lib.icons[ref]) return false;
                    lib.shpslog = 0;
                    for (i = 0; lib.icons[ref].length > i; i++) {
                        $.ajax({
                            'dataType': 'text',
                            'url': lib.icons[ref][i],
                            'ref': ref,
                            'id': '' + i + ''
                        }).done(function (r) {
                            if (!c.shapeBlob[this.ref]) {
                                c.shapeBlob[this.ref] = {};
                            }
                            c.shapeBlob[this.ref][this.id] = r;
                            lib.shpslog++;
                            if (lib.shpslog >= lib.icons[this.ref].length) {
                                callbacks.done();
                            }
                        }).fail(function () {
                            lib.shpslog++;
                        })
                    }
                    return o;
                }
            }
            lib.svg = function () {
                this.upload = function (src, i, r) {
                    if (typeof src != 'object') return false;
                    if ((src.u && src.l && src.uid) == false) return false;
                    r = false;
                    if (c.mysvgshapes == undefined) c.mysvgshapes = [];
                    for (i = 0; c.mysvgshapes.length > i; i++) {
                        if (c.mysvgshapes[i].uid == src.uid) {
                            r = true;
                            break;
                        }
                    }
                    if (!r) {
                        c.mysvgshapes.push(src);
                    }
                    return true;
                }
            }
            lib.img = function () {
                var callbacks = {};
                this.load = function (o, a) {
                    callbacks = {'done': $.noop, 'fail': $.noop}
                    o = {
                        'done': function (cb) {
                            if (typeof cb == 'function') callbacks.done = cb;
                            return o;
                        }, 'fail': function (cb) {
                            if (typeof cb == 'function') callbacks.fail = cb;
                            return o;
                        }
                    }
                    if (c.myimg && c.myimg.length > 0) {
                        window.setTimeout(function () {
                            callbacks.done();
                        }, 50)
                        return o;
                    }
                    a = {'dataType': 'json', 'url': location.origin + '/editor/getphoto.php?type=myimg', 'cb': this}
                    $.ajax(a).done(function (r) {
                        c.myimg = r.reverse();
                        callbacks.done();
                    }).fail(function () {
                        callbacks.fail();
                    })
                    return o;
                }
                this.upload = function (url, m, o) {
                    m = new Image;
                    m.onload = function (i, f) {
                        f = false;
                        for (i = 0; c.myimg.length > i; i++) {
                            if (c.myimg[i].u == this.src) {
                                f = true;
                                break;
                            }
                        }
                        if (!f) {
                            c.myimg.push({'u': this.src, 'l': this.src})
                        }
                        notify('sdkimage' + this.ns + '.afterUploadpass', {
                            'src': this.src,
                            'width': this.width,
                            'height': this.height
                        })
                    }
                    m.onerror = function () {
                        notify('sdkimage' + this.ns + '.afterUploadfail', false)
                    }
                    m.ns = $.now();
                    window.setTimeout(function () {
                        m.src = location.origin + '/editor/prefetch_media.php?q=' + window.encodeURI(url);
                    }, 5)
                    o = {
                        'done': function (cb) {
                            if (typeof cb == 'function') Events.one('sdkimage' + m.ns + '.uploadpass.sdk', 'after', cb, true)
                            return o;
                        }, 'fail': function (cb) {
                            if (typeof cb == 'function') Events.one('sdkimage' + m.ns + '.uploadfail.sdk', 'after', cb, false)
                            return o;
                        }
                    }
                    return o;
                }
            }

            function createEle(e) {
                e.type = e.obj.alias;
                if (e.type == 'shape' && e.obj.prop.sym) e.type = e.obj.prop.sym;
                obj = new el(e.type, e.obj.prop.uid);
                set.list.unshift(obj);
                $.each(c.idCache[obj.id].fx.toArray(), function (i, n) {
                    obj.filters[n] = new fil(n, obj.id);
                })
                set.length++;
                layerList[obj.id] = c.domCanvas.find('> div:eq(0) .objectBox[id="g_' + obj.id + '"]')
            }

            this.myimg = new lib.img;
            this.shapes = new lib.shps;
            this.mysvg = new lib.svg;
            Events.on('workspace.objectcreate.sdk', 'after', function (e, obj) {
                createEle(e);
            })
            Events.on('workspace.objectdel.sdk', 'after', function (e, i, k) {
                for (i = 0; set.list.length > i; i++) {
                    k = set.list[i];
                    if (layerList[k.id].attr('scope') === e.obj) {
                        delete layerList[k.id];
                        set.list.splice(i, 1);
                    }
                }
            })
            Events.on('screen.create.sdk', 'after', function () {
                set.list = [];
                set.length = 0;
            })
            Events.on('obj.fx.sdk', 'after', function (r, i) {
                for (i = 0; set.list.length > i; i++) {
                    if (!c.slides[0].elements[r.obj]) continue;
                    if (c.slides[0].elements[r.obj].prop.uid === set.list[i].id) {
                        if (!set.list[i].filters[r.ref]) {
                            set.list[i].filters[r.ref] = new fil(r.ref, set.list[i].id);
                        }
                        break;
                    }
                }
            })
            Events.on('obj.fxclear.sdk', 'after', function (r, i) {
                for (i = 0; set.list.length > i; i++) {
                    if (!c.slides[0].elements[r.obj]) continue;
                    if (c.slides[0].elements[r.obj].prop.uid === set.list[i].id) {
                        delete set.list[i].filters[r.ref];
                        break;
                    }
                }
            })
            self = this;
            if (options) {
                options.size = options.size.split('x');
                if (options.size.length == 2 && options.size[0] > 0 && options.size[1] > 0) {
                    this.stage.resize(options.size[0], options.size[1]);
                }
            }
            if (c.slides.length > 0) {
                $.each(c.slides[0].elements, function () {
                    createEle({'obj': this})
                })
            }
            if (c.slides.length > 0 && c.slides[0].background) {
                if (c.slides[0].background.color) {
                    this.stage.fill = new paint('color', c.slides[0].background.color)
                } else if (c.slides[0].background.gradient !== undefined) {
                    this.stage.fill = new paint('gradient', c.bg_gradients_native[c.slides[0].background.gradient])
                } else if (c.slides[0].background.pattern) {
                    this.stage.fill = new paint('pattern', c.slides[0].background.pattern)
                }
            }
            return this;
        }
        Events.on('workspace.ready.sdk', 'after', function () {
            c.TL.minimize();
            resizeEditor();
            Events.off('workspace.ready.sdk');
            if (c.sdkOptions.callback) {
                window.opener[c.sdkOptions.callback](c.editorSDK)
            }
        });
        Events.one('workspace.ready.sdk', 'before', function () {
            return;
            c.contextBuild.app.export.disabled = true;
            c.contextBuild.app.open.disabled = true;
            c.contextBuild.app.dwnl.disabled = true;
            c.contextBuild.app.embed.disabled = true;
            c.contextBuild.app.logout.disabled = true;
            c.contextBuild.app.new.disabled = true;
            c.contextBuild.app.exit.visible = true;
            c.domExportBtn.attr('disabled', true);
            c.domPrivateDocBtn.remove();
        })
        Events.one('editor.exit.sdk', function () {
            return;
            alertMessage('info', 'Closing editor window...')
            closeSdk();
            throw'';
        })
        Events.one('editor.close.sdk', function () {
        })
        Events.on('startpage.ready.sdk', function () {
            return;
            if (this.type == 'after') {
                c.startpage.apply(c.sdkOptions.size.split('x'));
                Events.off('startpage.ready.sdk');
                return;
            }
            c.startpage.navLinks.eq(1).addClass('d-none');
        })
        Events.on('editor.resize.sdk', 'after', function () {
            if (!c.editorSDK) return;
            c.editorSDK.gui.width = c.docWidth;
            c.editorSDK.gui.height = c.docHeight;
        })
        Events.on('workspace.compile.sdk', 'after', function (e, s) {
            return;
            s = {'sz': [c.width, c.height], 'd': e.data, 'i': c.IDmeta};
            s = {'toekn': c.LastSaveStamp, 'build': s}
            c.sessionKey = c.LastSaveStamp;
            throw'';
        })
        Events.one('workspace.abort.sdk', 'after', function () {
            window.editorSDK = c.editorSDK = new sdk;
            if (c.sdkOptions.callback) {
                window.opener[c.sdkOptions.callback](c.editorSDK)
            }
            if (typeof c.editorSDK.callbacks.abort == 'function') {
                c.editorSDK.callbacks.abort();
            }
        })

        function closeSdk() {
            return;
            if (typeof c.editorSDK.callbacks.close == 'function') {
                c.editorSDK.callbacks.close()
            }
            $.each(Object.keys(window.editorSDK), function (k) {
                delete window.editorSDK[k];
            })
            delete window.editorSDK;
            delete c.editorSDK;
            Events.off('workspace.*.sdk');
            Events.off('obj.*.sdk');
            Events.off('editor.*.sdk');
        }

        c.editorSDK = new sdk;
    })(window, location);
    c.domDocBody.prepend('<div id="start_loading"><figure class=""><div class="preloader"><p></p><span><img src="assets/img/logo.png"></span></div></figure><span class="h2 center">Loading</span></div>');
    $('html:first').addClass('loading')
    c.loaderTextHelper = $('#start_loading').position({'my': 'center', 'of': 'body'}).children('span.h2:first');
    if (typeof Object.values !== 'function' || window.history.replaceState === undefined || $('html:first').is('.cookies.json.svg.cssgradients.inlinesvg.fontface.cssanimations.svgasimg.svgfilters.filereader.contenteditable.blobconstructor.csstransforms.cssfilters.flexbox') == false) {
        loc = location.origin;
        e = $('#start_loading').html('<div class="w-50 center element-box"><div class="element-header"><h3>' + c.language('editor_ui_msg_brnosuporthead') + '</h3><em>' + c.language('editor_ui_msg_brnosuport') + ':</em></div><div class="row mt-5 d-flex center w-75"><div class="col-3 offset-1"><a href="https://www.opera.com/"><img src="' + loc + '/assets/img/icon/opera.svg"></a></div><div class="col-3 offset-1"><a href="https://www.google.com/chrome"><img src="' + loc + '/assets/img/icon/chrome.svg"></a></div><div class="col-3 offset-1"><a href="https://www.firefox.com/"><img src="' + loc + '/assets/img/icon/firefox.svg"></a></div></div></div>');
        e.position({'my': 'top left', 'at': 'center center', 'of': e.parent()})
        notify('workspace.afterAbort');
        return;
    }
    loadLib(null, 0);
    a = new Image;
    a.src = 'assets/img/oval.svg';
    c.domSidebarToggle_2 = c.domSidebarWrapper.find('#objecttab_toggler > .card-header').on('click', function (e, a, s, ref) {
        e = $(this);
        ref = e.data('ref');
        if (!ref) return;
        a = c.domLibraryContainers.filter('div[id^=objectpack_' + ref + ']');
        if (a.length == 0) return;
        i = e.find('span:first');
        c.domSidebarToggle_2.filter('.active').not(this).each(function (e, r) {
            e = $(this).removeClass('active');
            e.find('span:first').removeClass('os-icon-arrow-down4').addClass('os-icon-arrow-up4');
            r = e.data('ref');
            c.domLibraryContainers.filter('div[id^=objectpack_' + r + ']').addClass('d-none').removeClass('active');
        });
        if (!e.hasClass('active')) {
            e.addClass('active');
            i.removeClass('os-icon-arrow-up4').addClass('os-icon-arrow-down4');
        } else {
            e.removeClass('active');
            i.removeClass('os-icon-arrow-down4').addClass('os-icon-arrow-up4');
        }
        if (e.hasClass('active')) {
            a.removeClass('d-none');
            a.addClass('active');
        } else {
            a.addClass('d-none');
            a.removeAttr('active');
        }
    })
    e = c.domSidebarToggleLinks.on('click', 'a', function (e, a, f) {
        a = this.href.split('#')[1];
        notify('sidebar.beforeOpen', {'tab': a});
        f = c.domSidebarWrapper;
        if ($(this).parent().hasClass('active') == false) {
            f.trigger('show')
        } else if (f.width() > 0) {
        } else {
            f.trigger('show')
        }
        c.domSidebarToggleTab = a;
        f = $(this).find('span:first').text();
        c.domSidebarHeader.text(f);
        c.domSidebarToggleLinks.filter('.active').removeClass('active');
        $(this).parent('li').addClass('active');
        e.preventDefault();
        e = c.domLibraryContainers.filter('div[id^=objectpack_' + a + ']');
        if (e.length > 0) {
            c.domLibraryContainers.filter('.active').addClass('d-none');
            e.hide(0).removeClass('d-none').addClass('active');
            notify('sidebar.afterOpen', {'tab': a});
            if (a == 'shapes') {
                a = c.domLibraryContainers.filter('#objectpack_shapes').find('#objectpack_shapes_in > .row > .row');
                if (a.filter(':visible').length == 0) {
                    a.first().prev().trigger('click');
                }
            } else if (a == 'images') {
                e.find('.row:first').trigger('loadmore');
            } else if (a == 'tpl' && TPL_MAK !== undefined && TPL_MAK.length > 0) {
                e.find('select:first').val(TPL_MAK[0].cat).trigger('change');
            } else if (a == 'fonts') {
                e.find('.row:first').trigger('loadmore')
            }
        }
    });
    c.domEditorBase.on('ready', function () {
        window.spritePlayer = c.spriteTL = new TimelineMax({
            paused: false,
            useFrames: true,
            repeat: -1,
            repeatDelay: 0
        });
        e = c.domMenuView.append('<div class="row m-0 fancyscroll"></div>').find('> div:last')
        $.each(c.contextBuild.app, function (i, k) {
            if (this.visible == false || this.disabled == true) return;
            k = $('<div class="col-10 mb-2 mt-2"><a class="text-white" href="#' + i + '"><span class="fa ' + this.icon + ' fa-2x align-middle"></span><span class="ml-2">' + c.language(this.name) + '</span><a/></div>')
            e.append(k);
            if (this.items) {
                k.addClass('disable')
                k.menu({
                    items: $.map(this.items, function (k, i) {
                        return '<a href="#' + i + '">' + c.language(k.name) + '</a>';
                    }), init: function (e, u) {
                        u.menu.addClass('big').find('li a').on('click', {'u': u}, function (e) {
                            e.preventDefault();
                            c.HandleMenu(this.getAttribute('href').substr(1));
                            e.data.u.hide();
                        })
                    }
                })
            }
        })
        e.find('> div a[href]').on('click', function (e) {
            e.preventDefault();
            if ($(this).parent().hasClass('disable')) return;
            c.HandleMenu(this.getAttribute('href').substr(1));
        })
        $('.guide').each(function (e) {
            e = $(this).attr('class').substr(6);
            $(this).attr('id', e);
            c.guideLines[e] = this;
        })
        guideBoxinfoSetup();
        a = c.domLibraryContainers.filter('#objectpack_buttons').find('div.row');
        j.each(c.libs.buttons, function (i, e, p) {
            p = parseTemplates('buttons', e);
            e = a.append('<div class="col-6 mt-2 loaded object" draggable data-object="buttons" data-object-ref="' + i + '"><span></span></div>').children(':last').find('span');
            applyPropertyOption(e, p);
        });
        a.addClass('loaded');
        c.setEditorDefaultSetting();
        a = c.domStageViewport.children('div.card');
        a.addClass('fancyscroll');
        c.domScreenAdd.trigger('click');
        c.domLibraryContainers.filter('#objectpack_images').on('click.ly', '.item[data-object] .toolbar > a', function (e, ref) {
            e.stopPropagation();
            e.preventDefault();
            e = $(this).parents('.item').data('object-ref');
            if (!c.images.items[e]) {
                return;
            }
            bigloader();
            $.post(location.origin + '/editor/libsave.php', {'q': c.images.items[e].u}, function (r) {
                toastr.success('Successfully saved to library');
                if (c.myimg && r.mode == 'add') {
                    c.myimg.push(r)
                }
            }, 'json').always(function () {
                if (c.bigSpinnrer) c.bigSpinnrer.close()
            })
        })
        $('#objectpack').on('click.ly', 'div[data-object]', function (e, a, b) {
            e = $(this);
            a = e.data('object');
            b = e.data('object-ref');
            if (!e.hasClass('loaded')) {
                notify('workspace.afterObjNotReady');
                return;
            }
            if (b == 'tpl') {
                return;
            }
            if (a.indexOf('bg') === 0) {
                c.domCanvas.trigger('paint', [a, b]);
            } else {
                if (!notify('obj.beforeCreate')) return;
                a = c.domCanvas.children('div:visible:first')
                e.clone(true).removeClass().css({'position': 'absolute', 'left': a.width() - e.width()}).appendTo(a);
                s = a.children().last();
                s.position({'my': 'center center', 'at': 'center center', 'of': a})
                p = s.position();
                c.domCanvas.trigger('addObject', [e, p, s]);
                s.remove();
                s = a.children('.objectBox[scope]:last')
                o = applyPropertyOption(s, {'xy': 'xy0'});
                p = c.slides[0].elements[s.attr('scope')];
                p.prop.left = o.left;
                p.prop.top = o.top;
                notify('obj.afterCreate');
                if (p.alias == 'images') {
                    Events.one('Image.load', 'after', function (data) {
                        data.el = c.domCanvas.find('.objectBox[scope="' + data.scope + '"]')
                        applyPropertyOption(data.el, {'xy': 'xy0'});
                    })
                }
            }
        }).on('mouseover', '.object[data-object]', function (e, t, n) {
            e = $(this);
            if (e.hasClass('ui-draggable')) return;
            t = e.attr('title');
            n = c.language('editor_ui_tip_draginfo');
            if (t) {
                t = t + '\n\n' + n;
            } else {
                t = n;
            }
            e.attr('title', t);
            if (e.hasClass('nodrag')) return;
            e.draggable({
                'scope': 'object',
                'appendTo': '#wrapper_slide_viewport div#viewport_stage_wrapper',
                'helper': function (u, a, i, e) {
                    a = $(this);
                    u = $(this).clone().removeAttr('title data-title');
                    if (a.data('object') == 'buttons') {
                        i = u.find('span').css({
                            'width': '100%',
                            'height': '100%',
                            'text-align': 'center',
                            'display': 'inline-block',
                            'padding': 5
                        })
                    } else if (a.data('object') == 'fonts') {
                        u.addClass('font-plate');
                    }
                    u.css({'width': a.outerWidth(), 'height': a.outerHeight()})
                    return u;
                },
                'zIndex': 100,
                'drag': function () {
                    c.draggingLib = true
                },
                'start': function (e, u, a) {
                    c.draggingLib = true
                },
                'stop': function () {
                    delete c.draggingLib;
                },
                'revert': 'invalid'
            })
        })
        c.domCanvas.on('click', 'div:visible > .objectBox[scope]', function (e, s, m, sm) {
            e = $(this);
            m = $.extend(false, {}, c.currentSelection);
            s = e.attr('scope');
            sm = false;
            if (c.getShortcut().isCmd()) {
                sm = true;
                m = $.extend(false, m, c.currentSelection);
                m[s] = e;
                c.currentSelection = m;
                e.css('outline', 'blue 2px solid').attr('tabIndex', 0).addClass('ui-selected');
            } else {
                if (e.hasClass('active') == false) {
                    c.currentSelection = {};
                    notify('workspace.afterObjectDeSelect');
                    c.domCanvas.trigger('connectScope', [s]);
                }
                e.siblings('.ui-selected').each(function () {
                    $(this).css('outline', '').removeAttr('tabIndex').removeClass('ui-selected');
                })
            }
            workspaceJob('performSelection', s);
            if (c.currentSelection && (e = Object.keys(c.currentSelection)) && e.length > 0) {
                clearTimeout(c.mulselecting);
                c.mulselecting = window.setTimeout(function () {
                    notify('workspace.afterObjectSelect');
                    e = e[e.length - 1]
                    c.transformHandler.enable(c.currentSelection[e], c.slides[0].elements[e])
                }, 50)
            }
        })
    })
})(jQuery)
