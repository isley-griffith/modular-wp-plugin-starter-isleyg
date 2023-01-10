<?php

/**
* The plugin bootstrap file
*
* This file is read by WordPress to generate the plugin information in the plugin
* admin area. This file also includes all of the dependencies used by the plugin,
* registers the activation and deactivation functions, and defines a function
* that starts the plugin.
*
* @link              https://github.com/isley-griffith/modular-wp-plugin-starter-isleyg
* @since             1.0.26
* @package           plugin-name
*
* @wordpress-plugin
* Plugin Name:       Isley's Plugin
* Plugin URI:        https://github.com/isley-griffith/modular-wp-plugin-starter-isleyg
* GitHub Plugin URI: https://github.com/isley-griffith/modular-wp-plugin-starter-isleyg
* Description:       This plugin removes the admin bar from the front end of the site.
* Version:           1.0.26
* Author:            Isley Griffith
* Author URI:        http://example.com
* License:           GPL-2.0+
* License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
* Text Domain:       plugin-name
* Domain Path:       /languages

*/

// If this file is called directly, abort.

if ( !defined( 'WPINC' ) ) {
    die;
}

add_filter('show_admin_bar', '__return_false');



/**
* Current plugin version.
* Start at version 1.0.0 and use SemVer - https://semver.org
* Rename this for your plugin and update it as you release new versions.
*/
define( 'PLUGIN_NAME_VERSION', '1.0.26' );

/**
* The code that runs during plugin activation.
* This action is documented in includes/Activator.php
*/

function activate_plugin_title() {
    require_once plugin_dir_path( __FILE__ ) . 'includes/Activator.php';
    Plugin_Abbr_Activator::activate();

}


/**
* The code that runs during plugin deactivation.
* This action is documented in includes/Deactivator.php
*/

function deactivate_plugin_title() {
    require_once plugin_dir_path( __FILE__ ) . 'includes/Deactivator.php';
    Plugin_Abbr_Deactivator::deactivate();
}



register_activation_hook( __FILE__, 'activate_plugin_title' );
register_deactivation_hook( __FILE__, 'deactivate_plugin_title' );



/**
* The core plugin class that is used to define internationalization,
* admin-specific hooks, and public-facing site hooks.
*/
require plugin_dir_path( __FILE__ ) . 'includes/Main.php';

/**
* Begins execution of the plugin.
*
* Since everything within the plugin is registered via hooks,
* then kicking off the plugin from this point in the file does
* not affect the page life cycle.
*
* @since    1.0.0
*/

function run_plugin_title() {

    $plugin = new Plugin_Name();
    $plugin->run();

}

run_plugin_title();