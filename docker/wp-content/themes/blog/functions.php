<?php
// Enqueue the theme styles.
function blog_enqueue_styles() {
    wp_enqueue_style( 'blog-style', get_stylesheet_uri() );
}
add_action( 'wp_enqueue_scripts', 'blog_enqueue_styles' );

// Setup theme support features.
function blog_setup() {
    load_theme_textdomain( 'blog' );
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', array( 'search-form' ) );
}
add_action( 'after_setup_theme', 'blog_setup' );
?>