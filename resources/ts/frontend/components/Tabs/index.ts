import EnokhTabs from './Tabs';
import Tabby from 'tabbyjs';

window.addEventListener( 'DOMContentLoaded', () => {
    let tabsInstance;

    const createTabControl = ( panel ) => {
        panel.classList.remove( 'needs-tab-control' );

        const headings = panel.querySelectorAll( '.tab-heading' );
        const tabControl = panel.querySelector( '.tab-control' );
        const panelId = panel.dataset.panelid;

        if ( ! headings || ! tabControl ) {
            return;
        }

        const ul = document.createElement( 'ul' );
        ul.classList.add( 'tab-list' );
        ul.setAttribute( 'role', 'tablist' );

        headings.forEach( ( heading ) => {
            const tabContentId = `${ heading.dataset.target }-${ heading.parentElement.parentElement.parentElement.dataset.panelid }`;

            // Set the ID for the tab so we can target it via the anchor.
            heading.parentElement.setAttribute( 'id', tabContentId );

            const li = document.createElement( 'li' );
            li.classList.add( 'tab-item' );

            const anchor = document.createElement( 'a' );
            anchor.setAttribute( 'href', `#${ tabContentId }` );
            anchor.setAttribute( 'role', 'tab' );
            anchor.setAttribute( 'aria-controls', tabContentId );
            anchor.innerText = heading.dataset.name;

            li.appendChild( anchor );

            ul.appendChild( li );

            li.addEventListener( 'click', handleTabItemClick );
        } );

        const dropdown = document.createElement( 'div' );
        dropdown.classList.add( 'tab-list__dropdown' );
        dropdown.setAttribute( 'role', 'dropdown' );
        dropdown.innerText = headings[ 0 ].dataset.name;
        dropdown.addEventListener( 'click', toggleDropdown );

        tabControl.appendChild( dropdown );
        tabControl.appendChild( ul );
    };

    const updateTabs = () => {
        document.querySelectorAll( '.tabs' ).forEach( ( tabPanel: HTMLElement, tabPanelIndex: number ) => {
            tabPanel.dataset.panelid = String( tabPanelIndex + 1 );
        } );

        const panelsToUpdate = document.querySelectorAll( '.needs-tab-control' );
        if ( ! panelsToUpdate ) {
            return false;
        }
        panelsToUpdate.forEach( ( panel ) => createTabControl( panel ) );

        return true;
    };

    const initTabComponent = () => {
        tabsInstance = new EnokhTabs( '.tabs', {
            orientation: 'horizontal',
        } );
    };

    const maybeSetFocus = () => {
        // Find hash if any
        const hash = window.location.hash;
        if ( ! hash ) {
            return;
        }

        // Find item to be focused
        const tabAnchor = hash.substring( hash.indexOf( '#' ) + 1 );
        const tabItem = document.querySelector( 'ul.tab-list a[id="' + tabAnchor + '"]' );
        if ( ! tabItem ) {
            return;
        }

        // Find tab area and tab items
        const tabArea = tabItem.closest( 'div.tabs' );
        const tabList = tabArea.querySelector( '.tab-list' );
        const tabListItems = tabList.querySelectorAll( 'li' );
        if ( ! tabListItems.length ) {
            return;
        }

        // Find tab index
        const tabItemContainer = tabItem.parentNode;
        const tabIndex = [].indexOf.call( tabListItems, tabItemContainer );

        // Goto preferred tab
        tabsInstance.goToTab( tabIndex, tabArea, true );
    };

    const handleTabItemClick = ( event ) => {
        const tabHandle = event.target;
        const tabs = tabHandle.closest( '.tabs' );
        const tabsDropdown = tabs.querySelector( '.tab-list__dropdown' );
        tabsDropdown.innerText = tabHandle.innerText;
        tabs.classList.toggle( 'open' );
    };

    const toggleDropdown = ( event ) => {
        event.target.parentNode.parentElement.classList.toggle( 'open' );
    };

    const updated = updateTabs();
    if ( updated ) {
        initTabComponent();
        maybeSetFocus();
    }

    window.addEventListener(
        'hashchange',
        () => {
            maybeSetFocus();
        },
        false
    );
} );

window.addEventListener( 'DOMContentLoaded', () => {
    const newTabsElements = document.querySelectorAll( '[data-mah-tabs]' );

    if ( ! newTabsElements.length ) {
        return;
    }

    const initialTab = ( elm: HTMLElement ) => {
        const tabPanelId = elm.getAttribute( 'id' );
        const tabGroup = elm.querySelector( '.enokh-blocks-tabs-group' );
        const tabGroupItems = tabGroup.children;
        const ulNavList = document.createElement( 'ul' );

        [].forEach.call( tabGroupItems, ( tabGroupItem: HTMLElement, idx: number ) => {
            const tabHeader = tabGroupItem.querySelector( '.enokh-blocks-tab-item-header' );
            const li = document.createElement( 'li' );
            const anchor = document.createElement( 'a' );

            anchor.href = `#${ tabPanelId }__${ idx }`;
            anchor.appendChild( tabHeader );

            if ( idx <= 0 ) {
                anchor.setAttribute( 'data-tabby-default', '' );
            }

            li.appendChild( anchor );
            ulNavList.appendChild( li );

            tabGroupItem.setAttribute( 'id', `${ tabPanelId }__${ idx }` );
        } );

        ulNavList.setAttribute( 'id', `${ tabPanelId }__tabs` );
        elm.insertBefore( ulNavList, tabGroup );

        const tabs = new Tabby( `ul#${ tabPanelId }__tabs` );
        elm.classList.add( 'js' );
    };

    newTabsElements.forEach( ( dataTab ) => {
        initialTab( dataTab as HTMLElement );
    } );
} );
