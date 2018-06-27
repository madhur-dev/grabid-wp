<?php
/**
 * The7 theme.
 *
 * @package The7
 * @since   1.0.0
 */

// File Security Check
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Set the content width based on the theme's design and stylesheet.
 * @since 1.0.0
 */
if ( ! isset( $content_width ) ) {
	$content_width = 1200; /* pixels */
}

/**
 * Initialize theme.
 * @since 1.0.0
 */
require( trailingslashit( get_template_directory() ) . 'inc/init.php' );

//~ function register_my_menu() {
  //~ register_nav_menu('new-menu',__( 'New Menu' ));
  //~ register_nav_menu('menu-logistics',__( 'Menu Logistics' ));
//~ }
//~ add_action( 'init', 'register_my_menu' );
//~ function register_my_menu() {
  //~ register_nav_menu('new-menu',__( 'New Menu' ));
  //~ register_nav_menu('menu-logistics',__( 'Menu Logistics' ));
//~ }
//~ add_action( 'init', 'register_my_menu' );
function register_my_menus() {
  register_nav_menus(
    array(
      'new-menu' => __( 'New Menu' ),
      'menu-logistics' => __( 'Menu Logistics' ),
      //~ 'an-extra-menu' => __( 'An Extra Menu' )
    )
  );
}
add_action( 'init', 'register_my_menus' );
