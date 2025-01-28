<?php
/**
 * Plugin Name:       Smart Login
 * Description:       Display your site&#39;s copyright date.
 * Version:           1.0.0
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Author:            Vishnu Kumawat
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       smart-login
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_smart_login_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_smart_login_init' );


/** smart login bk enqueue ajax render script function callback */
add_action( 'wp_enqueue_scripts', 'smart_login_enqueue_smart_login_scripts' );
function smart_login_enqueue_smart_login_scripts() {
    if ( ! is_admin() ) {
        wp_enqueue_script(
            'smart-login-script',
            plugins_url( 'src/script.js', __FILE__ ), 
            array( 'jquery' ),
            filemtime( plugin_dir_path( __FILE__ ) . 'src/script.js' ), 
            true 
        );

        wp_localize_script('smart-login-script', 'smart_login_object', array(
            'ajax_url' => admin_url('admin-ajax.php'),
        ));
    }
}


/** smart login bk ajax render function callback */
add_action('wp_ajax_nopriv_smart_login_bk', 'smart_login_bk_ajax_handler'); 
add_action('wp_ajax_smart_login_bk', 'smart_login_bk_ajax_handler');
function smart_login_bk_ajax_handler() {
    $username = sanitize_text_field($_POST['username']);
    $password = sanitize_text_field($_POST['password']);
    $remember = isset($_POST['remember']) ? true : false;

    $creds = array(
        'user_login'    => $username,
        'user_password' => $password,
        'remember'      => $remember,
    );

    $user = wp_signon($creds, false);

    if (is_wp_error($user)) {
        wp_send_json_error(array('message' => $user->get_error_message()));
    } else {
        wp_send_json_success(array('redirect_url' => home_url())); 
    }

    wp_die();
}
